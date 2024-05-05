import { Git } from "./git-shell"
import { logError, logProcess } from "./log"
import { isInGitHubAction } from "./util"

// export async function updateDataBranchOld(data: string, updatedAt: string) {
//   // check if "data" orphan branch exists
//   let branch = await Bun.$`git branch -a`.text()
//   if (!branch.includes("data")) {
//     // create "data" orphan branch
//     await Bun.$`git switch --orphan data`
//   } else {
//     await Bun.$`git switch data`
//     await Bun.$`git pull`
//   }

//   // add data/images.json to "data" orphan branch
//   await Bun.write("images.json", data)
//   await Bun.write(".gitignore", "*\n!images.json\n!.gitignore")

//   await Bun.$`git add images.json .gitignore`
//   await Bun.$`git commit -m "Update data \`${ updatedAt }\`"`
//   await Bun.$`git push -u origin data`
//   await Bun.$`git switch main`
// }

export async function updateDataBranch(data: string, updatedAt: string) {
  if (!isInGitHubAction) return
  try {
    // check if "data" orphan branch exists
    let branch = await Git.branch({ all: true }).text()
    console.log(branch)
    if (branch.includes("data")) {
      await Git.switch("data")
    } else {
      await Git.switch("data", { orphan: true })
    }
    await Git.pull()
    logProcess(`switched to data branch`)

    // add data/images.json to "data" branch
    await Bun.write("images.json", data)
    const gitignore = [
      '*',
      '!images.json',
      '!.gitignore',
    ].join(`\n`)
    await Bun.write(".gitignore", gitignore)
    logProcess(`modified data/images.json to "data" branch`)

    // Save changes to `data` branch
    await Git.add(".") // using `images.json` and `.gitignore` doesn't work unless we use raw Bun.$`git add`
    await Git.commit(`Update data \`${ updatedAt }\``)
    await Git.push("origin", "data", { setUpstream: true })
    await Git.switch("main")
    logProcess(`switched back to main branch`)

  } catch (error) {
    logError(`Error occurred while updating data branch`)
    console.log(error)
    Git.switch("main", {
      force: true,
    })
  }
}