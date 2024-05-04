import { manuallyListedImages } from "./config/images-manual"
import { scrapedImages } from "./config/images-scraped"
import { existsSync } from "node:fs"

export const images = [
  ...manuallyListedImages,
  ...await Promise.allSettled(
    scrapedImages.map(async repository => {

      // Path to the cloned repo
      const cwd = `${ __dirname }/cloned/${ repository.repoPath }`

      // Clones source repo to local repo in the `/cloned` folder
      if (!existsSync(cwd)) {
        await Bun.$`git clone https://github.com/${ repository.repoPath }.git ${ cwd }`
      } else {
        await Bun.$`git pull -v --no-progress`.cwd(cwd)
      }

      // Get the current branch of ecah repo, as it could be main or master
      const branch = (
        await Bun.$`git branch --show-current`.cwd(cwd).text()
      ).replace("\n", "")

      // Get all image files in the repo
      const glob = new Bun.Glob(
        `${ repository.path }/**/*.{png,svg,jpg,jpeg,gif,webp,avif,apng,tiff}`
      )

      // Get the creation date of each image file
      const files = Array.from(glob.scanSync({ cwd }))

      return Promise.allSettled(
        files.map(async file => {

          console.log(file)

          // Get the creation date of the file, idk how this works.
          const createdAt =
            await Bun.$`git log --diff-filter=A --format=%cD --date=short -- ${ file }`
              .cwd(cwd)
              .text()

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
    })
  ).then(images => images.flat())
]

const updatedAt = new Date().toISOString()

const data = JSON.stringify(
  {
    updatedAt,
    data: images,
  }, null, 2
)

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
