import type { Site } from "./lib/site"
import { matchUrl } from "./lib/url-pattern"
import type { Output } from "./output"
import { logerror, warn } from "./pipeline"

export type HttpsSite = `https://${ string }`

export function resolveHttpsSite(site: HttpsSite): Output.Link {
  const type = getUrlTypeFromURL(site)
  return {
    type,
    url: site,
  }
}





function getUrlTypeFromURL(
  url: Site
): Output.Link.Type {
  if (url.startsWith("https://github.com")) {
    if (url.includes("/blob/")) return "github-blob"
    if (url.includes("#")) return "github-repo-text-content"
    if (url.split('/').length >= 5) return "github-repo"

    logerror("URL starts with https://github.com but doesn't match known GitHub URL patterns: " + url)
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
  if (matchUrl(url, "https://x.com/:A/status/:B+") || matchUrl(url, "https://twitter.com/:A/status/:B+")) {
    return "twitter-post"
  }
  if (matchUrl(url, "https://bsky.app/profile/:username/post/:postId")) {
    return "bsky-post"
  }
  if (url.startsWith("https://raw.githubusercontent.com/")) {
    return "github-raw"
  }
  if (url.startsWith("https://camo.githubusercontent.com/")) {
    warn(`URL is using GitHub's Camo proxy: ${ url }. Consider using the original raw.githubusercontent.com URL for better performance and reliability. Camo URLs will eventually expire and may lead to broken images in the future.`)
    return "github-camo"
  }
  if (url.startsWith("https://lp.skeb.jp/creator?locale=en")) {
    return "skeb-creator-guideline-page"
  }
  if (url.startsWith("https://skeb.jp/")) {
    return "skeb-creator-page"
  }
  if (url.startsWith('https://www.figma.com/community/file/')) {
    return "figma-file"
  }

  logerror("Failed to determine URL type for URL: " + url)
  return "unknown"
}

// function getUrlTypeLabel(urlType: Output.Link.Type) {
//   switch (urlType) {
//     case "github-repo-text-content": return "GitHub Repo Text Content"
//     case "github-blob": return "GitHub Blob"
//     case "github-repo": return "GitHub Repoistory"
//     case "github-raw": return "GitHub Raw"
//     case "github-camo": return "GitHub Camo Proxy"
//     case "github-unknown": return "GitHub Unknown"
//     case "gist-raw": return "Gist Raw"
//     case "gist-page": return "Gist Page"
//     case "google-drive": return "Google Drive Page"
//     case "twitter-post": return "Twitter Post"
//     case "bsky-post": return "Bluesky Post"
//     case "skeb-creator-page": return "Skeb Creator Page"
//     case "skeb-creator-guideline-page": return "Skeb Creator Guideline Page"
//     case "unknown": return "Unknown"
//   }
// }

// export function getUrlType(url: Site): {
//   type: Output.Link.Type,
//   label: string,
// } {
//   const type = getUrlTypeFromURL(url)
//   const label = getUrlTypeLabel(type)
//   return { type, label }
// }

// ------------------------------------------------------------------------------------

