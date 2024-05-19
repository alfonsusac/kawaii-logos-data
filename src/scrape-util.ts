import { existsSync as exists } from "fs"
import { Git } from "./lib/git-shell"
import { allImgGlob, delay } from "./lib/util"
import { pathToTempClonedRepo, root } from "./lib/path"
import { logProcess } from "./lib/log"

export type Repository = Awaited<ReturnType<typeof cloneRepository>>

export async function cloneRepository(repositoryPath: string) {
  const cwd = root(pathToTempClonedRepo, repositoryPath)
  const git = new Git(cwd)
  if (!exists(cwd)) {

    logProcess(`Clone not found, Cloning ${ repositoryPath }`)
    await git.clone(repositoryPath, { quiet: true })

  } else {

    logProcess(`Clone found, Pulling ${ repositoryPath }`)
    await git.pull({ quiet: true })

  }
  const branch = await getRootBranch(git)
  return { git, branch, cwd }
}

async function getRootBranch(git: Git) {
  return (await git.branch({ showCurrent: true }).text()).replace(/\n/g, "")
}

export async function getImageFilePaths(cwd: string) {
  return Array.fromAsync(
    new Bun.Glob(allImgGlob).scan({ cwd })
  )
}


