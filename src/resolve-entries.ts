import type { Site } from "./lib/site"
import { type DateDef } from "./resolve/date"
import type { Author, AuthorEntryItem, License, Reference } from "./output"
import { normalizeReferencesDef, resolveReference, type ReferencesDef } from "./resolve/references"
import { logerror, warn } from "./pipeline"
import { resolveArrayOrSingleToArray, type ArrayOrSingle } from "./utils"
import { resolveLicenseDefinitions, type LicenseDef } from "./resolve/license"

// ## Definitions

export type EntriesDefinition = Record<string, EntryDefinition>

export type EntryDefinition = {
  label: string,
  images?: ArrayOrSingle<ImageDefinition>,
  license?: LicenseDef,
  createdAt?: DateDef,
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
  reference?: ReferencesDef,
  style?: {
    objectFit?: "cover" | "contain"
  },
}

export type ImageStyleDef = { objectFit?: "cover" | "contain" }

export type ImageSourceDef =
  | { type: "github-blob", url: `https://github.com/${ string }/${ string }/blob/${ string }` }
  | { type: "gist-raw", url: `https://gist.githubusercontent.com/${ string }/${ string }/raw/${ string }/${ string }` }
  | { type: "self-hosted", filepath: `./assets/${ string }` }
  | { type: "resolved", url: Site, }
  | { type: "unknown", url: Site, }

// ----------------------------------------------------------------------------------------

export async function resolveEntriesMulti(
  ...args: (EntriesDefinition | undefined)[]
) {
  const allEntries: Author[ 'entries' ] = []

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
): Promise<Author[ 'entries' ]> {
  if (!defs) return []

  const entries: Author[ 'entries' ] = []

  for (const [ id, entryDef ] of Object.entries(defs)) {

    const imageDefs = resolveArrayOrSingleToArray(entryDef.images)

    const images: AuthorEntryItem[ 'images' ] = []

    // Resolve ImageDefs
    for (const imgDef of imageDefs) {
      const references: Reference[] = []
      const temp = {
        src: null as null | string,
        label: imgDef.label,
      }

      if (imgDef.src.type === "github-blob") {
        const raw = imgDef.src.type.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/") as Site
        references.push({ site: imgDef.src.url })
        temp.src = raw
        temp.label ??= imgDef.src.url.split("/").slice(-1)[ 0 ] // Default label to filename if not provided`
      }

      if (imgDef.src.type === "gist-raw") {
        // Before  -> https://gist.githubusercontent.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3/raw/2d5079562396d43e615cf0ffe81da60438b184c9/typst-logo.png
        // After   -> https://gist.github.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3#file-typst-logo-png
        const raw = imgDef.src.url.replace("gist.githubusercontent.com", "gist.github.com").replace("/raw/", "/").replace(/\/([^\/]+)$/, "#file-$1") as Site
        console.log(raw)
        references.push({ site: imgDef.src.url })
        temp.src = raw
        temp.label ??= imgDef.src.url.split("/").slice(-1)[ 0 ] // Default label to filename if not provided`
      }

      if (imgDef.src.type === "self-hosted") {
        const url = `https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/main/assets/alfon/${ imgDef.src.filepath }`
        references.push({ site: url })
        temp.src = url
        temp.label ??= imgDef.src.filepath // Default label to filename if not provided`
      }

      if (imgDef.src.type === "resolved") {
        temp.src = imgDef.src.url
      }

      if (imgDef.src.type === "unknown") {
        warn(`Unknown image source type for entry id: ${ id }. Please check the image source definition's type.`)
        temp.src = imgDef.src.url
      }

      if (temp.src === null) {
        logerror(`Failed to resolve image source for entry id: ${ id } with label: ${ imgDef.label }. Please check the image source definition's type.`)
        continue
      }

      // Add references from the image definition, if any
      references.push(...(imgDef.reference ? normalizeReferencesDef(imgDef.reference) : []))

      images.push({
        label: temp.label,
        src: temp.src,
        // reference: imgDef.reference ? normalizeReferencesDef(imgDef.reference) : undefined,
        style: imgDef.style,
      })
    }

    // Resolve LicenseDef
    const license = resolveLicenseDefinitions(entryDef.license)

    entries.push({
      id,
      title: entryDef.label,
      references: [],
      license,
      // createdAt: def.createdAt && resolveDate(def.createdAt),
      images,
    })
  }

  return entries
}

// ----------------------------------------------------------------------------------------