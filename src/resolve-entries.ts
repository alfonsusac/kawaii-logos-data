import type { Site } from "./lib/site"
import { type DateDef } from "./lib/date"
import type { AuthorOutput, Output } from "./output"
import { resolveReferencesDefinition, type ReferenceDef, type ReferencesDef } from "./resolve-references"
import { logerror, warn } from "./pipeline"
import { resolveArrayOrSingleToArray, type ArrayOrSingle } from "./utils"
import { resolveLicenseDefinitions, type LicenseDef } from "./resolve-license"
import { resolveHttpsSite } from "./resolve-url"
import { getFilenameFromUrl } from "./lib/get-filename-from-url"
import { matchUrl } from "./lib/url-pattern"
import { normalizeSingleOrNonEmptyArray } from "./lib/non-empty-array"

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
// | { type: "github-blob", url: `https://github.com/${ string }/${ string }/blob/${ string }` }
// | { type: "gist-raw", url: `https://gist.githubusercontent.com/${ string }/${ string }/raw/${ string }/${ string }` }
// | { type: "self-hosted", filepath: `./assets/${ string }` }
// | { type: "resolved", url: Site, }
// | { type: "unknown", url: Site, }

// ----------------------------------------------------------------------------------------

export async function resolveEntriesMulti(
  ...args: (EntriesDefinition | undefined)[]
) {
  const allEntries: AuthorOutput[ 'entries' ] = []

  for (const defs of args) {
    if (!defs) continue
    (await resolveEntries(defs))
      .forEach(entry => {
        // Check for duplicate entry IDs
        if (allEntries.some(e => e.id === entry.id)) {
          logerror(`Duplicate entry ID found: ${ entry.id } from defs count ${ Object.keys(defs).length }. Please change the entry ID to be unique across all entries.`)
        } else {
          allEntries.push(entry)
        }
      })
  }
  return allEntries
}


export async function resolveEntries(
  defs: EntriesDefinition | undefined,
): Promise<AuthorOutput[ 'entries' ]> {
  if (!defs) return []

  const entries: AuthorOutput[ 'entries' ] = []

  for (const [ id, entryDef ] of Object.entries(defs)) {

    const imageDefs = resolveArrayOrSingleToArray(entryDef.images)

    const images: AuthorOutput.EntryItem[ 'images' ] = []

    // Resolve ImageDefs
    for (const imgDef of imageDefs) {

      // Initialize references array for this image
      const referencesDef: ReferenceDef[] = normalizeSingleOrNonEmptyArray(imgDef.references)


      // Resolve image source + label + reference (if any) based on its type
      const temp = {
        src: null as null | Site,
        label: imgDef.label,
      }

      if (imgDef.src.startsWith("resolved:")) {
        temp.src = imgDef.src.replace("resolved:", "") as Site
      }

      if (matchUrl(imgDef.src, "https://github.com/:A/:B/blob/:C+")) {
        const rawUrl = imgDef.src.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
        const pageUrl = imgDef.src as Site
        referencesDef.push(pageUrl)
        temp.src = rawUrl as Site
      }

      if (matchUrl(imgDef.src, "https://gist.githubusercontent.com/:A/:B/raw/:C+")) {
        const rawUrl = imgDef.src as Site
        const pageUrl = imgDef.src.replace("gist.githubusercontent.com", "gist.github.com").replace("/raw/", "/").replace(/\/([^\/]+)$/, "#file-$1") as Site
        referencesDef.push(pageUrl)
        temp.src = rawUrl
      }

      if (imgDef.src.startsWith("./assets/")) {
        const rawUrl = `https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/main-2/assets/${ imgDef.src.replace('./assets/', '') }` as const
        const pageUrl = rawUrl.replace("raw.githubusercontent.com", "github.com").replace("/main-2/", "/blob/main-2/") as Site
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

    // Resolve LicenseDef
    const license = resolveLicenseDefinitions(entryDef.license)

    const entryReferences = resolveReferencesDefinition(entryDef.references)

    entries.push({
      id,
      title: entryDef.label,
      references: entryReferences,
      imageCount: images.length,
      license,
      images,
    })

    entries.sort((a, b) => a.id.localeCompare(b.id)) // Sort entries by ID for consistent output
  }

  return entries
}

// ----------------------------------------------------------------------------------------