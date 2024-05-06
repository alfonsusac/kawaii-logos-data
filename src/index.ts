import { manuallyListedImages } from "./config/images-manual"
import { updateDataBranch } from "./branch-data"
import { write } from "bun"
import { isInGitHubAction } from "./util"
import { getScrapedImageList } from "./scrape"
import { pathToGeneratedImageJSON } from "./paths"
import { logSuccess } from "./log"
import type { Entries } from "../types"

const updatedAt = new Date().toISOString()

const data: Entries = [
  ...manuallyListedImages,
  ...await getScrapedImageList(),
]

const response = { updatedAt, data }
export type Response = typeof response

await updateDataBranch(response, updatedAt)

logSuccess("Script Finished")