import type { Site } from "./lib/site"
import type { UrlType } from "./output"
import { logerror, warn } from "./pipeline"

export function getUrlType(
  url: Site
): UrlType {
  if (url.startsWith("https://github.com")) {
    if (url.includes("/blob/")) return "github-blob"
    if (url.includes("#")) return "github-repo-text-content"
    if (url.split('/').length > 5) return "github-repo"
    return "github-unknown"
  }
  if (url.startsWith("https://drive.google.com/file/d/")) {
    return "google-drive"
  }
  if (url.startsWith("https://gist.githubusercontent.com/")) {
    return "gist-raw"
  }
  if (url.startsWith("https://gist.github.com/")) {
    return "gist-page"
  }
  if (url.startsWith("https://twitter.com/") && url.includes("/status/")) {
    return "twitter-post"
  }
  if (url.startsWith("https://x.com/") && url.includes("/status/")) {
    return "twitter-post"
  }
  if (url.startsWith("https://bsky.app/profile/") && url.includes("/post/")) {
    return "bsky-post"
  }
  if (url.startsWith("https://raw.githubusercontent.com/")) {
    return "github-raw"
  }
  if (url.startsWith("https://camo.githubusercontent.com/")) {
    warn(`URL is using GitHub's Camo proxy: ${ url }. Consider using the original raw.githubusercontent.com URL for better performance and reliability. Camo URLs will eventually expire and may lead to broken images in the future.`)
    return "github-camo"
  }

  warn(`Unknown URL type: ${ url }`)
  const err = new Error(`Unknown URL type: ${ url }`)
  Error.captureStackTrace(err, getUrlType)
  logerror(err)
  return "unknown"
}