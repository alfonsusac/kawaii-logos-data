import { repositoryConfigs, type RepositoryConfig } from "./config/images-scraped"
import { getAvatarURLfromRepoPath, GitHub } from "./lib/url-github"
import { logError, logProcess } from "./lib/log"
import { cloneRepository, getImageFilePaths, type Repository } from "./scrape-util"
import { isInGitHubAction, resolveIntoArray } from "./lib/util"
import type { Image, Entries, Entry } from "../types"
import { getCreationDate, getHistory } from "./lib/history"

export async function getScrapedImageList(): Promise<Entries> {

  const processedConfig = await resolveIntoArray(repositoryConfigs
    // .filter(cfg => !isInGitHubAction ? cfg.repoPath === "mkpoli/VTuber-Styled-Logos" : true) // Dev only
    .filter(cfg => !isInGitHubAction ? cfg.repoPath === "SAWARATSUKI/KawaiiLogos" : true) // Dev only
    .map(processConfig)
  )

  return processedConfig.map<Entry>(result => {
    return ({
      handleName: result.handleName || result.githubUsername,
      pfp: result.pfp || getAvatarURLfromRepoPath(result.githubUsername),
      link: {
        github: result.githubUsername,
        twitter: result.twitter
      },
      license: result.license,
      repository: GitHub.repositoryUrl(result.repoPath),
      groups: result.groups?.map(group => ({
        name: group.name,
        files: group.files.map<Image>(file => ({
          title: file.name,
          path: file.filePath.original,
          createdAt: file.createdAt,
          imgSrc: GitHub.rawFileUrl(result.repoPath, file.branch, file.filePath.original),
          source: GitHub.sourceFilePageUrl(result.repoPath, file.branch, file.filePath.original),
          objectFit: result.objectFit,
          history: file.history,
        }))
      })),
    })
  })
}

// ------

async function processConfig(userConfig: RepositoryConfig) {

  const config = getConfig(userConfig)

  const groups = await (
    async () => {
      try {
        const repository = await cloneRepository(config.repoPath)
        let filePaths = await getImageFilePaths(repository.cwd)
        logProcess(`Scraped repository ${ config.repoPath }`)

        const fileFilterer = (item: string) => config.filter.every(filter => filter(item))
        filePaths = filePaths.filter(fileFilterer)

        const preprocessFilePath = (item: string) => config.preprocess
          .reduce(
            (item, preprocessor) => {
              return { preprocessed: preprocessor(item.preprocessed), original: item.original }
            },
            { preprocessed: item, original: item }
          )
        const preprocessedfilePaths = filePaths.map(preprocessFilePath)

        const files = await resolveIntoArray(preprocessedfilePaths.map(processFile, repository))
        const groups = processFilesIntoGroups(files)
        return groups

      } catch (error) {
        logError(error, `Error scraping repository ${ config.repoPath }`)
        logProcess(`--- end of error scraping repository ${ config.repoPath } ---`)
        return []
      }
    }
  )()

  return {
    ...config,
    groups,
  }
}

// ------

function getConfig(config: RepositoryConfig) {
  return {
    ...config,
    filter: config.filter ?? [],
    preprocess: config.preprocess ?? [],
    githubUsername: config.repoPath.split("/")[0],
  }
}

// ------

async function processFile(this: Repository, filePath: { preprocessed: string, original: string }) {
  logProcess(`Processed file ${ filePath.preprocessed }`)
  const createdAt = await getCreationDate(filePath.original, this.git)
  const history = await getHistory(filePath.original, this.git)
  const name = filePath.preprocessed.split("/").pop() ?? filePath.preprocessed
  const branch = this.branch
  logProcess(`Processed file ${ filePath.preprocessed }`)
  return { name, createdAt, branch, history, filePath }
}
type ProcessedFile = Awaited<ReturnType<typeof processFile>>

// ------

type Group = {
  name: string
  files: ProcessedFile[]
}

function processFilesIntoGroups(files: ProcessedFile[]) {

  const groups: Group[] = []

  files.forEach(file => {
    const groupName = file.filePath.preprocessed.split("/").at(-2) ?? file.filePath.preprocessed.split("/").at(-1) ?? file.filePath.preprocessed
    const group = groups.find(g => g.name === groupName)
    if (group) {
      return group.files.push(file)
    }
    return groups.push({
      name: groupName,
      files: [file]
    })
  })

  return groups

}