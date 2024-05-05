import { Git } from "./git-shell"
import { logProcess } from "./log"
import { rootDir } from "./paths"
import { isInGitHubAction } from "./util"

export async function updateDataBranch(data: string, updatedAt: string) {
  // if (!isInGitHubAction) return
  const git = new Git()

  // check if "data" orphan branch exists
  let branch = await git.branch({ all: true }).text()
  if (branch.includes("data")) {
    await git.switch("data")
    await git.pull()
  } else {
    await git.switch("data", { orphan: true })
  }
  logProcess(`switched to data branch`)

  // add data/images.json to "data" branch
  await Bun.write("images.json", data)
  await Bun.write(".gitignore", [
    '*',
    '!images.json',
    '!.gitignore',
  ].join(`\n`))
  logProcess(`modified data/images.json to "data" branch`)
  console.log(git.cwd)

  // delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Save changes to `data` branch
  console.log(git.cwd)
  await git.add("images.json .gitignore")
  console.log(git.cwd)
  await git.commit(`Update data \`${ updatedAt }\``)
  console.log(git.cwd)
  await git.push("origin", "data", { setUpstream: true })
  console.log(git.cwd)
  await git.switch("main")
  console.log(git.cwd)
  logProcess(`switched back to main branch`)
}