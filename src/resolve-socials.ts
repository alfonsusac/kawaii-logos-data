import { getBskyProfile } from "./lib/api/bsky"
import { fetchGithubProfile } from "./lib/api/github"
import { logerror } from "./pipeline"
import { Output } from "./output"
import { site } from "./resolve-url"

export type SocialsDef = {
  github?: `https://github.com/${ string }`,
  x?: `https://x.com/${ string }`,
  bsky?: `https://bsky.app/profile/${ string }`,
  behance?: `https://www.behance.net/${ string }`,
  figma?: `https://www.figma.com/@${ string }`,
  dribbble?: `https://dribbble.com/${ string }`,
  site?: `https://${ string }`,
}

export type SocialListDef = {
  label: "github" | "x" | "bsky" | "site" | "behance" | "figma" | "dribbble",
  url: string,
}[]





export async function resolveSocials(
  def: SocialsDef | undefined,
  list: SocialListDef | undefined = [],
): Promise<{
  socials: Output.Author.SocialLinks,
  personalSites: Output.Author.PersonalSites,
}> {

  // 1. flatten the def + list => list of socials to be verified
  //  - def uses username, list uses url, so combined needs to be in url form.
  // 2. verify each social and log errors if they don't check out, if they check out add to socials list
  // 3. make social object with first of each type (github, x, bsky, site) for the "social" field, and the full list for the "socials" field
  // 4. remove duplicates from socials list.

  // 1. Collect all URLs
  const socialUrlList: string[] = []
  socialUrlList.push(...list.filter(s => s.label !== 'site').map(s => s.url))
  if (def?.github) socialUrlList.push(def.github)
  if (def?.x) socialUrlList.push(def.x)
  if (def?.bsky) socialUrlList.push(def.bsky)
  if (def?.behance) socialUrlList.push(def.behance)
  if (def?.figma) socialUrlList.push(def.figma)
  if (def?.dribbble) socialUrlList.push(def.dribbble)

  // 2. normalize URLs
  for (let i = 0; i < socialUrlList.length; i++) {
    // remove trailing slashes
    socialUrlList[ i ] = socialUrlList[ i ].replace(/\/+$/, "")

    // rename twitter.com to x.com
    socialUrlList[ i ] = socialUrlList[ i ].replace("twitter.com/", "x.com/")
  }

  // 3. remove duplicates
  const uniqueSocialUrlList = Array.from(new Set(socialUrlList))

  // 4. Resolve each URL into { type, username, url }
  const resolvedSocials: Output.Author.SocialLinks = []
  for (const url of uniqueSocialUrlList) {

    for (const type of Output.socialTypes) {

      const instruction = socialsInstructionMap[ type ]
      if (!instruction.matcher(url)) continue

      const resolved = instruction.resolver(url)
      if (!resolved) {
        logerror(`Failed to resolve ${ type } URL: ${ url }`)
        continue
      }

      const isValid = await instruction.verifier(resolved.username)
      if (!isValid) {
        logerror(`Failed to verify ${ type } username: ${ resolved.username } (url: ${ url })`)
        continue
      }

      resolvedSocials.push({ type, ...resolved })
    }
  }

  // 5. Collect personal sites separately (anything labeled as "site" in the list, and the "site" field in the def)
  const personalSites: Output.Author.PersonalSites = []
  const siteUrls = list.filter(s => s.label === "site").map(s => s.url)
  if (def?.site) siteUrls.push(def.site)

  // 6. validate personal sites and add to personalSites list
  for (const url of siteUrls) {
    try {
      let resolvedUrl = url
      if (!url.includes("://")) resolvedUrl = "https://" + url // add protocol if missing for URL parsing
      new URL(resolvedUrl) // check if it's a valid URL
      personalSites.push(resolvedUrl)
    } catch (e) {
      logerror(`Personal site URL not valid: ${ url }`)
    }
  }

  return {
    socials: resolvedSocials,
    personalSites,
  }

}

// ------------------------------------------------

const socialsInstructionMap: Record<Output.SocialTypes, {
  matcher: (url: string) => boolean,
  resolver: (url: string) => { username: string, url: string } | undefined,
  verifier: (username: string) => Promise<boolean>,
}> = {
  github: {
    matcher: url => url.includes("github.com/"),
    resolver: url => {
      const match = url.match(/github\.com\/([^\/]+)/)
      if (!match) return undefined
      const username = match[ 1 ]
      return { username, url }
    },
    verifier: async username => {
      const res = await fetchGithubProfile(username)
      if (res.status === "ok") return true
      return false
    },
  },

  x: {
    matcher: url => url.includes("x.com/") || url.includes("twitter.com/"),
    resolver: url => {
      const match = url.match(/(?:x\.com|twitter\.com)\/([^\/]+)/)
      if (!match) return undefined
      const username = match[ 1 ]
      return { username, url }
    },
    verifier: async username => {
      // No verification for X/Twitter since the API is not easily accessible
      return true
    },
  },

  bsky: {
    matcher: url => url.includes("bsky.app/"),
    resolver: url => {
      const match = url.match(/bsky\.app\/(?:profile\/)?([^\/]+)/)
      if (!match) return undefined
      const username = match[ 1 ]
      return { username, url }
    },
    verifier: async username => {
      const res = await getBskyProfile(username)
      if (res.error) return false
      return true
    },
  },

  behance: {
    matcher: url => url.includes("behance.net/"),
    resolver: url => {
      const match = url.match(/behance\.net\/([^\/]+)/)
      if (!match) return undefined
      const username = match[ 1 ]
      return { username, url }
    },
    verifier: async username => {
      // No verification for Behance since the API is not easily accessible
      return true
    },
  },

  dribbble: {
    matcher: url => url.includes("dribbble.com/"),
    resolver: url => {
      const match = url.match(/dribbble\.com\/([^\/]+)/)
      if (!match) return undefined
      const username = match[ 1 ]
      return { username, url }
    },
    verifier: async username => {
      // No verification for Dribbble since the API is not easily accessible
      return true
    },
  },

  figma: {
    matcher: url => url.includes("figma.com/"),
    resolver: url => {
      const match = url.match(/figma\.com\/@([^\/]+)/)
      if (!match) return undefined
      const username = match[ 1 ]
      return { username, url }
    },
    verifier: async username => {
      // No verification for Figma since the API is not easily accessible
      return true
    },
  }

}

// ------------------------------------------------ Misc Helpers

export function getGithubRepoLink(username: string, repo: string) {
  return site(`github.com/${ username }/${ repo }`)
}
export function getGithubProfileURL(username: string) {
  return site(`github.com/${ username }`)
}