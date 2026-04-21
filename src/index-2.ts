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
import { cacheInstance } from "./lib/cache"
import { logger } from "./lib/log"
import type { Authors, Output } from "./lib/model/output"
import { resolveDefinitions } from "./resolve-definitions"
import { rm } from "fs/promises"


const log = logger("index")
log.info("Begin processing data")

await cacheInstance.initializeCacheData()

try {
  // 1. compile manually listed images
  // 2. compile scraped image lists
  // 3. store result
  // 4. call website revalidation

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

  const output = await prepareOutput(resolved)
  await cleanAndSaveToDisk(output, "./dist", true)
  await saveToDataBranch(output, "main-2-data")

  log.success("Data processed successfully")
} catch (error) {
  log.error("Error processing data", error)
} finally {
  log.verbose("End of script")
}


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
  const log = logger("saveToDisk")
  log.info(`Saving Data to ${ folderpath }`)

  clean && await rm(folderpath, { recursive: true, force: true })
  await Promise.all(Object.entries(data.folderStructure).map(([ path, content ]) => {
    return Bun.write(`${ folderpath }${ path }`, content)
  }))
  log.success(`Data saved to ${ folderpath } successfully`)
}


async function saveToDataBranch(data: DataResponse, dataBranchName: string) {
  await usingGitBranch(
    dataBranchName,
    async () => {
      await cleanAndSaveToDisk(data, "./dist", true)

    }
  )
  // const log = logger("saveToDataBranch")
  // log.info(`Saving Data to branch ${ dataBranchName }`)

  // const branch = await Bun.$`git branch --show-current -a`.text()
  // try {
  //   if (branch.includes(dataBranchName)) {
  //     log.verbose('git switch ${ dataBranchName }')
  //     const gitswitch = await Bun.$`git switch ${ dataBranchName }`.nothrow()
  //     if (gitswitch.stderr.toString().includes("Please commit your changes or stash them before you switch branches.")) {
  //       log.error(`Local changes detected. Please commit or stash your changes before running the script.`)
  //       return
  //     }

  //     log.verbose('git pull')
  //     await Bun.$`git pull`
  //   } else {
  //     log.verbose('git switch --orphan ${ dataBranchName }')
  //     const gitswitch = await Bun.$`git switch --orphan ${ dataBranchName }`.nothrow()

  //     if (gitswitch.stderr.toString().includes("Please commit your changes or stash them before you switch branches.")) {
  //       log.error(`Local changes detected. Please commit or stash your changes before running the script.`)
  //       return
  //     }
  //   }
  //   log.verbose(`Switched to branch ${ dataBranchName }`)
  //   const currentBranch = await Bun.$`git branch --show-current`.text()
  //   if (currentBranch.trim() !== dataBranchName) {
  //     log.error(`Failed to switch to branch ${ dataBranchName }. Current branch is ${ currentBranch }`)
  //     return
  //   }

  //   log.verbose(`Saving data to disk in branch ${ dataBranchName }`)
  //   await cleanAndSaveToDisk(data, "./")

  //   log.verbose('git add .')
  //   await Bun.$`git add .`

  //   log.verbose(`git commit -m "Update data ${ data.response.updatedAt }" -a`)
  //   await Bun.$`git commit -m "Update data ${ data.response.updatedAt }" -a`

  //   log.verbose(`git push -u origin ${ dataBranchName }`)
  //   await Bun.$`git push -u origin ${ dataBranchName }`

  //   log.verbose(`git switch ${ mainBranchName }`)
  //   await Bun.$`git switch ${ mainBranchName }`

  // } catch (error) {
  //   log.error(`Error occurred while saving to data branch`, error)
  //   log.verbose(`git switch ${ mainBranchName } --force`)
  //   await Bun.$`git switch ${ mainBranchName } --force`
  // }
}



async function usingGitBranch(
  dataBranchName: string,
  callback: () => Promise<void>
) {
  const log = logger("usingGitBranch")

  const currentBranch = await Bun.$`git branch --show-current`.text()
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
    log.verbose(`git switch ${ currentBranch } --force`)
    await Bun.$`git switch ${ currentBranch } --force`
    return
  }
  log.verbose(`Switched to branch ${ dataBranchName }`)
  try {
    await callback()
  } finally {
    log.verbose(`git switch ${ currentBranch } --force`)
    await Bun.$`git switch ${ currentBranch } --force`
  }
}