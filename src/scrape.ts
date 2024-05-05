import { repositoryConfigs, type RepositoryConfig } from "./config/images-scraped"
import { getAvatarURLfromRepoPath, GitHub } from "./github-url"
import { logError, logProcess } from "./log"
import { cloneRepository, getCreationDate, getImageFilePaths, type Repository } from "./scrape-util"

import type { Data } from "./types"
import { intoArray } from "./util"

export async function getScrapedImageList(): Promise<Data> {
  const repositories = await intoArray(repositoryConfigs.map(processConfig))
  return repositories.map(result => {
    const githubUsername = result.config.repoPath.split("/")[0]
    return ({
      handleName: result.config.author.handleName || githubUsername,
      pfp: result.config.author.pfp || getAvatarURLfromRepoPath(githubUsername),
      link: {
        github: result.config.author.link?.github || GitHub.userProfileUrl(githubUsername),
        ...result.config.author.link,
      },
      license: result.config.author.license,
      repository: GitHub.repositoryUrl(result.config.repoPath),
      images: result.files.map(file => ({
        title: file.file.split("/").pop()!,
        imgSrc: `https://raw.githubusercontent.com/${ result.config.repoPath }/${ result.repository.branch }/${ file.file }`,
        source: `https://github.com/${ result.config.path }/blob/${ result.repository.branch }/${ file.file }`,
      }))
    })
  })
}

async function processConfig(config: RepositoryConfig) {
  try {
    const repository = await cloneRepository(config.repoPath)
    const filePaths = await getImageFilePaths(repository.cwd)
    logProcess(`Scraped repository ${ config.repoPath }`)

    const files = await intoArray(filePaths.map(processFile, repository))
    return {
      config,
      repository,
      files
    }

  } catch (error) {
    logError(`Error scraping repository ${ config.repoPath }`)
    throw error
  }
}

async function processFile(this: Repository, file: string) {
  const createdAt = await getCreationDate(file, this.git)
  return { file, createdAt }
}
