import { repositoryConfigs, type RepositoryConfig } from "./config/images-scraped"
import { getAvatarURLfromRepoPath, GitHub } from "./url-github"
import { logError, logProcess } from "./log"
import { cloneRepository, getCreationDate, getImageFilePaths, type Repository } from "./scrape-util"

// import type { Data } from "./types"
import { intoArray } from "./util"
import type { Data } from "./types"

export async function getScrapedImageList(): Promise<Data> {
  const processedConfig = await intoArray(repositoryConfigs.map(processConfig))

  return processedConfig.map(result => {
    return ({
      handleName: result.author.handleName || result.githubUsername,
      pfp: result.author.pfp || getAvatarURLfromRepoPath(result.githubUsername),
      link: {
        github: result.author.link?.github || GitHub.userProfileUrl(result.githubUsername),
        ...result.author.link,
      },
      license: result.author.license,
      repository: GitHub.repositoryUrl(result.repoPath),
      images: result.files.map(file => ({
        title: file.name,
        path: file.path,
        imgSrc: GitHub.rawFileUrl(result.repoPath, file.branch, file.path),
        source: GitHub.sourceFilePageUrl(result.repoPath, file.branch, file.path),
      }))
    })
  })
}

type ProcessedConfig = Awaited<ReturnType<typeof processConfig>>

async function processConfig(config: RepositoryConfig) {
  const githubUsername = config.repoPath.split("/")[0]
  try {
    const repository = await cloneRepository(config.repoPath)
    const filePaths = await getImageFilePaths(repository.cwd)
    logProcess(`Scraped repository ${ config.repoPath }`)

    const files = await intoArray(filePaths.map(processFile, repository))
    return {
      ...config,
      ...repository,
      githubUsername,
      files
    }

  } catch (error) {
    logError(`Error scraping repository ${ config.repoPath }`)
    return {
      ...config,
      githubUsername,
      files: [],
    }
  }
}

async function processFile(this: Repository, path: string) {
  const createdAt = await getCreationDate(path, this.git)
  const name = path.split("/").pop()!
  const branch = this.branch
  return { path, name, createdAt, branch }
}
