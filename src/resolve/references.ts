import type { Site } from "../lib/site"
import type { DateDef } from "../lib/date"
import type { Reference } from "../output"
import { getUrlType } from "../resolve-url"

export type ReferenceDef = Site | {
  site: Site,
  dateAccessed?: DateDef,
}

export type ReferencesDef = NonEmptyArray<ReferenceDef> | ReferenceDef
type NonEmptyArray<T> = [ T, ...T[] ]

// Helper
export function resolveReferencesDef(references: ReferencesDef | undefined): Reference[] {
  if (!references) return []
  if (!Array.isArray(references)) references = [ references ]

  return references.map(ref => {
    if (typeof ref === "string") {
      return {
        url: ref,
        urlType: getUrlType(ref),
      }
    }
    return {
      url: ref.site,
      urlType: getUrlType(ref.site),
      dateAccessed: ref.dateAccessed,
    }
    // typeof ref === "string" ? {
    //   url: ref,
    //   urlType: getUrlType(ref),
    // } : {
    //   url: ref.site,
    //   urlType: getUrlType(ref.site),
    //   dateAccessed: ref.dateAccessed,
    // }
  }
  )
}

// export function resolveReference(def: ReferenceDef | undefined): Reference | undefined {
//   if (!def) return undefined
//   if (typeof def === "string") return {
//     url: def,
//     urlType: getUrlType(def),
//   }
//   return {
//     url: def.site,
//     urlType: getUrlType(def.site),
//     dateAccessed: def.dateAccessed,
//   }
// }