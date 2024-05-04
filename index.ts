import { manuallyListedImages } from "./config/images-manual"
import { scrapedImages } from "./config/images-scraped"
import { existsSync } from "node:fs"

const scrapedImagesProcessed = Promise.allSettled(
  scrapedImages.map(
    async repository => {
      const { cwd, branch } = await cloneRepo(repository.repoPath)
      const filePaths = await getImageFilePaths(cwd)
      const results = await Promise.allSettled(
        filePaths.map(async file => {
          const createdAt = await getCreationDate(file, cwd)
          return {
            author: repository.author,
            className: repository.className,
            createdAt: new Date(createdAt),
            title: file.split("/").pop()!,
            src: `https://raw.githubusercontent.com/${ repository.repoPath }/${ branch }/${ file }`,
            raw: `https://github.com/${ repository.repoPath }/blob/${ branch }/${ file }`,
          }
        })
      )
      return results.map(res => {
        if (res.status === "rejected") {
          console.log("Failed processing file: ", fil)
          return []
        }
        return res.value
      })
    }
  )
).then(results => {
  return results.map(result => {
    if (result.status === "rejected") {
      console.log("Failed processing repository: ")
      return []
    }
    return result.value
  })
}).then(images => images.flat())

async function cloneRepo(repositoryPath: string) {
  // Path to the cloned repo
  const cwd = `${ __dirname }/cloned/${ repositoryPath }`
  // Clones source repo to local repo in the `/cloned` folder
  if (!existsSync(cwd)) {
    await Bun.$`git clone https://github.com/${ repositoryPath }.git ${ cwd }`
  } else {
    await Bun.$`git pull -v --no-progress`.cwd(cwd)
  }
  // Get the current branch of ecah repo, as it could be main or master
  const branch = (
    await Bun.$`git branch --show-current`.cwd(cwd).text()
  ).replace("\n", "")

  return { cwd, branch }
}
async function getImageFilePaths(cwd: string) {
  // Get all image files in the repo
  const glob = new Bun.Glob(
    `**/*.{png,svg,jpg,jpeg,gif,webp,avif,apng,tiff}`
  )
  return Array.from(glob.scanSync({ cwd }))
}
async function getCreationDate(file: string, cwd: string) {
  return await Bun.$`git log --diff-filter=A --format=%cD --date=short -- ${ file }`
    .cwd(cwd)
    .text()
}


// export const images = [
//   ...manuallyListedImages,
//   ...await Promise.allSettled(
//     scrapedImages.map(async repository => {
//       const { cwd, branch } = await cloneRepo(repository.repoPath)
//       const filePaths = await getImageFilePaths(cwd)
//       return Promise.allSettled(
//         filePaths.map(async file => {
//           const createdAt = await getCreationDate(file, cwd)
//           return {
//             author: repository.author,
//             className: repository.className,
//             createdAt: new Date(createdAt),
//             title: file.split("/").pop()!,
//             src: `https://raw.githubusercontent.com/${ repository.repoPath }/${ branch }/${ file }`,
//             raw: `https://github.com/${ repository.repoPath }/blob/${ branch }/${ file }`,
//           }
//         })
//       ).then(settlement => {
//         return settlement.map(promise => {
//           if (promise.status === "rejected") {
//             return console.error(promise.reason)
//           }
//           return promise.value
//         })
//       })
//     })
//   ).then(images => images.flat())
// ]

const updatedAt = new Date().toISOString()

const data = JSON.stringify(
  {
    updatedAt,
    data: [
      ...manuallyListedImages,
      ...await scrapedImagesProcessed,
    ],
  }, null, 2
)

// console.log(data)

await Bun.write(`${ __dirname }/data/images.json`, data)

console.log("/data/images.json updated")

const isInGitHubAction = process.env.GITHUB_ACTIONS === "true"
if (isInGitHubAction) {

  // check if "data" orphan branch exists
  let branch = await Bun.$`git branch -a`.text()
  if (!branch.includes("data")) {
    // create "data" orphan branch
    await Bun.$`git switch --orphan data`
  } else {
    await Bun.$`git switch data`
    await Bun.$`git pull`
  }

  // add data/images.json to "data" orphan branch
  await Bun.write("images.json", data)
  await Bun.write(".gitignore", "*\n!images.json\n!.gitignore")

  await Bun.$`git add images.json .gitignore`
  await Bun.$`git commit -m "Update data \`${ updatedAt }\`"`
  await Bun.$`git push -u origin data`
  await Bun.$`git switch main`

  console.log("Branch data updated!")

}
