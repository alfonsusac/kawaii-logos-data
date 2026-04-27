import { getScrapedImageList } from "./scrape"
import type { Entries } from "../types"
import { storeResult } from "./lib/result"
import { manuallyListedImages } from "./config/images-manual"

// --------

const data: Entries = [
  ...manuallyListedImages,
  ...await getScrapedImageList()
]
await storeResult(data)

// --------
