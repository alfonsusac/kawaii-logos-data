import { existsSync as exists } from "fs"
import { Git } from "./git-shell"
import { allImgGlob } from "./util"
import { pathToTempClonedRepo, root } from "./paths"
import { logProcess } from "./log"

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

export async function getCreationDate(file: string, git: Git) {
  return await git.log(file, {
    diffFilter: "A",
    format: "%cD",
    date: "short",
  }).text()
}