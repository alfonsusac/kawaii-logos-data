
import { resolveEntriesMulti, type EntriesDefinition } from "./resolve-entries"
import { resolveSocials, type SocialsDef } from "./resolve/socials"
import { resolvePfp } from "./resolve/pfp"
import type { Site } from "./lib/site"
import type { LicenseDef } from "./resolve/license"
import { resolveSourceDefinition, type SourceDef } from "./resolve-source"
import type { AuthorOutput } from "./output"
import { validateResolvedAuthor } from "./validate"
import { slugify } from "./lib/slug"
import { stepSimple } from "./pipeline"
import { resolveReferencesDef } from "./resolve/references"
import { dedupeByProp } from "./lib/dedupe-by-prop"

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

  const { scrapedEntries, scrapedSocials, scrapedReference } = await stepSimple(
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

  // Collect licenses from entries and root license if exists and dedupe by label
  const licenses = dedupeByProp(entries.flatMap(e => e.license ? [ e.license ] : []))('label')

  const references = resolveReferencesDef(scrapedReference)

  // Compile resolved data into final Author object
  const resolved: AuthorOutput = {
    id: slugify(id),
    displayName,
    pfp,
    social,
    links,
    entries,
    licenses,
    references,
  }

  // Validating Resolved
  await validateResolvedAuthor(resolved)

  return resolved
}
