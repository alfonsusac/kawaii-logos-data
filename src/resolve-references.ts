import type { DateDef } from "./lib/date"
import { resolveHttpsSite, site, type HttpsSite } from "./resolve-url"
import type { Output } from "./output"
import { warn } from "./pipeline"
import type { ArrayOrSingle } from "./lib/array-type-utils"

export type ReferenceDef = HttpsSite | {
  site: HttpsSite,
  dateAccessed?: DateDef,
}

export type ReferencesDef = ArrayOrSingle<ReferenceDef>



export function resolveReferencesDefinition(...references: ((ReferenceDef | undefined)[] | ReferenceDef | undefined)[]): Output.Reference[] {
  const referencesList: ReferenceDef[] = []
  for (const refs of references) {
    if (!refs) continue
    if (Array.isArray(refs)) {
      referencesList.push(...refs.filter((r): r is ReferenceDef => !!r))
    } else {
      referencesList.push(refs)
    }
  }

  const referencesSet = new Map<string, Output.Reference>()
  for (const ref of referencesList) {
    const link = typeof ref === "string" ? resolveHttpsSite(site(ref)) : resolveHttpsSite(ref.site)
    if (referencesSet.has(link.url)) {
      warn(`Duplicate reference link found: ${ link.url }. Consider deduping references.`)
    }
    referencesSet.set(link.url, {
      link,
      dateAccessed: typeof ref === "string" ? undefined : ref.dateAccessed,
    })
  }

  return Array.from(referencesSet.values())
}