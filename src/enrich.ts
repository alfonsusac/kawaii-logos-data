import { Git } from "./lib/git-shell"
import { getCreationDate, getHistory } from "./lib/history"
import { logger } from "./lib/log"
import { type AuthorSource, type ScrapedEntrySource } from "./lib/model"
import { root } from "./lib/path"
import { GitHub } from "./lib/url-github"
import { allImgGlob, groupBy } from "./lib/util"
import { existsSync } from "fs"
import { mkdir } from "fs/promises"

type Authors = AuthorSource & { id: string }

export async function enrichSourceData(data: Record<string, AuthorSource>) {
  const authors = Object
    .entries(data)
    .map(([ id, author ]) => ({ id, ...author }))
  const result = await Promise.all(
    authors.map(a => enrichAuthor(a))
  )
  return result
}

async function enrichAuthor(author: Authors) {

  const log = logger(`author:${ author.id }`)

  try {
    const enriched = { ...author }
    if (author.scrape) {
      const { filter, preprocess } = author.scrape.opts ?? {}
      const { platform, } = author.scrape.strategy
      if (platform === "github") {
        const { repoPath, strategy } = author.scrape.strategy
        const [ ghUser, ghRepo ] = repoPath.split("/")
        if (!author.pfp)
          enriched.pfp = `https://avatars.githubusercontent.com/${ ghUser }`
        await scrapeGithub(repoPath, strategy)
      } else {
        log.error('Unknown scraping platform', platform)
      }
    }
    return enriched
  } catch (error) {
    log.error('Error enriching author', error)
    return author
  }

  async function scrapeGithub(
    repoPath: `${ string }/${ string }`,
    strategy: ScrapedEntrySource[ 'strategy' ][ 'strategy' ],
    filterers: ((filepath: string) => boolean)[] = [],
    preprocessors: ((filepath: string) => string)[] = []
  ) {
    try {
      // Clone or pull the repository
      const repoCwd = root('.temp/cloned', repoPath)
      const repo$ = Bun.$.cwd(repoCwd)
      const dirExists = existsSync(repoCwd)
      if (!dirExists) {
        await mkdir(repoCwd, { recursive: true })
        await repo$`git clone -q ${ GitHub.gitUrl(repoPath) }`
      } else {
        await repo$`git pull -q`
      }
      const branchRes = await repo$`git branch --show-current`
      const branch = branchRes.text().trim()

      // Get all file paths
      const filePathsAsyncIterator = new Bun.Glob(allImgGlob).scan({ cwd: repoCwd })
      const filePaths = await Array.fromAsync(filePathsAsyncIterator)

      const filterFn = (blobfilePathItem: string) => filterers.every(f => f(blobfilePathItem))
      const filePahtsFiltered = filePaths.filter(filterFn)

      const preprocessFn = (blobfilePathItem: string) => preprocessors.reduce(
        (item, fn) => { return { modified: fn(item.modified), original: item.original } },
        { modified: blobfilePathItem, original: blobfilePathItem }
      )
      const filePathsPreprocessed = filePahtsFiltered.map(preprocessFn)

      // Scrape each files
      const files = await Promise.all(
        filePathsPreprocessed.map(
          async (filePath) => {
            const createdAt = await getCreationDate(filePath.original, new Git(repoCwd))
            const history = await getHistory(filePath.original, new Git(repoCwd))
            const name = filePath.modified.split("/").pop() ?? filePath.modified
            return { name, createdAt, branch, history, filePath: filePath.original, modifiedPath: filePath.modified }
          }
        )
      )

      // Group files into entries
      const groups = groupBy(files, file => {
        const groupName = file.modifiedPath.split("/")[ 0 ]
        return groupName
      })

      return {
        files, groups, branch
      }





      // const entries: Record<string, AuthorEntryGroup> = {}
      // files.forEach(file => {
      //   const groupName = file.modifiedPath.split("/")[ 0 ]
      //   if (!entries[ groupName ]) {
      //     entries[ groupName ] = {
      //       type: "group",
      //       name: groupName,
      //       files: [],
      //     }
      //   }
      //   entries[ groupName ].files.push(Image({
      //     title: file.name,
      //     imgSrc: GitHub.rawFileUrl(repoPath, branch, file.filePath),
      //     source: GitHub.sourceFilePageUrl(repoPath, branch, file.filePath),
      //     createdAt: file.createdAt,
      //     history: file.history,
      //   }))
      // })




      // Record<string, {
      //   name: string
      //   createdAt: string | undefined
      //   branch: string
      //   history: History[]
      //   filePath: string
      // }[]>
      //
      // into
      //
      // Record<string, {
      //   type: "group"
      //   name: string
      //   files: {
      //     name: string
      //     imgSrc: `https://${ string }`
      //     source: `https://${ string }`
      //     style?: EntryStyle
      //     createdAt: string | undefined
      //     history: History[]
      //     // branch: string
      //     // filePath: string
      //   }[]
      // }>


      // return entries


    } catch (error) {
      log.error(`Error scraping github repository ${ repoPath }`, error)
      return {}
    }
  }
}



// TODO: History
// TODO: objectFit strategy (maybe based on folder name?)