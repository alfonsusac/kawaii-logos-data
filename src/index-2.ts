import { log } from "console"
import { alfonsusac } from "./entries/alfonsusac"
import { arnav } from "./entries/arnav"
import { cr1sta_dev } from "./entries/cr1sta_dev"
import { dsphng } from "./entries/dsphng"
import { fenjalien } from "./entries/fenjalien"
import { fumanama } from "./entries/fumanama"
import { hcho3 } from "./entries/hcho3"
import { hvpexe } from "./entries/hvpexe"
import { saltyaom } from "./entries/saltyaom"
import { styxpilled } from "./entries/styxpilled"
import { thatonecalculator } from "./entries/thatonecalculator"
import { blue, cyan, green, reset } from "./lib/ansii"
import { cacheInstance } from "./lib/cache"
import { info, logerror, logger, logMajorStep, verbose, warn } from "./lib/log"
import type { Output } from "./lib/model/output"
import { resolveDefinitions } from "./resolve-definitions"
import { rm } from "fs/promises"
import { Git } from "./lib/git"
import { generateGitIgnore } from "./lib/util"



log(`${ blue }\nkawaii-logos-data ${ green }(${ process.env.NODE_ENV })`)

logMajorStep("Checking environment variables")

const envGithubActions = process.env[ 'GITHUB_ACTIONS' ]
const isInGitHubAction = envGithubActions === "true"
const revalidateToken = process.env[ 'REVALIDATE_TOKEN' ]
const environment = process.env.NODE_ENV

if (envGithubActions === undefined) {
  warn(`${ cyan }GITHUB_ACTIONS${ reset } environment variable not detected.`)
}
if (isInGitHubAction) {
  info(`${ cyan }GITHUB_ACTIONS${ reset } environment variable detected. Assuming GitHub Actions environment.`)
}
if (revalidateToken === undefined) {
  warn(`${ cyan }REVALIDATE_TOKEN${ reset } environment variable not detected.`)
}
if (![ 'production', 'development' ].includes(environment || "")) {
  warn(`${ cyan }NODE_ENV${ reset } environment variable is set to '${ environment }'. Expected 'production' or 'development'.`)
}

await cacheInstance.initializeCacheData()


// --------------------------------------------------------------------------------

// Main


try {
  logMajorStep("Begin processing data")
  const resolved = await resolveDefinitions({
    alfonsusac,
    arnav,
    cr1sta_dev,
    dsphng,
    fenjalien,
    fumanama,
    hcho3,
    hvpexe,
    saltyaom,
    styxpilled,
    thatonecalculator,
  })

  logMajorStep("Preparing output and saving to disk")
  const output = await prepareOutput(resolved)
  await cleanAndSaveToDisk(output, "./dist", true)
  await saveToDataBranch(output, "main-2-data")

  if (isInGitHubAction && revalidateToken) {
    logMajorStep("Revalidating website")
    await fetch(`https://vtuberlogos.alfon.dev/revalidate?key=${ revalidateToken }`).then((res) => res.json())
  }

  logMajorStep(`Data processed successfully `)
} catch (error) {
  logerror(error, "Error occurred during data processing")
}


// --------------------------------------------------------------------------------


async function prepareOutput(data: Output) {
  const response = {
    updatedAt: new Date().toISOString(),
    data
  }
  const stringified = JSON.stringify(response, null, 2)
  const outputTypeFileContent = await Bun.file('./src/lib/model/output.ts').text()
  const folderStructure = {
    // Switching branch from main to data branch will cause gitignored files to carry over. 
    // So we need to re-ignore those files in the data branch.
    // So that when we commit, we won't accidentally commit files that are not supposed to be in the data branch such as the source code or other config files.
    './gitignore': generateGitIgnore('*', '!.gitignore', '!data.json', '!README.md'),
    '/data.json': stringified,
    '/README.md': [
      `# The Data Branch`,
      `This branch is used to store the data of the images. It is updated automatically by the GitHub Actions.`,
      ``,
      `Last Updated: \`${ response.updatedAt }\``,
      ``,
      `### Authors`,
      `${ response.data.map(entry => `- ${ entry.displayName }`).join("\n") }`,
      ``,
      `### Contributing`,
      ``,
      `If you want to contribute such as adding missing image or fixing incorrect data, please refer head over to the \`main\` branch`
    ].join('\n'),
    '/types.ts': outputTypeFileContent,
  }

  return {
    response,
    stringified,
    folderStructure
  }
}
type DataResponse = Awaited<ReturnType<typeof prepareOutput>>



async function cleanAndSaveToDisk(data: DataResponse, folderpath: string, clean: boolean) {

  clean && await rm(folderpath, { recursive: true, force: true })
  await Promise.all(Object.entries(data.folderStructure).map(([ path, content ]) => {
    return Bun.write(`${ folderpath }${ path }`, content)
  }))

  info(`Data saved to ${ cyan }${ folderpath }${ reset } successfully`)
}



async function saveToDataBranch(data: DataResponse, dataBranchName: string) {
  if (process.env.NODE_ENV !== "production") {
    warn(`${ cyan }--watch${ reset } mode used in bun dev. Skipping git switch and commit.\n  Use ${ cyan }'bun start'${ reset } to enable git switch and commit.`)
    return
  }
  await usingGitBranch(
    dataBranchName,
    async () => {
      await cleanAndSaveToDisk(data, "./", false)
      await Git.trackAll()
      await Git.commitAllTracked(`Update data ${ data.response.updatedAt }`)
      await Git.pushAndSetUpstream(dataBranchName)
    }
  )
}



async function usingGitBranch(
  dataBranchName: string,
  callback: () => Promise<void>
) {
  const { logerror, verbose } = logger("usingGitBranch", { verbose: true })

  await Git.fetch()

  const previousBranch = await Git.showCurrentBranch()
  const hasBranch = await Git.checkHasLocalbranch(dataBranchName)
  verbose(`Current branch is ${ previousBranch }. Target data branch is ${ dataBranchName }. Branch exists: ${ hasBranch }`)

  if (await Git.checkHasUncommitedChanges()) {
    logerror(`Uncommited changes detected. Please commit or stash your changes before switching to branch ${ dataBranchName }.`)
    return
  }

  try {
    if (hasBranch) {
      await Git.switch(dataBranchName)
      await Git.pull()
    } else {
      await Git.createNewLocalBranchWithoutHistory(dataBranchName)
    }

    const currentBranch = await Git.getCurrentBranch()
    if (currentBranch !== dataBranchName) {
      await Git.forceSwitch(previousBranch)
      logerror(`Current branch is ${ currentBranch } instead of ${ dataBranchName } after switching. This should not happen. Aborting operation to prevent potential data loss.`)
      return
    }

    verbose(`Switched to branch ${ currentBranch } successfully`)
  } catch (error) {
    verbose(`Error occurred while switching to branch ${ dataBranchName }`, error)
    await Git.forceSwitch(previousBranch)
    return { status: "error thrown" as const, error }
  }

  try {
    await callback()
  } finally {
    verbose(`Switching back to previous branch ${ previousBranch }`)
    await Git.forceSwitch(previousBranch)
  }
}