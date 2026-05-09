import { getBskyProfile } from "./lib/api/bsky"
import type { KawaiiLogosData } from "./output"
import { logerror, warn } from "./pipeline"
import type { AuthorDefinition } from "./resolve-author"



export async function resolvePfp(
  authorDef: AuthorDefinition,
  resolvedSocials: KawaiiLogosData.Author.SocialLinks,
) {
  // Get PFP from user-definition
  if (authorDef.pfp) return authorDef.pfp

  // Try to get PFP from Github
  const github = resolvedSocials.find(s => s.type === "github") as KawaiiLogosData.Author.SocialLinks[ number ] | undefined
  if (github) return `https://avatars.githubusercontent.com/${ github.username }`

  // Try to get PFP from Bluesky
  const bsky = resolvedSocials.find(s => s.type === "bsky") as KawaiiLogosData.Author.SocialLinks[ number ] | undefined
  if (bsky) {
    try {
      const profile = await getBskyProfile(bsky.username)
      if (profile.error) {
        logerror(`Error fetching Bluesky profile for ${ bsky.username }: ${ profile.error }`)
        return undefined
      }
      return profile.avatar
    } catch (error) {
      logerror(`${ error instanceof Error ? error.message : `Error fetching Bluesky profile for ${ bsky.username }: ` + String(error) }`)
    }
  }

  // Can't resolve PFP
  warn(`could not resolve pfp`)

  return undefined
}