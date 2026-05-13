import { resolveDate, type DateDef } from "./lib/date"
import { resolveReferencesDefinition, type ReferenceDef, type ReferencesDef } from "./resolve-references"
import { logerror, warn } from "./pipeline"
import { resolveLicenseDefinitions, type LicenseDef } from "./resolve-license"
import { resolveHttpsSite, site, type HttpsSite } from "./resolve-url"
import { getFilenameFromUrl } from "./lib/get-filename-from-url"
import { matchUrl } from "./lib/url-pattern"
import { resolveArrayOrSingleToArray, type ArrayOrSingle } from "./lib/array-type-utils"
import type { KawaiiLogosData } from "./output"
import { checkDuplicates } from "./lib/dedupe-by-prop"
import { slugify } from "./lib/slug"

// ## Definitions

export type EntriesDefinition = Record<string, EntryDefinition>

export type EntryDefinition = {
  label: string,
  images?: ArrayOrSingle<ImageDefinition>,
  license?: LicenseDef,
  createdAt?: DateDef,
  references?: ReferencesDef,
}

export type ImageDefinition = {
  label?: string,
  src: ImageSourceDef,
  /**
   * The references field is used to provide additional context about the image, 
   * such as where it was sourced from or when it was accessed. 
   * This can be especially useful for images that are not hosted on the same 
   * domain as the entry, or for images that may be subject to copyright or 
   * licensing restrictions.
   * 
   * You can also include relevant posts, articles, or other media that reference 
   * the image or the entry it represents.
   */
  references?: ReferencesDef,
  style?: {
    objectFit?: "cover" | "contain"
  },
}

export type ImageStyleDef = { objectFit?: "cover" | "contain" }

export type ImageSourceDef =
  | `resolved:${ string }`
  | `https://github.com/${ string }/${ string }/blob/${ string }`
  | `https://gist.githubusercontent.com/${ string }/${ string }/raw/${ string }/${ string }`
  | `./assets/${ string }`

// ----------------------------------------------------------------------------------------

export async function resolveEntriesMulti(
  authorId: string,
  ...args: (EntriesDefinition | undefined)[]
) {
  const allEntries: KawaiiLogosData.Entry[] = []

  for (const defs of args) {
    if (!defs) continue

    const resolvedEntries = await resolveEntries(authorId, defs)

    const {
      deduped,
      duplicates,
      hasDuplicates,
    } = checkDuplicates(resolvedEntries, 'id')

    if (hasDuplicates)
      warn(`Duplicate entry IDs found for author ${ authorId }: ${ duplicates.join(', ') }. Please change the entry IDs to be unique across all entries.`)

    deduped.forEach(entry => allEntries.push(entry))
  }

  return {
    entries: allEntries,
    entryIds: allEntries.map(e => e.id),
  }
}


export async function resolveEntries(
  authorId: string,
  defs: EntriesDefinition | undefined,
): Promise<KawaiiLogosData.Entry[]> {
  if (!defs) return []

  const entries: KawaiiLogosData.Entry[] = []

  for (const [ id, entryDef ] of Object.entries(defs)) {

    const images: KawaiiLogosData.EntryImage[] = []

    const license = resolveLicenseDefinitions(entryDef.license)

    const entryReferences = resolveReferencesDefinition(entryDef.references)
    // entryReferences.push(...resolveReferencesDefinition(authorRef)) // Combine in front-end instead.

    const imageDefs = resolveArrayOrSingleToArray(entryDef.images)

    // Resolve ImageDefs
    for (const imgDef of imageDefs) {

      // Initialize references array for this image
      const referencesDef: ReferenceDef[] = resolveArrayOrSingleToArray(imgDef.references)

      // Resolve image source + label + reference (if any) based on its type
      const temp = {
        src: null as null | HttpsSite,
        label: imgDef.label,
      }

      if (imgDef.src.startsWith("resolved:")) {
        temp.src = site(imgDef.src.replace("resolved:", ""))
      }

      if (matchUrl(imgDef.src, "https://github.com/:A/:B/blob/:C+")) {
        const rawUrl = imgDef.src.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
        const pageUrl = site(imgDef.src)
        referencesDef.push(pageUrl)
        temp.src = site(rawUrl)
      }

      if (matchUrl(imgDef.src, "https://gist.githubusercontent.com/:A/:B/raw/:C+")) {
        const rawUrl = site(imgDef.src)
        const pageUrl = site(imgDef.src.replace("gist.githubusercontent.com", "gist.github.com").replace("/raw/", "/").replace(/\/([^\/]+)$/, "#file-$1"))
        referencesDef.push(pageUrl)
        temp.src = rawUrl
      }

      if (imgDef.src.startsWith("./assets/")) {
        // check if file exists first.
        const file = Bun.file(imgDef.src)
        if (!await file.exists()) {
          logerror(`${ id }: Local asset file does not exist. Label: ${ imgDef.label }. Url: ${ imgDef.src }`)
          continue
        }
        const rawUrl = `https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/main/assets/${ imgDef.src.replace('./assets/', '') }` as const
        const pageUrl = site(rawUrl.replace("raw.githubusercontent.com", "github.com").replace("/main/", "/blob/main/"))
        referencesDef.push(pageUrl)
        temp.src = rawUrl
      }

      if (temp.src === null) {
        logerror(`${ id }: Failed to resolve image source. Label: ${ imgDef.label }. Url: ${ imgDef.src }`)
        continue
      }

      images.push({
        label: temp.label ?? getFilenameFromUrl(temp.src),
        src: resolveHttpsSite(temp.src),
        references: resolveReferencesDefinition(referencesDef),
        style: imgDef.style,
      })
    }

    entries.push({
      id: slugify(id),
      authorId,
      title: entryDef.label,
      references: entryReferences,
      imageCount: images.length,
      license,
      images,
      createdAt: resolveDate(entryDef.createdAt)?.iso,
    })

    entries.sort((a, b) => a.id.localeCompare(b.id)) // Sort entries by ID for consistent KawaiiLogosData
  }

  return entries
}

// ----------------------------------------------------------------------------------------