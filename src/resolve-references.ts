import type { Site } from "./lib/site"
import type { DateDef } from "./lib/date"
import { resolveHttpsSite } from "./resolve-url"
import type { NonEmptyArray } from "./lib/non-empty-array"
import type { Output } from "./output"

export type ReferenceDef = Site | {
  site: Site,
  dateAccessed?: DateDef,
}

export type ReferencesDef = NonEmptyArray<ReferenceDef> | ReferenceDef




// Helper
export function resolveReferencesDefinition(references: ReferenceDef[] | ReferenceDef | undefined): Output.Reference[] {
  if (!references) return []
  if (!Array.isArray(references)) references = [ references ]

  return references.map(ref => {
    if (typeof ref === "string") {
      return {
        link: resolveHttpsSite(ref),
      }
    }
    return {
      link: resolveHttpsSite(ref.site),
      dateAccessed: ref.dateAccessed,
    }
  })
}