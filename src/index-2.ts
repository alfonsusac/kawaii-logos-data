import { alfonsusac } from "./entries/alfonsusac"
import { arnav } from "./entries/arnav"
import { cr1sta_dev } from "./entries/cr1sta_dev"
import { dsphng } from "./entries/dsphng"
import { fenjalien } from "./entries/fenjalien"
import { fumanama } from "./entries/fumanama"
import { hcho3 } from "./entries/hcho3"
import { hvpexe } from "./entries/hvpexe"
import { saltyaom } from "./entries/saltyaom"
import { styxpilled } from "./entries/styxpilled"
import { thatonecalculator } from "./entries/thatonecalculator"
import { cacheInstance } from "./lib/cache"
import { logger } from "./lib/log"
import { resolveDefinitions } from "./resolve-definitions"
import { rm } from "fs/promises"


const log = logger("index")
log.info("Begin processing data")

await cacheInstance.initializeCacheData()

try {
  // 1. compile manually listed images
  // 2. compile scraped image lists
  // 3. store result
  // 4. call website revalidation

  const resolved = await resolveDefinitions({
    alfonsusac,
    arnav,
    cr1sta_dev,
    dsphng,
    fenjalien,
    fumanama,
    hcho3,
    hvpexe,
    saltyaom,
    styxpilled,
    thatonecalculator,
  })

  await saveToDisk(resolved, "./dist")

  log.success("Data processed successfully")
} catch (error) {
  log.error("Error processing data", error)
} finally {
  log.verbose("End of script")
}





async function saveToDisk(data: Awaited<ReturnType<typeof resolveDefinitions>>, folderpath: string) {
  const log = logger("saveToDisk")
  log.info(`Saving Data to ${folderpath}`)

  const response = {
    response: {
      updatedAt: new Date().toISOString(),
      data
    },
    stringified: JSON.stringify({
      updatedAt: new Date().toISOString(),
      data
    }, null, 2)
  }

  const outputTypeFileContent = await Bun.file('./src/lib/model/output.ts').text()


  const folderStructure = {
    '/data.json': response.stringified,
    '/README.md': `# Data Output
This branch is used to store the data of the images. It is updated automatically by the GitHub Actions.

Last Updated: \`${ response.response.updatedAt }\`

### Authors
${ response.response.data.map(entry => `- ${ entry.displayName }`).join("\n") }

### Contributing

If you want to contribute such as adding missing image or fixing incorrect data, please refer head over to the \`main\` branch
`,
    '/types.ts': outputTypeFileContent,
  }

  await rm(folderpath, { recursive: true, force: true })
  await Promise.all(Object.entries(folderStructure).map(([ path, content ]) => {
    return Bun.write(`${ folderpath }${ path }`, content)
  }))

  log.success(`Data saved to ${folderpath} successfully`)
}