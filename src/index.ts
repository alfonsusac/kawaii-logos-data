import { getScrapedImageList } from "./scrape"
import type { Entries } from "../types"
import { manuallyListedImages } from "./config/images-manual"

// --------

const data: Entries = [
  ...manuallyListedImages,
  ...await getScrapedImageList()
]

// --------
