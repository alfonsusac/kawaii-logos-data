import { Git } from "./git-shell"
import { logError, logProcess } from "./log"

let types = await Bun.file(`src/types/index.ts`).text()
// console.log(types)


try {
  let branch = await Git.branch({ all: true }).text()
  if (branch.includes("types")) {
    await Git.switch("types")
    await Git.pull({ force: true })
  } else {
    await Git.switch("types", { orphan: true })
    await Bun.write(`package.json`, `{
  "name": "types",
  "version": "1.0.0",
  "description": "Types for the kawaii-logos-data",
  "main": "./src/index.ts",
  "types": "./src/index.ts"
  "author": "alfonsusac",
  "license": "MIT"
}`)
  }
  logProcess(`Switched to types branch`)

  await Bun.write("src/types/index.ts", types)
  await Bun.write(".gitignore", "*\n!src\npackage.json\n") // Neccessary to ignore all (*) since switching branch would also include other gitingore files that are generated. This would prevent files getting moved to the new branch
  await Bun.$`bunx tsc src/types/index.ts -d --emitDeclarationOnly --skipLibCheck`
  await Git.add(".")
  await Git.commit(`Update types`)
  await Git.push("origin", "types", { setUpstream: true })

} catch (error) {
  logError(`Error occurred while updating data branch`)
  console.log(error)

} finally {
  await Git.switch("main", {
    force: true,
  })
  logProcess(`Switched back to main branch`)
}
