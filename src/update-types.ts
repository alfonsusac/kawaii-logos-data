import { Git } from "./git-shell"
import { logError, logProcess } from "./log"
import { delay, logAndDelay } from "./util"

let types = await Bun.file(`src/types/index.ts`).text()
console.log(types)

logAndDelay(`Type file retrieved`)


try {
  let branch = await Git.branch({ all: true }).text()

  logAndDelay(`All branch retrieved`)

  if (branch.includes("types")) {
    await Git.switch("types")

    logAndDelay(`Branch switched to types`)

    await Git.pull({ force: true })

    logAndDelay(`Branch types pulled`)

  } else {
    await Git.switch("types", { orphan: true })

    logAndDelay(`Branch types created`)
  }
  logProcess(`Switched to types branch`)

  await Bun.write("src/types/index.ts", types)

  logAndDelay(`Types written to types branch`)

  await Bun.write(".gitignore", "*\n!src\n!.gitignore\n!package.json\n") // Neccessary to ignore all (*) since switching branch would also include other gitingore files that are generated. This would prevent files getting moved to the new branch
  
  logAndDelay(`Gitignore written to types branch`)
  
  await Bun.$`bunx tsc src/types/index.ts -d --emitDeclarationOnly --skipLibCheck`

  await logAndDelay(`Types built with tsc`)

  logProcess(`Types updated and built with tsc`)

  if (!await Bun.file("package.json").exists()) {
    await Bun.write(`package.json`, `{
  "name": "types",
  "version": "1.0.0",
  "description": "Types for the kawaii-logos-data",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "author": "alfonsusac",
  "license": "MIT"
}`)
    logAndDelay(`Package.json created`)
    logProcess(`Package.json not found, Creating one...`)
  } else {
    await Bun.$`bunx npm version patch`
    logAndDelay(`Package.json version updated`)
    logProcess(`Updated version`)
  }


  await Git.add(".")

  logAndDelay(`Files added to staging`)

  await Git.commit(`Update types`)

  logAndDelay(`Files commited`)

  await Git.push("origin", "types", { setUpstream: true })

  logAndDelay(`Branch pushed to remote`)

  logProcess(`Branch pushed to remote`)

} catch (error) {
  logError(`Error occurred while updating data branch`)
  console.log(error)
  logError(`Operation not completed, force switching back to main branch`)

} finally {
  await Git.switch("main", {
    force: true,
  })
  logProcess(`Switched back to main branch`)
}
