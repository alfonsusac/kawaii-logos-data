import { getBskyProfile } from "./lib/api/bsky"
import { fetchGithubProfile } from "./lib/api/github"
import { site } from "./lib/site"
import { logerror } from "./pipeline"
import { Output } from "./output"

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

  // Collect personal sites separately (anything labeled as "site" in the list, and the "site" field in the def)
  const personalSites: Output.Author.PersonalSites = []
  const siteUrls = list.filter(s => s.label === "site").map(s => s.url)
  if (def?.site) siteUrls.push(def.site)

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




















  // // 1. flatten def + list
  // const githubs = list.filter(s => s.label === "github").map(s => s.url)
  // if (def?.github) githubs.push(site(`github.com/${ def.github }`))

  // const xs = list.filter(s => s.label === "x").map(s => s.url)
  // if (def?.x) xs.push(site(`x.com/${ def.x }`))

  // const bskys = list.filter(s => s.label === "bsky").map(s => s.url)
  // if (def?.bsky) bskys.push(site(`bsky.app/profile/${ def.bsky }`))

  // const behances = list.filter(s => s.label === "behance").map(s => s.url)
  // if (def?.behance) behances.push(site(`behance.net/${ def.behance }`))

  // const figmas = list.filter(s => s.label === "figma").map(s => s.url)
  // if (def?.figma) figmas.push(site(`figma.com/@${ def.figma }`))

  // const dribbles = list.filter(s => s.label === "dribbble").map(s => s.url)
  // if (def?.dribbble) dribbles.push(site(`dribbble.com/${ def.dribbble }`))

  // const personalsites = list.filter(s => s.label === "site").map(s => s.url)
  // if (def?.site) personalsites.push(def.site)


  // // 2. verify 
  // const links: Output.Author.Links = {
  //   socials: [],
  //   personalsites: [],
  // }

  // const validGithubs: { url: string, username: string }[] = []
  // for (const url of githubs) {
  //   const github = resolveGithubFromURL(url)
  //   if (!github) {
  //     logerror(`GitHub URL not valid: ${ url }`)
  //     continue
  //   }
  //   const isvalid = await verifyGithub(github.username)
  //   if (!isvalid) {
  //     logerror(`GitHub user not found: ${ github.username }`)
  //     continue
  //   }
  //   validGithubs.push(github)
  //   links.socials.push({ type: "github", ...github })
  // }


  // const validXs: { url: string, username: string }[] = []
  // for (const url of xs) {
  //   const x = resolveTwitterFromURL(url)
  //   if (!x) {
  //     logerror(`X/Twitter URL not valid: ${ url }`)
  //     continue
  //   }
  //   // No verification for X/Twitter since the API is not easily accessible
  //   validXs.push(x)
  //   links.socials.push({ type: "x", ...x })
  // }


  // const validBskys: { url: string, username: string }[] = []
  // for (const url of bskys) {
  //   const bsky = resolveBskyFromURL(url)
  //   if (!bsky) {
  //     logerror(`Bluesky URL not valid: ${ url }`)
  //     continue
  //   }
  //   const isvalid = await verifyBsky(bsky.username)
  //   if (!isvalid) {
  //     logerror(`Bluesky user not found: ${ bsky.username }`)
  //     continue
  //   }
  //   validBskys.push(bsky)
  //   links.socials.push({ type: "bsky", ...bsky })
  // }


  // const validBehances: { url: string, username: string }[] = []
  // for (const url of behances) {
  //   // No verification for Behance since the API is not easily accessible
  //   const behance = resolveBehanceFromURL(url)
  //   if (!behance) {
  //     logerror(`Behance URL not valid: ${ url }`)
  //     continue
  //   }
  //   validBehances.push(behance)
  //   links.socials.push({ type: "behance", ...behance })
  // }

  // const validFigmas: { url: string, username: string }[] = []
  // for (const url of figmas) {
  //   // No verification for Figma since the API is not easily accessible
  //   const figma = resolveFigmaFromURL(url)
  //   if (!figma) {
  //     logerror(`Figma URL not valid: ${ url }`)
  //     continue
  //   }
  //   validFigmas.push(figma)
  //   links.socials.push({ type: "figma", ...figma })
  // }

  // const validDribbles: { url: string, username: string }[] = []
  // for (const url of dribbles) {
  //   // No verification for Dribbble since the API is not easily accessible
  //   const dribbble = resolveDribbbleFromURL(url)
  //   if (!dribbble) {
  //     logerror(`Dribbble URL not valid: ${ url }`)
  //     continue
  //   }
  //   validDribbles.push(dribbble)
  //   links.socials.push({ type: "dribbble", ...dribbble })
  // }


  // const validPersonalSites: string[] = []
  // for (const url of personalsites) {
  //   // No verification for personal sites since it's too broad, just check if it's a valid URL
  //   try {
  //     let resolvedUrl = url
  //     if (!url.includes("://")) resolvedUrl = "https://" + url // add protocol if missing for URL parsing
  //     new URL(resolvedUrl)
  //     validPersonalSites.push(resolvedUrl)
  //     links.personalsites.push(resolvedUrl)
  //   } catch (e) {
  //     logerror(`Personal site URL not valid: ${ url }`)
  //   }
  // }

  // // 3. find first
  // const github = validGithubs.length > 0 ? validGithubs[ 0 ] : undefined
  // const x = validXs.length > 0 ? validXs[ 0 ] : undefined
  // const bsky = validBskys.length > 0 ? validBskys[ 0 ] : undefined
  // const behance = validBehances.length > 0 ? validBehances[ 0 ] : undefined
  // const figma = validFigmas.length > 0 ? validFigmas[ 0 ] : undefined
  // const dribbble = validDribbles.length > 0 ? validDribbles[ 0 ] : undefined
  // const personalsite = personalsites.length > 0 ? personalsites[ 0 ] : undefined

  // const social: AuthorOutput[ 'social' ] = {
  //   github,
  //   x,
  //   bsky,
  //   figma,
  //   dribbble,
  //   behance,
  //   site: personalsite,
  // }

  // 4. remove dupes
  // links.socials = links.socials.filter((s, index, self) => index === self.findIndex(s2 => s2.type === s.type && s2.username === s.username))

  // return {
  //   social,
  //   links
  // }
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

