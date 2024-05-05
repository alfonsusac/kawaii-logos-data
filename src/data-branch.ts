import { Git } from "./git-shell"
import { logProcess } from "./log"
import { rootDir } from "./paths"
import { isInGitHubAction } from "./util"

export async function updateDataBranchOld(data: string, updatedAt: string) {
  // check if "data" orphan branch exists
  let branch = await Bun.$`git branch -a`.text()
  if (!branch.includes("data")) {
    // create "data" orphan branch
    await Bun.$`git switch --orphan data`
  } else {
    await Bun.$`git switch data`
    await Bun.$`git pull`
  }

  // add data/images.json to "data" orphan branch
  await Bun.write("images.json", data)
  await Bun.write(".gitignore", "*\n!images.json\n!.gitignore")

  await Bun.$`git add images.json .gitignore`
  await Bun.$`git commit -m "Update data \`${ updatedAt }\`"`
  await Bun.$`git push -u origin data`
  await Bun.$`git switch main`
}

export async function updateDataBranch(data: string, updatedAt: string) {
  // if (!isInGitHubAction) return
  const git = new Git()
  try {

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

    await Bun.$`echo *`

    // Save changes to `data` branch
    await git.add("images.json .gitignore")
    console.log(git.cwd)
    await git.commit(`Update data \`${ updatedAt }\``)
    console.log(git.cwd)
    await git.push("origin", "data", { setUpstream: true })
    console.log(git.cwd)
    await git.switch("main")
    console.log(git.cwd)
    logProcess(`switched back to main branch`)
  } catch (error) {
    console.log(error)
    git.switch("main", {
      force: true,
    })
  }
}