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
import { black, blue, cyan, green, reset } from "./lib/ansii"
import { cacheInstance } from "./lib/cache"
import { info, logerror, logger, logMajorStep, verbose, warn } from "./lib/log"
import type { Output } from "./lib/model/output"
import { resolveDefinitions } from "./resolve-definitions"
import { rm } from "fs/promises"



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
    '/data.json': stringified,
    '/README.md': `# Data Output
This branch is used to store the data of the images. It is updated automatically by the GitHub Actions.

Last Updated: \`${ response.updatedAt }\`

### Authors
${ response.data.map(entry => `- ${ entry.displayName }`).join("\n") }

### Contributing

If you want to contribute such as adding missing image or fixing incorrect data, please refer head over to the \`main\` branch
`,
    '/types.ts': outputTypeFileContent,
    '/.gitignore': `*
!.gitignore
!README.md
!data.json
`
    // Switching branch from main to data branch will cause gitignored files to carry over. 
    // So we need to re-ignore those files in the data branch.
    // So that when we commit, we won't accidentally commit files that are not supposed to be in the data branch such as the source code or other config files.
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

      verbose('git add .')
      await Bun.$`git add .`

      verbose(`git commit -m "Update data ${ data.response.updatedAt }" -a`)
      await Bun.$`git commit -m "Update data ${ data.response.updatedAt }" -a`

      verbose(`git push -u origin ${ dataBranchName }`)
      await Bun.$`git push -u origin ${ dataBranchName }`
    }
  )
}



async function usingGitBranch(
  dataBranchName: string,
  callback: () => Promise<void>
) {
  const log = logger("usingGitBranch")

  const mainBranch = await Bun.$`git branch --show-current`.text()
  const branches = (await Bun.$`git branch --format="%(refname:short)" -a`.text())
    .split('\n')
    .filter(branch => branch.trim() !== '')
  const hasDataBranch = branches.includes(dataBranchName)
  const hasUncommitedChanges = (await Bun.$`git status --porcelain`).text().trim() !== ''
  if (hasUncommitedChanges) {
    log.error(`Local changes detected. Please commit or stash your changes before running the script.`)
    return
  }
  try {
    if (hasDataBranch) {
      log.verbose(`git switch ${ dataBranchName }`)
      await Bun.$`git switch ${ dataBranchName }`
      log.verbose(`git pull`)
      await Bun.$`git pull`
    } else {
      log.verbose(`git switch --orphan ${ dataBranchName }`)
      await Bun.$`git switch --orphan ${ dataBranchName }`
    }
  } catch (error) {
    log.error(`Error occurred while switching to data branch`, error)
    log.verbose(`git switch ${ mainBranch } --force`)
    await Bun.$`git switch ${ mainBranch } --force`
    return
  }
  // Added extra check to ensure we are on the correct branch before running callback
  const currentBranch = await Bun.$`git branch --show-current`.text()
  if (currentBranch.trim() !== dataBranchName) {
    log.error(`Failed to switch to branch ${ dataBranchName }. Current branch is ${ currentBranch }`)
    log.verbose(`git switch ${ mainBranch } --force`)
    await Bun.$`git switch ${ mainBranch } --force`
    return
  }
  log.verbose(`Switched to branch ${ dataBranchName }`)
  try {
    await callback()
  } finally {
    log.verbose(`git switch ${ mainBranch } --force`)
    await Bun.$`git switch ${ mainBranch } --force`
  }
}