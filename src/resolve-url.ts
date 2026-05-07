import type { Site } from "./lib/site"
import type { UrlType } from "./output"
import { logerror, warn } from "./pipeline"

function getUrlTypeFromURL(
  url: Site
): UrlType {
  if (url.startsWith("https://github.com")) {
    if (url.includes("/blob/")) return "github-blob"
    if (url.includes("#")) return "github-repo-text-content"
    if (url.split('/').length >= 5) return "github-repo"

    const err = new Error(`URL starts with https://github.com but doesn't match known GitHub URL patterns: ${ url }`)
    Error.captureStackTrace(err, getUrlTypeFromURL)
    logerror(err)
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

  const err = new Error(`Unknown URL type: ${ url }`)
  Error.captureStackTrace(err, getUrlTypeFromURL)
  logerror(err)
  return "unknown"
}

function getUrlTypeLabel(urlType: UrlType) {
  switch (urlType) {
    case "github-repo-text-content": return "GitHub Repo Text Content"
    case "github-blob": return "GitHub Blob"
    case "github-repo": return "GitHub Repoistory"
    case "github-raw": return "GitHub Raw"
    case "github-camo": return "GitHub Camo Proxy"
    case "github-unknown": return "GitHub Unknown"
    case "gist-raw": return "Gist Raw"
    case "gist-page": return "Gist Page"
    case "google-drive": return "Google Drive Page"
    case "twitter-post": return "Twitter Post"
    case "bsky-post": return "Bluesky Post"
    case "unknown": return "Unknown"
  }
}

export function getUrlType(url: Site): {
  type: UrlType,
  label: string,
} {
  const type = getUrlTypeFromURL(url)
  const label = getUrlTypeLabel(type)
  return { type, label }
}