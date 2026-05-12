import { matchUrl } from "./lib/url-pattern"
import type { KawaiiLogosData } from "./output"
import { logerror, warn } from "./pipeline"

export type HttpsSite =
  | `https://${ string }`
  | `shop:https://${ string }`
  | `uwu:https://${ string }`

// --------------------------------------------------------------------------------
// Constructor

export function site(domainPath: string) {

  if ([ 'shop:', 'uwu:' ].some(prefix => domainPath.startsWith(prefix))) {
    const prefix = domainPath.startsWith('shop:') ? 'shop:' : 'uwu:'
    const urlPart = domainPath.replace(prefix, "")
    const resolvedUrl = resolveSiteURL(urlPart) as HttpsSite
    return `${ prefix }${ resolvedUrl }` as HttpsSite
  }

  return resolveSiteURL(domainPath)



  // if (domainPath.startsWith("https://")) {
  //   return domainPath as HttpsSite
  // }
  // if (domainPath.startsWith("http://")) {
  //   throw new Error(`site() needs to be a secure domain. Either use https or omit protocol to default to https. Found: ${ domainPath }`)
  // }
  // // if (domainPath.startsWith("http://") || domainPath.startsWith("https://")) {
  // //   console.warn(`site() should be used with domain paths without protocol. Received: ${ domainPath }`)
  // //   return domainPath as Site
  // // }
  // return `https://${ domainPath }` as HttpsSite
}

function resolveSiteURL(url: string) {
  if (url.startsWith("https://")) {
    return url as HttpsSite
  }
  if (url.startsWith("http://")) {
    throw new Error(`site() needs to be a secure domain. Either use https or omit protocol to default to https. Found: ${ url }`)
  }
  return `https://${ url }` as HttpsSite
}



// ------------------------------------------------------------------------------------
// Resolver

export function resolveHttpsSite(site: HttpsSite): KawaiiLogosData.Link {
  const type = getUrlTypeFromURL(site)
  let url = site
  if (url.startsWith("shop:")) {
    url = url.replace("shop:", "") as HttpsSite
  }
  if (url.startsWith("uwu:")) {
    url = url.replace("uwu:", "") as HttpsSite
  }
  return {
    type,
    url,
  }
}

function getUrlTypeFromURL(
  url: HttpsSite
): KawaiiLogosData.Link.Type {
  if (url.startsWith('shop')) {
    return "shop-page"
  }
  if (url.startsWith('uwu')) {
    return "official-website-usage"
  }
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

// ------------------------------------------------------------------------------------

