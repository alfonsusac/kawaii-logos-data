import { manuallyListedImages } from "./config/images-manual"
import { getScrapedImageList } from "./scrape"
import { logError, logProcess, logSuccess } from "./lib/log"
import { isInGitHubAction, revalidateToken, toJson } from "./lib/util"
import type { Entries } from "../types"
import { revalidateWebsite } from "./lib/revalidate"
import { storeResult } from "./lib/result"

// --------
try {

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
