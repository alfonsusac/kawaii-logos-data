import type { Site } from "../lib/site"
import type { DateDef } from "../lib/date"
import type { Reference } from "../output"
import { getUrlType } from "../resolve-url"
import type { NonEmptyArray } from "../lib/non-empty-array"

export type ReferenceDef = Site | {
  site: Site,
  dateAccessed?: DateDef,
}

export type ReferencesDef = NonEmptyArray<ReferenceDef> | ReferenceDef

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
  })
}