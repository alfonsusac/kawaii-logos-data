import { Git } from "./git-shell"
import { isInGitHubAction } from "./util"
import { write } from "bun"

export async function updateDataBranch(data: string, updatedAt: string) {
  if (!isInGitHubAction) return
  const git = new Git('')

  // check if "data" orphan branch exists
  let branch = await git.branch({ all: true }).text()
  if (branch.includes("data")) {
    await git.switch("data")
    await git.pull()
  } else {
    await git.switch("data", { orphan: true })
  }

  // add data/images.json to "data" orphan branch
  await write("images.json", data)
  await write(".gitignore", [
    '*',
    '!images.json',
    '!.gitignore',
  ].join(`\n`))

  // Save changes to `data` branch
  await git.add("images.json .gitignore")
  await git.commit(`Update data \`${ updatedAt }\``)
  await git.push("origin", "data", { setUpstream: true })
  await git.switch("main")
}