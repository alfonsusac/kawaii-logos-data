import { write } from "bun"
import { Git } from "./git-shell"
import { logError, logProcess } from "./log"
import { pathToGeneratedImageJSON } from "./paths"
import { isInGitHubAction } from "./util"
import type { Response } from "."

export async function updateDataBranch(res: Response, updatedAt: string) {
  const stringData = JSON.stringify(res, null, 2)

  if (!isInGitHubAction) {
    await write(pathToGeneratedImageJSON, stringData)
    return 
  }

  try {
    // check if "data" orphan branch exists
    let branch = await Git.branch({ all: true }).text()
    if (branch.includes("data")) {
      await Git.switch("data")
      await Git.pull()
    } else {
      await Git.switch("data", { orphan: true })
    }
    logProcess(`Switched to data branch`)

    // add data/images.json to "data" branch
    await Bun.write("images.json", stringData)
    const gitignore = [
      '*',
      '!images.json',
      '!.gitignore',
      '!README.md',
    ].join(`\n`)
    await Bun.write(".gitignore", gitignore)
    logProcess(`Modified data/images.json to "data" branch`)
    await Bun.write("README.md", `# The Data Branch
This branch is used to store the data of the images. It is updated automatically by the GitHub Actions.
    
Last Updated: ${ updatedAt }

### Authors
${res.data.map( entry => `- [${entry.handleName}](${entry.repository})` ).join("\n") }

### Contributing

If you want to contribute such as adding missing image or fixing incorrect data, please refer head over to the \`main\` branch
    `)

    // Save changes to `data` branch
    await Git.add(".") // using `images.json` and `.gitignore` doesn't work unless we use raw Bun.$`git add`
    await Git.commit(`Update data \`${ updatedAt }\``)
    await Git.push("origin", "data", { setUpstream: true })
    await Git.switch("main")
    logProcess(`Switched back to main branch`)

  } catch (error) {
    logError(`Error occurred while updating data branch`)
    console.log(error)
    Git.switch("main", {
      force: true,
    })
  }
}