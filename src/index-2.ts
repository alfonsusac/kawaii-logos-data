import { ShellError } from "bun"
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

  await saveToDisk(resolved, "./dist")
  await saveToDataBranch(resolved, "main-2", "main-2-data")

  log.success("Data processed successfully")
} catch (error) {
  log.error("Error processing data", error)
} finally {
  log.verbose("End of script")
}




async function getFolderStructure(data: Output) {
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
  }

  return { folderStructure, response }

}




async function saveToDisk(data: Output, folderpath: string) {
  const log = logger("saveToDisk")
  log.info(`Saving Data to ${ folderpath }`)

  const result = await getFolderStructure(data)
  await rm(folderpath, { recursive: true, force: true })
  await Promise.all(Object.entries(result.folderStructure).map(([ path, content ]) => {
    return Bun.write(`${ folderpath }${ path }`, content)
  }))
  log.success(`Data saved to ${ folderpath } successfully`)
  return result
}


async function saveToDataBranch(data: Output, mainBranchName: string, dataBranchName: string) {
  const log = logger("saveToDataBranch")
  log.info(`Saving Data to branch ${ dataBranchName }`)

  const branch = await Bun.$`git branch --show-current -a`.text()
  try {
    if (branch.includes(dataBranchName)) {
      log.verbose('git switch ${ dataBranchName }')
      await Bun.$`git switch ${ dataBranchName }`

      log.verbose('git pull')
      await Bun.$`git pull`
    } else {
      log.verbose('git switch --orphan ${ dataBranchName }')
      const gitswitch = await Bun.$`git switch --orphan ${ dataBranchName }`.nothrow()
      console.log("AAAA")
      console.log(gitswitch.stderr.toString())
      console.log("AAAA")
      if (gitswitch.stderr.toString().includes("Please commit your changes or stash them before you switch branches.")) {
        log.error(`Local changes detected. Please commit or stash your changes before running the script.`)
        return
      }
    }
    log.verbose(`Switched to branch ${ dataBranchName }`)
    try {
      const currentBranch = await Bun.$`git branch --show-current`.text()
      if (currentBranch.trim() !== dataBranchName) {
        log.error(`Failed to switch to branch ${ dataBranchName }. Current branch is ${ currentBranch }`)
        return
      }

      log.verbose(`Saving data to disk in branch ${ dataBranchName }`)
      const result = await saveToDisk(data, "./")

      log.verbose('git add .')
      await Bun.$`git add .`

      log.verbose(`git commit -m "Update data ${ result.response.updatedAt }" -a`)
      await Bun.$`git commit -m "Update data ${ result.response.updatedAt }" -a`

      log.verbose(`git push -u origin ${ dataBranchName }`)
      await Bun.$`git push -u origin ${ dataBranchName }`

      log.verbose(`git switch ${ mainBranchName }`)
      await Bun.$`git switch ${ mainBranchName }`

    } catch (error) {
      log.error(`Error occurred while saving to data branch`, error)
      log.verbose(`git switch ${ mainBranchName } --force`)
      await Bun.$`git switch ${ mainBranchName } --force`
    }
  } catch (error) {
    // console.log("Error", error)
    // console.log("Error message", error instanceof Error ? error.message : "Unknown error")
    // console.log("Error message (stderr):", error instanceof Bun.ShellError ? error.stderr : "Not a ShellError")
    // if (typeof error === "object" && error !== null && 'stderr' in error && error.stderr.includes("Your local changes to the following files would be overwritten by checkout:")) {
    //   log.error(`Local changes detected. Please commit or stash your changes before running the script.`)
    // }
  }
}