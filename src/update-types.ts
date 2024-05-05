import { Git } from "./git-shell"
import { logError, logProcess } from "./log"

let types = await Bun.file(`src/types/index.ts`).text()
// console.log(types)


try {
  let branch = await Git.branch({ all: true }).text()
  if (branch.includes("data")) {
    await Git.switch("data")
    await Git.pull()
  } else {
    await Git.switch("data", { orphan: true })
  }
  logProcess(`Switched to types branch`)

  await Bun.write("index.ts", types)
  await Bun.$`bunx tsc . -d --emitDeclarationOnly`
  await Git.add(".")
  await Git.commit(`Update types`)
  await Git.push("origin", "types", { setUpstream: true })
  await Git.switch("main")
  logProcess(`Switched back to main branch`)

} catch (error) {
  logError(`Error occurred while updating data branch`)
  console.log(error)

} finally {
  Git.switch("main", {
    force: true,
  })
}
