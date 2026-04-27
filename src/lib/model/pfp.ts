import type { ResolveContext } from "../../resolve-definitions"
import { getBskyProfile } from "../api/bsky"
import type { AuthorDef } from "./author"
import type { AuthorSocialLinks } from "./output"



export async function resolvePfp(
  authorDef: AuthorDef,
  resolvedSocials: AuthorSocialLinks,
  c: ResolveContext
) {
  // Get PFP from user-definition
  if (authorDef.pfp) return authorDef.pfp

  // Try to get PFP from Github
  const github = resolvedSocials.find(s => s.type === "github") as AuthorSocialLinks[ number ] | undefined
  if (github) return `https://avatars.githubusercontent.com/${ github.username }`

  // Try to get PFP from Bluesky
  const bsky = resolvedSocials.find(s => s.type === "bsky") as AuthorSocialLinks[ number ] | undefined
  if (bsky) {
    try {
      const profile = await getBskyProfile(bsky.username)
      if (profile.error) {
        c.logerror(`Error fetching Bluesky profile for ${ bsky.username }: ${ profile.error }`)
        return undefined
      }
      return profile.avatar
    } catch (error) {
      c.logerror(`${ error instanceof Error ? error.message : `Error fetching Bluesky profile for ${ bsky.username }: ` + String(error) }`)
    }
  }

  // Can't resolve PFP
  c.warn(`could not resolve pfp`)

  return undefined
}