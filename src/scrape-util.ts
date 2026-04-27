import { existsSync as exists } from "fs"
// import { Git } from "./lib/git-shell"
import { allImgGlob, delay } from "./lib/util"
import { pathToTempClonedRepo, root } from "./lib/path"
import { logProcess } from "./lib/log"

export type Repository = Awaited<ReturnType<typeof getRepository>>

// export async function getRepository(repositoryPath: string) {
//   // 1. check if repo is already cloned in temp directory
//   // 2. if not, clone it
//   // 3. if yes, pull it to update
//   // 4. return git instance, branch name, and cwd


//   const cwd = root(pathToTempClonedRepo, repositoryPath)
//   const git = new Git(cwd)
//   console.log("cwd", cwd)
//   if (!exists(cwd)) {
//     logProcess(`Clone not found, Cloning ${ repositoryPath }`)
//     await git.clone(repositoryPath, { quiet: true })
//   } else {
//     logProcess(`Clone found, Pulling ${ repositoryPath }`)
//     await git.pull({ quiet: true })
//   }
//   const branch = await getRootBranch(git)
//   return { git, branch, cwd }
// }

// async function getRootBranch(git: Git) {
//   return (await git.branch({ showCurrent: true }).text()).replace(/\n/g, "")
// }

// export async function getImageFilePaths(cwd: string) {
//   return Array.fromAsync(
//     new Bun.Glob(allImgGlob).scan({ cwd })
//   )
// }


