
import { resolveEntriesMulti, type EntriesDefinition } from "./resolve-entries"
import { resolveSocials, type SocialsDef } from "./resolve-socials"
import { resolvePfp } from "./resolve-pfp"
import type { LicenseDef } from "./resolve-license"
import { resolveSourceDefinition, type SourceDef } from "./resolve-source"
import { validateResolvedAuthor } from "./validate"
import { slugify } from "./lib/slug"
import { stepSimple } from "./pipeline"
import { resolveReferencesDefinition, type ReferencesDef } from "./resolve-references"
import { dedupeByProp } from "./lib/dedupe-by-prop"
import { resolveFundingsDef, type FundingsDef } from "./resolve-funding"
import type { HttpsSite } from "./resolve-url"
import type { KawaiiLogosData } from "./output"

export type AuthorDefinition = {
  displayName?: string,
  pfp?: HttpsSite,
  socials?: SocialsDef,
  license?: LicenseDef,
  entries?: EntriesDefinition,
  source?: SourceDef,
  fundings?: FundingsDef,
  references?: ReferencesDef,

  // Debugging
  logVerbose?: boolean,
}

// ------------------------------------------------------------

export async function resolveAuthorDefinition(
  id: string,
  authorDefinition: AuthorDefinition,
): Promise<{
  definition: AuthorDefinition,
  resolved: {
    author: KawaiiLogosData.Author,
    entries: KawaiiLogosData.Entry[],
  }
}> {
  const displayName = authorDefinition.displayName ?? id

  const {
    scrapedEntries,
    scrapedSocials,
    scrapedReference
  } = await stepSimple(
    "Converting source to definitions",
    () => resolveSourceDefinition(authorDefinition.source)
  )

  const {
    entries,
    entryIds,
  } = await stepSimple(
    "Resolving entries",
    () => resolveEntriesMulti(id, authorDefinition.entries, scrapedEntries)
  )

  const {
    socials,
    personalSites
  } = await stepSimple(
    "Resolving socials",
    () => resolveSocials(authorDefinition.socials, scrapedSocials)
  )

  const pfp = await stepSimple(
    "Resolving pfp from def or scraped socials",
    () => resolvePfp(authorDefinition, socials)
  )

  const fundings = await stepSimple(
    "Resolving fundings",
    () => resolveFundingsDef(authorDefinition.fundings)
  )

  // Collect licenses from entries and root license if exists and dedupe by label
  const licenses = dedupeByProp(entries.flatMap(e => e.license ? [ e.license ] : []))('label')

  // Add references from source if exists
  const references = resolveReferencesDefinition(scrapedReference, authorDefinition.references)

  // Compile resolved data into final Author object
  const author: KawaiiLogosData.Author = {
    id: slugify(id),
    displayName,
    pfp,
    socials,
    personalSites,
    entryIds,
    licenses,
    references,
    fundings,
  }

  // Validating Resolved
  await validateResolvedAuthor(author, entries)

  return {
    definition: authorDefinition,
    resolved: {
      author,
      entries,
    }
  }
}
