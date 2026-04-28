import { rm } from "fs/promises"
import { generateGitIgnore } from "./utils"
import { info } from "console"
import { cyan, reset } from "./lib/ansii"
import type { Resolved } from "./resolve/output"

export async function persistData(resolved: Resolved, opts: {
  outputTypeDefFilePath: string
}) {

  const data = await prepareDataForPersistence(resolved, opts.outputTypeDefFilePath)
  await saveToDisk(data, './dist', { clean: true })

}

// ----------------------------------------------------------

async function prepareDataForPersistence(resolved: Resolved, outputTypeDefFilePath: string) {
  const updatedAt = new Date().toISOString()
  const stringified = JSON.stringify({ updatedAt, data: resolved })
  const outputTypeFileContent = await Bun.file(outputTypeDefFilePath).text()
  const folderStructure = {
    // Switching branch from main to data branch will cause gitignored files to carry over. 
    // So we need to re-ignore those files in the data branch.
    // So that when we commit, we won't accidentally commit files that are not supposed to be in the data branch such as the source code or other config files.
    '/.gitignore': generateGitIgnore(
      '*',
      '!.gitignore',
      '!data.json',
      '!README.md'
    ),
    '/data.json': stringified,
    '/README.md': [
      `# The Data Branch`,
      `This branch is used to store the data of the images. It is updated automatically by the GitHub Actions.`,
      ``,
      `Last Updated: \`${ updatedAt }\``,
      ``,
      `### Authors`,
      `${ resolved.map(entry => `- ${ entry.displayName }`).join("\n") }`,
      ``,
      `### Contributing`,
      ``,
      `If you want to contribute such as adding missing image or fixing incorrect data, please refer head over to the \`main\` branch`
    ].join('\n'),
    '/types.ts': outputTypeFileContent,
  } satisfies {
    '/.gitignore': string,
    '/data.json': string,
    '/README.md': string,
    '/types.ts': string,
  }
  return {
    updatedAt,
    stringified,
    folderStructure
  }
}

type PreparedDataForPersistence = Awaited<ReturnType<typeof prepareDataForPersistence>>

// ----------------------------------------------------------

async function saveToDisk(data: PreparedDataForPersistence, path: string, opts: { clean?: boolean }) {

  opts.clean && await rm(path, { recursive: true, force: true })
  await Promise.all(Object.entries(data.folderStructure).map(([ filepath, content ]) => {
    return Bun.write(`${ path }${ filepath }`, content)
  }))

  info(`Data saved to ${ cyan }${ path }${ reset } successfully`)

}

// ----------------------------------------------------------

