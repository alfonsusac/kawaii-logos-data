import { getBskyProfile } from "../lib/api/bsky"
import { fetchGithubProfile } from "../lib/api/github"
import { site } from "../lib/site"
import { logerror } from "../pipeline"
import type { AuthorOutput } from "../output"

export type SocialsDef = {
  github?: string,
  x?: string,
  bsky?: string,
  site?: string,
}

export type SocialListDef = {
  label: "github" | "x" | "bsky" | "site",
  url: string,
}[]

export async function resolveSocials(
  def: SocialsDef | undefined,
  list: SocialListDef | undefined = [],
) {

  // 0. make sure none of SocialsDef contains urls.
  // 1. flatten the def + list => list of socials to be verified
  //  - def uses username, list uses url, so combined needs to be in url form.
  // 2. verify each social and log errors if they don't check out, if they check out add to socials list
  // 3. make social object with first of each type (github, x, bsky, site) for the "social" field, and the full list for the "socials" field
  // 4. remove duplicates from socials list.

  // 0.
  if (def) {
    if (def.github && def.github.includes("://")) {
      logerror(`GitHub username should not contain URL parts: ${ def.github }`)
    }
    if (def.x && (def.x.includes("://"))) {
      logerror(`X/Twitter username should not contain URL parts: ${ def.x }`)
    }
    if (def.bsky && def.bsky.includes("://")) {
      logerror(`Bluesky username should not contain URL parts: ${ def.bsky }`)
    }
    if (def.site && (def.site.includes("://"))) {
      logerror(`Personal site should not contain protocol: ${ def.site }`)
    }
  }

  // 1.
  const githubs = list.filter(s => s.label === "github").map(s => s.url)
  if (def?.github) githubs.push(site(`github.com/${ def.github }`))

  const xs = list.filter(s => s.label === "x").map(s => s.url)
  if (def?.x) xs.push(site(`x.com/${ def.x }`))

  const bskys = list.filter(s => s.label === "bsky").map(s => s.url)
  if (def?.bsky) bskys.push(site(`bsky.app/profile/${ def.bsky }`))

  const personalsites = list.filter(s => s.label === "site").map(s => s.url)
  if (def?.site) personalsites.push(def.site)


  // 2.
  const links: AuthorOutput.Links = {
    socials: [],
    personalsites: [],
  }

  const validGithubs: { url: string, username: string }[] = []
  for (const url of githubs) {
    const github = resolveGithubFromURL(url)
    if (!github) {
      logerror(`GitHub URL not valid: ${ url }`)
      continue
    }
    const isvalid = await verifyGithub(github.username)
    if (!isvalid) {
      logerror(`GitHub user not found: ${ github.username }`)
      continue
    }
    validGithubs.push(github)
    links.socials.push({ type: "github", ...github })
  }

  const validXs: { url: string, username: string }[] = []
  for (const url of xs) {
    const x = resolveTwitterFromURL(url)
    if (!x) {
      logerror(`X/Twitter URL not valid: ${ url }`)
      continue
    }
    // No verification for X/Twitter since the API is not easily accessible
    validXs.push(x)
    links.socials.push({ type: "x", ...x })
  }

  const validBskys: { url: string, username: string }[] = []
  for (const url of bskys) {
    const bsky = resolveBskyFromURL(url)
    if (!bsky) {
      logerror(`Bluesky URL not valid: ${ url }`)
      continue
    }
    const isvalid = await verifyBsky(bsky.username)
    if (!isvalid) {
      logerror(`Bluesky user not found: ${ bsky.username }`)
      continue
    }
    validBskys.push(bsky)
    links.socials.push({ type: "bsky", ...bsky })
  }

  const validPersonalSites: string[] = []
  for (const url of personalsites) {
    // No verification for personal sites since it's too broad, just check if it's a valid URL
    try {
      let resolvedUrl = url
      if (!url.includes("://")) resolvedUrl = "https://" + url // add protocol if missing for URL parsing
      new URL(resolvedUrl)
      validPersonalSites.push(resolvedUrl)
      links.personalsites.push(resolvedUrl)
    } catch (e) {
      logerror(`Personal site URL not valid: ${ url }`)
    }
  }

  const github = validGithubs.length > 0 ? validGithubs[ 0 ] : undefined
  const x = validXs.length > 0 ? validXs[ 0 ] : undefined
  const bsky = validBskys.length > 0 ? validBskys[ 0 ] : undefined
  const personalsite = personalsites.length > 0 ? personalsites[ 0 ] : undefined

  const social: AuthorOutput[ 'social' ] = {
    github,
    x,
    bsky,
    site: personalsite,
  }

  // 5.
  links.socials = links.socials.filter((s, index, self) => index === self.findIndex(s2 => s2.type === s.type && s2.username === s.username))

  return {
    social,
    links
  }
}

// ------------------------------------------------

export function resolveGithub(def: SocialsDef[ 'github' ]) {
  if (!def) return undefined
  return { username: def, url: getGithubProfileURL(def), }
}
export function resolveGithubFromURL(url: string | undefined) {
  if (!url) return undefined
  const match = url.match(/github\.com\/([^\/]+)/)
  if (!match) {
    logerror(`Could not parse GitHub URL: ${ url }`)
    return undefined
  }
  const username = match[ 1 ]
  return { username, url }
}
export function getGithubProfileURL(username: string) {
  return site(`github.com/${ username }`)
}
export async function verifyGithub(username: string) {
  const res = await fetchGithubProfile(username)
  if (res.status === "ok") {
    return true
  }
  return false
}



export function resolveTwitter(def: SocialsDef[ 'x' ]) {
  if (!def) return undefined
  return { username: def, url: site(`x.com/${ def }`), }
}
export function resolveTwitterFromURL(url: string | undefined) {
  if (!url) return undefined
  const match = url.match(/(?:x\.com|twitter\.com)\/([^\/]+)/)
  if (!match) {
    logerror(`Could not parse Twitter/X URL: ${ url }`)
    return undefined
  }
  const username = match[ 1 ]
  return { username, url }
}

export function resolveBsky(def: SocialsDef[ 'bsky' ]) {
  if (!def) return undefined
  return { username: def, url: site(`bsky.app/${ def }`), }
}
export function resolveBskyFromURL(url: string | undefined) {
  if (!url) return undefined
  const match = url.match(/bsky\.app\/(?:profile\/)?([^\/]+)/)
  if (!match) {
    logerror(`Could not parse Bluesky URL: ${ url }`)
    return undefined
  }
  const username = match[ 1 ]
  return { username, url }
}
export async function verifyBsky(username: string) {
  const res = await getBskyProfile(username)
  if (res.error) {
    return false
  }
  return true
}