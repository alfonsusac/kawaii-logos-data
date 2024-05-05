import { Git } from "./git-shell"
import { logError, logProcess } from "./log"
import { logAndDelay } from "./util"

let types = await Bun.file(`src/types/index.ts`).text()
console.log(types)
await logAndDelay(`Type file retrieved`)


try {
  let branch = await Git.branch({ all: true }).text()
  await logAndDelay(`All branch retrieved`)

  if (branch.includes("types")) {
    await Git.switch("types")
    await logAndDelay(`Branch switched to types`)

    await Git.pull({ force: true })
    await logAndDelay(`Branch types pulled`)

  } else {
    await Git.switch("types", { orphan: true })
    await logAndDelay(`Branch types created`)
  }
  logProcess(`Switched to types branch`)

  await Bun.write("src/index.ts", types)
  await logAndDelay(`Types written to types branch`)

  await Bun.write(".gitignore", "*\n!src/*\n!.gitignore\n!package.json\n") // Neccessary to ignore all (*) since switching branch would also include other gitingore files that are generated. This would prevent files getting moved to the new branch
  await logAndDelay(`Gitignore written to types branch`)

  await Bun.$`bunx tsc src/index.ts -d --emitDeclarationOnly --skipLibCheck`

  await logAndDelay(`Types built with tsc`)
  logProcess(`Types updated and built with tsc`)

  if (!await Bun.file("package.json").exists()) {
    logProcess(`Package.json not found, Creating one...`)
    await Bun.write(`package.json`, `{
  "name": "types",
  "version": "1.0.0",
  "description": "Types for the kawaii-logos-data",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "author": "alfonsusac",
  "license": "MIT"
}`)
    await logAndDelay(`Package.json created`)
  } else {
    logProcess(`Package.json found, updating version..`)
    await Bun.$`bunx npm version patch`
    await logAndDelay(`Package.json version updated`)
    logProcess(`Updated version`)
  }


  await Git.add(".")
  await logAndDelay(`Files added to staging`)

  await Git.commit(`Update types`)
  await logAndDelay(`Files commited`)

  await Git.push("origin", "types", { setUpstream: true })
  await logAndDelay(`Branch pushed to remote`)

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
