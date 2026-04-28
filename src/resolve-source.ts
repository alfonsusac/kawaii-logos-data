

// Definitions

import type { EntriesDefinition } from "./resolve/entries"
import type { SocialListDef } from "./resolve/socials"
import { resolveGithubSource } from "./resolve/source-github"
import { resolveArrayOrSingleToArray, type ArrayOrSingle } from "./utils"

// Source definition, when resolved should return list of filepaths to be included in the entry.
// Default groupings by "<group>/<filename>" i.e "github/github.svg"
// If deeper path is encountered (i.e github/svg/github.svg), use transform to modify the filepaths so that the segments is only one level deep.
export type SourceDef = {
  transform?: ArrayOrSingle<
    | { type: "replace", from: string, to: string }
    | { type: "filter", exclude: string }
  >,
} & (
    | { from: "github", repo: `${ string }/${ string }` }
  )

export type ValidSourceType = SourceDef[ "from" ]





// Implementations

export type SourceResult = {

  // Files scraped from a source definition.
  files: {
    transformedPath: string, // Used to group images into entries in a form of "<group>/<filename>". 
    label: string,           // Used as image label in the entry, by default it's the filename without extension.
    rawUrl: string,          // Direct link to the raw file, used as <img> src.
    pageUrl?: string,        // Link to the page where the file is located, used as reference for the image source.
    license?: { // WIP
      value: string,
      referenceUrl: string,
    } | "unknown",
  }[],

  // Owners identified from the source definition.
  owner?: {
    provider: ValidSourceType,
    username: string,
    url: string,
  },

}

type ResolveSourceResult = {
  scrapedEntries: EntriesDefinition,
  scrapedSocials: SocialListDef,
}


export type ScrapedResultFiles = SourceResult[ "files" ]


export async function resolveSource(
  def: SourceDef | undefined
): Promise<ResolveSourceResult> {

  if (!def) return { scrapedEntries: {}, scrapedSocials: [] }

  // Get list of files (and other metadatas attached to them)
  const scrapedResult = await (async () => {
    if (def.from === "github") {
      return await resolveGithubSource(def)
    }
    throw new Error(`Unknown source type: ${ (def as any).from }`)
  })()

  // Apply transformations to list of files 
  const transformations = resolveArrayOrSingleToArray(def.transform)
  let transformedList = scrapedResult.files
  for (const t of transformations) {
    if (t.type === "replace") {
      scrapedResult.files.forEach(file => {
        file.transformedPath = file.transformedPath.replace(t.from, t.to)
      })
    }
    if (t.type === "filter") {
      transformedList = transformedList.filter(file => !file.transformedPath.includes(t.exclude))
    }
  }













  return {
    scrapedEntries: {},
    // scrapedEntries: transformedList,
    scrapedSocials: []
  }

}

