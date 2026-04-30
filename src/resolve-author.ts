
import { resolveEntries, resolveEntriesMulti, type EntriesDefinition } from "./resolve-entries"
import { resolveSocials, type SocialsDef } from "./resolve/socials"
import { resolvePfp } from "./resolve/pfp"
import type { Site } from "./lib/site"
import type { LicenseDef } from "./resolve/license"
import { resolveSourceDefinition, type SourceDef } from "./resolve-source"
import type { Author } from "./output"
import { validateResolvedAuthor } from "./validate"
import { slugify } from "./lib/slug"
import { step, stepSimple } from "./pipeline"

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

  const { scrapedEntries, scrapedSocials } = await stepSimple(
    "Converting source to definitions",
    () => resolveSourceDefinition(author.source)
  )

  const entries = await stepSimple(
    "Resolving entries and enrich data",
    () => resolveEntriesMulti(author.entries, scrapedEntries)
  )

  const { social, links } = await stepSimple(
    "Resolving socials",
    () => resolveSocials(author.socials, scrapedSocials)
  )

  const pfp = await stepSimple(
    "Resolving pfp from def or scraped socials",
    () => resolvePfp(author, links.socials)
  )

  // Compile resolved data into final Author object
  const resolved: Author = {
    id: slugify(id),
    displayName,
    pfp,
    social,
    links,
    entries: [
      ...entries,
    ],
  }

  // Validating Resolved
  await validateResolvedAuthor(resolved)

  return resolved
}
