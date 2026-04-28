
import { resolveEntries, type EntriesDefinition } from "./resolve/entries"
import { resolveSocials, type SocialsDef } from "./resolve/socials"
import { resolvePfp } from "./resolve/pfp"
import type { Author } from "../types"
import type { Site } from "./lib/site"
import type { LicenseDef } from "./resolve/license"
import { resolveSource, type SourceDef } from "./resolve-source"

export type AuthorDefinition = {
  displayName?: string,
  pfp?: Site,
  socials?: SocialsDef,
  license?: LicenseDef,
  entries?: EntriesDefinition,
  source?: SourceDef,
}

// ------------------------------------------------------------

export async function resolveAuthorDefinition(author: AuthorDefinition, id: string) {
  const displayName = author.displayName ?? id

  // Convert source to definitions
  const { scrapedEntries, scrapedSocials } = await resolveSource(author.source)

  // Resolve entries and enrichd datas
  const entries = await resolveEntries(author.entries)

  // Resolve socials
  const { social, links } = await resolveSocials(author.socials, scrapedSocials)

  // Resolve pfp from def or scraped socials
  const pfp = await resolvePfp(author, links.socials)

  // Compile resolved data into final Author object
  const resolved: Author = {
    id,
    displayName,
    pfp,
    social,
    links,
    entries: [
      ...entries,
    ],
  }

  return resolved
}
