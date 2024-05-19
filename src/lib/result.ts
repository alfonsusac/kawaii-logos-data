import { write } from "bun"
import type { Entries } from "../../types"
import { pathToGeneratedImageJSON } from "./path"
import { generateGitIgnore, isInGitHubAction } from "./util"
import { Git } from "./git-shell"
import { logProcess } from "./log"

export async function storeResult(data: Entries) {
  const response = prepareResponse(data)

  if (!isInGitHubAction)
    return await writeToKawaiiFolder(response)

  return await usingDataBranch(
    async () => {
      await writeDataBranchFiles(response)
      await saveChangesToDataBranch(response)
    }
  )
}

// --------

type StaticResponse = ReturnType<typeof prepareResponse>
function prepareResponse(data: Entries) {
  const response = {
    updatedAt: new Date().toISOString(),
    data
  }
  return {
    response,
    stringified: JSON.stringify(response, null, 2)
  }
}

// --------

async function writeToKawaiiFolder(response: StaticResponse) {
  return await write(pathToGeneratedImageJSON, response.stringified)
}

// --------

async function usingDataBranch(callback: () => Promise<void>) {
  const branch = await Git.branch({ all: true }).text()
  if (branch.includes("data")) {
    await Git.switch("data")
    await Git.pull()
  } else {
    await Git.switch("data", { orphan: true })
  }
  logProcess(`Switched to data branch`)
  try {
    await callback()
  } finally {
    await Git.switch("main", { force: true, })
  }
}

// --------

async function writeDataBranchFiles(response: StaticResponse) {
  await Bun.write("images.json", response.stringified)
  await Bun.write(".gitignore", generateGitIgnore('*','!.gitignore', '!images.json','!README.md',
))
  logProcess(`Modified data/images.json to "data" branch`)
  await Bun.write("README.md", generateReadme(response))
}

// --------

const generateReadme = (response: StaticResponse) =>
  `# The Data Branch
This branch is used to store the data of the images. It is updated automatically by the GitHub Actions.
    
Last Updated: \`${ response.response.updatedAt }\`

### Authors
${ response.response.data.map(entry => `- [${ entry.handleName }](${ entry.repository })`).join("\n") }

### Contributing

If you want to contribute such as adding missing image or fixing incorrect data, please refer head over to the \`main\` branch`

// --------

async function saveChangesToDataBranch(response: StaticResponse) {
  await Git.add(".")
  await Git.commit(`Update data \`${ response.response.updatedAt }\``)
  await Git.push("origin", "data", { setUpstream: true })
  await Git.switch("main")
  logProcess(`Switched back to main branch`)
}