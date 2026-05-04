import type { Site } from "../lib/site"
import type { DateDef } from "../lib/date"

// WIP


export type ReferenceDef = Site | {
  site: Site,
  dateAccessed?: DateDef,
}
export type Reference = {
  site: Site,
  dateAccessed?: DateDef,
}

export type ReferencesDef = [ ReferenceDef, ...(ReferenceDef & any[]) ] | ReferenceDef
export type References = Reference[]

// Helper
export function normalizeReferencesDef(references: ReferencesDef): References {
  if (!references) return []
  if (!Array.isArray(references)) references = [ references ]
  return references.map(ref => typeof ref === "string" ? { site: ref } : ref)
}

export function resolveReference(def: ReferenceDef | undefined): Reference | undefined {
  if (typeof def === "string") return { site: def }
  return def
}
