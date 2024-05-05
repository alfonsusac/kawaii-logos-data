import { manuallyListedImages } from "./config/images-manual"
import { updateDataBranch } from "./branch-data"
import { write } from "bun"
import { isInGitHubAction } from "./util"
import { getScrapedImageList } from "./scrape"
import { pathToGeneratedImageJSON } from "./paths"
import { logSuccess } from "./log"
import type { Data } from "./types"

const updatedAt = new Date().toISOString()

const data: Data = [
  ...manuallyListedImages,
  ...await getScrapedImageList(),
]

const response = { updatedAt, data }
export type Response = typeof response

await updateDataBranch(response, updatedAt)

logSuccess("Script Finished")







// const scrapedImagesProcessed = Promise.allSettled(
//   scrapedImages.map(
//     async repository => {
//       try {
//         const { cwd, branch } = await getRepositoryCwd(repository.repoPath)
//         const filePaths = await getImageFilePaths(cwd)
//         const results = await Promise.allSettled(
//           filePaths.map(
//             async file => {
//               try {
//                 const createdAt = await getCreationDate(file, cwd)
//                 return {
//                   author: repository.author,
//                   className: repository.className,
//                   createdAt: new Date(createdAt),
//                   title: file.split("/").pop()!,
//                   src: `https://raw.githubusercontent.com/${ repository.repoPath }/${ branch }/${ file }`,
//                   raw: `https://github.com/${ repository.repoPath }/blob/${ branch }/${ file }`,
//                 }
//               } catch (error) {
//                 console.log(`Error reading file: ${ file }`)
//                 throw (error)
//               }
//             }
//           )
//         )
//         return results.map(res => {
//           if (res.status === "rejected") {
//             return []
//           }
//           return res.value
//         })
//       } catch (error) {
//         console.log(` ✖️ Error processing repository: ${ repository.repoPath }`)
//         throw error
//       }
//     }
//   )
// ).then(results => {
//   return results.map(result => {
//     if (result.status === "rejected") {
//       return []
//     }
//     return result.value
//   })
// }).then(images => images.flat())


