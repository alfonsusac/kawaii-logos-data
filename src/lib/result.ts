// import type { Entries } from "../../types"
// import { generateGitIgnore } from "./util"
// import { Git } from "./git-shell"
// import { logProcess } from "./log"

// export async function storeResult(data: Entries) {
//   const response = prepareResponse(data)

  // if (!isInGitHubAction)
  // return await writeToKawaiiFolder(response)

  // return await usingDataBranch(
    // async () => {
      // await writeDataBranchFiles(response)
      // await saveChangesToDataBranch(response)
    // }
  // )
// }

// --------

// type StaticResponse = ReturnType<typeof prepareResponse>
// function prepareResponse(data: Entries) {
//   const response = {
//     updatedAt: new Date().toISOString(),
//     data
//   }
//   return {
//     response,
//     stringified: JSON.stringify(response, null, 2)
//   }
// }

// --------

// async function writeToKawaiiFolder(response: StaticResponse) {
//   return await write(pathToGeneratedImageJSON, response.stringified)
// }

// --------

// async function usingDataBranch(callback: () => Promise<void>) {
//   const branch = await Git.branch({ all: true }).text()
//   if (branch.includes("data")) {
//     await Git.switch("data")
//     await Git.pull()
//   } else {
//     await Git.switch("data", { orphan: true })
//   }
//   logProcess(`Switched to data branch`)
//   try {
//     await callback()
//   } finally {
//     await Git.switch("main", { force: true, })
//   }
// }

// --------

// async function writeDataBranchFiles(response: StaticResponse) {
//   await Bun.write("images.json", response.stringified)
//   await Bun.write(".gitignore", generateGitIgnore('*', '!.gitignore', '!images.json', '!README.md'))
//   logProcess(`Modified data/images.json to "data" branch`)
//   // await Bun.write("README.md", generateReadme(response))
// }
