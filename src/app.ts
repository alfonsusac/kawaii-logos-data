import { black, cyan, reset } from "./lib/ansii"
import { cacheInstance } from "./lib/cache"
import { resolveDefinitions } from "./resolve"
import { readdir, rm } from "fs/promises"
import { Git } from "./lib/git"
import { runApp, step, verbose, warn } from "./pipeline"
import { checkEnvVars } from "./env"
import { logger } from "./lib/log"
import { revalidateMainWebsite } from "./revalidate"
import { author_definitions } from "./content/_authors"
import type { KawaiiLogosData } from "./output"


runApp(async () => {

  await step(
    "Setup and Initialization", async () => {
      await step("Validating env var", checkEnvVars)
      await step("Initializing cache", cacheInstance.initializeCacheData)
    },
  )

  const outputData = await step(
    "Resolving definitions", async () => {
      const resolved = await resolveDefinitions(author_definitions)
      return resolved
    }
  )

  await step(
    "Persisting data", async () => {
      const output = await step("Preparing output",
        () => prepareOutput(outputData))
      await step("Saving to disk",
        () => cleanAndSaveToDisk(output, "./dist", { clean: true }))
      await step("Saving to data branch",
        () => saveToDataBranch(output, "main-2-data"))
    }
  )

  await step(
    "Running side effects", async () => {
      await step("Revalidating website", revalidateMainWebsite)
    }
  )
})


// --------------------------------------------------------------------------------


async function prepareOutput(outputData: KawaiiLogosData) {

  const output: KawaiiLogosData.Response = {
    updatedAt: new Date().toISOString(),
    data: outputData
  }

  const generateGitIgnore = (...lines: string[]) => lines.join('\n') + '\n'

  const stringified = JSON.stringify(output, null, 2)
  const outputTypeFileContent = await Bun.file('./src/output.ts').text()
  const folderStructure = {
    // Switching branch from main to data branch will cause gitignored files to carry over. 
    // So we need to re-ignore those files in the data branch.
    // So that when we commit, we won't accidentally commit files that are not supposed to be in the data branch such as the source code or other config files.
    '/.gitignore': generateGitIgnore(
      '*',
      '!.gitignore',
      '!data.json',
      '!README.md',
      '!types.ts',
    ),
    '/data.json': stringified,
    '/README.md': [
      `# The Data Branch`,
      `This branch is used to store the data of the images. It is updated automatically by the GitHub Actions.`,
      ``,
      `Last Updated: \`${ output.updatedAt }\``,
      ``,
      `### Authors`,
      `${ output.data.authors.map(entry => `- ${ entry.displayName }`).join("\n") }`,
      ``,
      `### Standard Licenses`,
      `${ Object.entries(output.data.standardLicenses).map(([ key, value ]) => `- ${ key }: ${ value.label }`).join("\n") }`,
      ``,
      `### Contributing`,
      ``,
      `If you want to contribute such as adding missing image or fixing incorrect data, please refer head over to the \`main\` branch`
    ].join('\n'),
    '/types.ts': outputTypeFileContent,
  } satisfies {
    '/.gitignore': string,
    '/data.json': string,
    '/README.md': string,
    '/types.ts': string,
  }

  return {
    output,
    stringified,
    folderStructure
  }
}
type DataResponse = Awaited<ReturnType<typeof prepareOutput>>



async function cleanAndSaveToDisk(data: DataResponse, folderpath: string, opts: { clean: boolean }) {

  opts.clean && await rm(folderpath, { recursive: true, force: true })
  await Promise.all(Object.entries(data.folderStructure).map(([ path, content ]) => {
    return Bun.write(`${ folderpath }${ path }`, content)
  }))

  verbose(`Data saved to ${ cyan }${ folderpath }${ black } successfully`)
}



async function saveToDataBranch(data: DataResponse, dataBranchName: string) {
  if (process.env.NODE_ENV !== "production") {
    warn(`${ cyan }--watch${ reset } mode used in bun dev. Skipping git switch and commit.\n  Use ${ cyan }'bun start'${ reset } to enable git switch and commit.`)
    return
  }
  await usingGitBranch(
    dataBranchName,
    async () => {
      console.log("before")
      console.log((await readdir('.')).join('\n'))
      await cleanAndSaveToDisk(data, "./", { clean: false })
      console.log("after")
      console.log((await readdir('.')).join('\n'))
      await Git.trackAll()
      await Git.commitAllTracked(`Update data ${ data.output.updatedAt }`)
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
  const {
    hasLocal,
    hasRemote,
  } = await Git.checkHasBranch(dataBranchName)
  // verbose(`Current branch is ${ previousBranch }. Target data branch is ${ dataBranchName }. Branch exists: ${ hasBranch }`)

  if (await Git.checkHasUncommitedChanges()) {
    logerror(`Uncommited changes detected. Please commit or stash your changes before switching to branch ${ dataBranchName }.`)
    return
  }

  try {
    if (hasRemote) {
      await Git.switch(dataBranchName)
      await Git.pull()
    } else if (hasLocal && !hasRemote) {
      await Git.switch(dataBranchName)
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
    await Bun.$`bun i`
  }
}