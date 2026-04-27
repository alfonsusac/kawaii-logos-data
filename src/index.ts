import { getScrapedImageList } from "./scrape"
import { manuallyListedImages } from "./config/images-manual"
import type { Entries } from "../types"

// --------

const data: Entries = [
  ...manuallyListedImages,
  ...await getScrapedImageList()
]

// --------
