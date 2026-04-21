import { getScrapedImageList } from "./scrape"
import { logError, logSuccess } from "./lib/log"
import { isInGitHubAction, revalidateToken } from "./lib/util"
import type { Entries } from "../types"
import { revalidateWebsite } from "./lib/revalidate"
import { storeResult } from "./lib/result"
import { printAnsiiTest } from "./lib/ansii"
import { manuallyListedImages } from "./config/images-manual"

// --------
try {
  console.clear()
  printAnsiiTest()

  const data: Entries = [
    ...manuallyListedImages,
    ...await getScrapedImageList()
  ]
  await storeResult(data)
  if (isInGitHubAction && revalidateToken)
    await revalidateWebsite()
  logSuccess("Script Finished")

} catch (error) {
  logError(error)
}
// --------
