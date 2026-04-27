import { type DateDef } from "./date"
import type { Author, Entry } from "./output"
import { normalizeReferencesDef, type ReferencesDef } from "./references"
import type { Site } from "../site"
import type { ResolveContext } from "../../resolve-definitions"

// ## Definitions

export type EntriesDef = Record<string, EntryDef>

export type EntryDef = {
  title: string,
  images?: ImageDef | ImageDef[],
  createdAt?: DateDef,
}

export type ImageDef = {
  label?: string,
  src: Site,
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

export function resolveEntries(defs: EntriesDef | undefined, c: ResolveContext): Author[ 'entries' ] {
  if (!defs) return []
  const entries: Author[ 'entries' ] = Object
    .entries(defs)
    .map(([ id, def ]) => {

      const flattenedimages = def.images
        ? (Array.isArray(def.images)
          ? def.images
          : [ def.images ])
        : []

      const images: Entry[ 'images' ] = [
        ...flattenedimages.map(variant => ({
          src: variant.src,
          reference: variant.reference ? normalizeReferencesDef(variant.reference) : undefined,
          style: variant.style,
          label: variant.label,
        } satisfies Entry[ 'images' ][ number ]))
      ]

      return {
        id,
        title: def.title,
        // createdAt: def.createdAt && resolveDate(def.createdAt),
        images,
      } satisfies Entry
    })

  return entries
}


// ## Output Data Types












// #### Definition Helper

export function AlfonsImageDef(title: string, filename: string): EntryDef {
  return {
    title,
    images: {
      src: `https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/main/assets/alfon/${ filename }`,
      reference: `https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/main/assets/alfon/${ filename }`,
    }
  }
}

export function GithubPage(blobUrl: `https://github.com/${ string }/blob/${ string }`, opts?: Omit<ImageDef & object, "src">): ImageDef {
  const raw = blobUrl.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/") as Site
  const references = normalizeReferencesDef(opts?.reference ?? blobUrl)
  return {
    src: raw,
    reference: [
      { site: blobUrl },
      ...references,
    ],
    ...opts
  }
}