// ------------------------------------------------

export function getGithubRepoLink(username: string, repo: string) {
  return site(`github.com/${ username }/${ repo }`)
}
export function getGithubProfileURL(username: string) {
  return site(`github.com/${ username }`)
}

// export function resolveGithub(def: SocialsDef[ 'github' ]) {
//   if (!def) return undefined
//   return { username: def, url: getGithubProfileURL(def), }
// }
// export function resolveGithubFromURL(url: string | undefined) {
//   if (!url) return undefined
//   const match = url.match(/github\.com\/([^\/]+)/)
//   if (!match) {
//     logerror(`Could not parse GitHub URL: ${ url }`)
//     return undefined
//   }
//   const username = match[ 1 ]
//   return { username, url }
// }
// export function getGithubProfileURL(username: string) {
//   return site(`github.com/${ username }`)
// }
// export async function verifyGithub(username: string) {
//   const res = await fetchGithubProfile(username)
//   if (res.status === "ok") {
//     return true
//   }
//   return false
// }



// export function resolveTwitter(def: SocialsDef[ 'x' ]) {
//   if (!def) return undefined
//   return { username: def, url: site(`x.com/${ def }`), }
// }
// export function resolveTwitterFromURL(url: string | undefined) {
//   if (!url) return undefined
//   const match = url.match(/(?:x\.com|twitter\.com)\/([^\/]+)/)
//   if (!match) {
//     logerror(`Could not parse Twitter/X URL: ${ url }`)
//     return undefined
//   }
//   const username = match[ 1 ]
//   return { username, url }
// }



// export function resolveBsky(def: SocialsDef[ 'bsky' ]) {
//   if (!def) return undefined
//   return { username: def, url: site(`bsky.app/${ def }`), }
// }
// export function resolveBskyFromURL(url: string | undefined) {
//   if (!url) return undefined
//   const match = url.match(/bsky\.app\/(?:profile\/)?([^\/]+)/)
//   if (!match) {
//     logerror(`Could not parse Bluesky URL: ${ url }`)
//     return undefined
//   }
//   const username = match[ 1 ]
//   return { username, url }
// }
// export async function verifyBsky(username: string) {
//   const res = await getBskyProfile(username)
//   if (res.error) {
//     return false
//   }
//   return true
// }



// export function resolveBehance(def: SocialsDef[ 'behance' ]) {
//   if (!def) return undefined
//   return { username: def, url: site(`behance.net/${ def }`), }
// }
// export function resolveBehanceFromURL(url: string | undefined) {
//   if (!url) return undefined
//   const match = url.match(/behance\.net\/([^\/]+)/)
//   if (!match) {
//     logerror(`Could not parse Behance URL: ${ url }`)
//     return undefined
//   }
//   const username = match[ 1 ]
//   return { username, url }
// }
// export async function verifyBehance(username: string) {
//   // No verification for Behance since the API is not easily accessible
//   return true
// }



// export function resolveFigma(def: SocialsDef[ 'figma' ]) {
//   if (!def) return undefined
//   return { username: def, url: site(`figma.com/@${ def }`), }
// }
// export function resolveFigmaFromURL(url: string | undefined) {
//   if (!url) return undefined
//   const match = url.match(/figma\.com\/@([^\/]+)/)
//   if (!match) {
//     logerror(`Could not parse Figma URL: ${ url }`)
//     return undefined
//   }
//   const username = match[ 1 ]
//   return { username, url }
// }
// export async function verifyFigma(username: string) {
//   // No verification for Figma since the API is not easily accessible
//   return true
// }



// export function resolveDribbble(def: SocialsDef[ 'dribbble' ]) {
//   if (!def) return undefined
//   return { username: def, url: site(`dribbble.com/${ def }`), }
// }
// export function resolveDribbbleFromURL(url: string | undefined) {
//   if (!url) return undefined
//   const match = url.match(/dribbble\.com\/([^\/]+)/)
//   if (!match) {
//     logerror(`Could not parse Dribbble URL: ${ url }`)
//     return undefined
//   }
//   const username = match[ 1 ]
//   return { username, url }
// }
// export async function verifyDribbble(username: string) {
//   // No verification for Dribbble since the API is not easily accessible
//   return true
// }