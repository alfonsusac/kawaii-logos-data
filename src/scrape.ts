import { repositoryConfigs, type RepositoryConfig } from "./config/images-scraped"
import { getAvatarURLfromRepoPath, GitHub } from "./url-github"
import { logError, logProcess } from "./log"
import { cloneRepository, getCreationDate, getImageFilePaths, type Repository } from "./scrape-util"

// import type { Data } from "./types"
import { intoArray } from "./util"
import type { Image, Entries, Entry } from "../types"

export async function getScrapedImageList(): Promise<Entries> {
  const processedConfig = await intoArray(repositoryConfigs.map(processConfig))

  return processedConfig.map<Entry>(result => {
    return ({
      handleName: result.author.handleName || result.githubUsername,
      pfp: result.author.pfp || getAvatarURLfromRepoPath(result.githubUsername),
      link: {
        github: result.author.link?.github || result.githubUsername,
        ...result.author.link,
      },
      license: result.author.license,
      repository: GitHub.repositoryUrl(result.repoPath),
      images: result.files?.map<Image>(file => ({
        title: file.name,
        path: file.path,
        createdAt: file.createdAt,
        imgSrc: GitHub.rawFileUrl(result.repoPath, file.branch, file.path),
        source: GitHub.sourceFilePageUrl(result.repoPath, file.branch, file.path),
        objectFit: result.objectFit,
      })),
      groups: result.groups?.map(group => ({
        name: group.name,
        files: group.files.map<Image>(file => ({
          title: file.name,
          path: file.path,
          createdAt: file.createdAt,
          imgSrc: GitHub.rawFileUrl(result.repoPath, file.branch, file.path),
          source: GitHub.sourceFilePageUrl(result.repoPath, file.branch, file.path),
          objectFit: result.objectFit,
        }))
      })),
    })
  })
}

async function processConfig(config: RepositoryConfig) {
  const githubUsername = config.repoPath.split("/")[0]
  try {
    const repository = await cloneRepository(config.repoPath)
    const filePaths = await getImageFilePaths(repository.cwd)
    logProcess(`Scraped repository ${ config.repoPath }`)

    const files = await intoArray(filePaths.map(processFile, repository))
      .then(files => files.filter(file => config.filter?.(file.path) ?? true))

    type Group = {
      name: string
      files: (typeof files[0])[]
    }

    const groups = files.reduce<Group[]>((array, current) => {
      
      const groupName = current.path.split("/").at(-2)
      if(!groupName) return array

      const group = array.find(g => g.name === groupName)
      if (group) {
        group.files.push(current)
        return array
      }

      array.push({
        name: groupName,
        files: [{
          ...current,
        }]
      })

      return array
    }, [])

    return {
      ...config,
      ...repository,
      githubUsername,
      files,
      groups,
    }

  } catch (error) {
    logError(`Error scraping repository ${ config.repoPath }`)
    console.log(error)
    logProcess(`--- end of error scraping repository ${ config.repoPath } ---`)
    return {
      ...config,
      githubUsername,
      files: undefined,
      groups: undefined,
    }
  }
}

async function processFile(this: Repository, path: string) {
  const createdAt = (await getCreationDate(path, this.git)).replaceAll('\n','')
  const name = path.split("/").pop()!
  const branch = this.branch
  return { path, name, createdAt, branch }
}
