

// Definitions

import { log, logerror, step, stepSimple } from "./pipeline"
import type { EntriesDefinition, ImageDef } from "./resolve/entries"
import type { SocialListDef } from "./resolve/socials"
import { resolveGithubSource } from "./resolve-source-github"
import { resolveArrayOrSingleToArray, type ArrayOrSingle } from "./utils"
import { slugify } from "./lib/slug"
import type { Site } from "./lib/site"

// Source definition, when resolved should return list of filepaths to be included in the entry.
// Default groupings by "<group>/<filename>" i.e "github/github.svg"
// If deeper path is encountered (i.e github/svg/github.svg), use transform to modify the filepaths so that the segments is only one level deep.
export type SourceDef = {
  transform?: ArrayOrSingle<
    | { type: "replace", from: string, to: string }
    | { type: "filter", exclude: string }
  >,
  applyCssStyle?: ImageDef[ 'style' ]
} & (
    | { from: "github", repo: `${ string }/${ string }` }
  )

export type ValidSourceType = SourceDef[ "from" ]





// Implementations

export type SourceResult = {

  // Files scraped from a source definition.
  files: {
    filename: string,                // Used for reference, not used in the final output.
    filenameWithoutExtension: string, // Used as default label and default groupings
    extension: string,               // Used to determine the file type and how to display it.
    transformedPath: string,         // Used to group images into entries in a form of "<group>/<filename>". 
    rawUrl: string,                  // Direct link to the raw file, used as <img> src.
    pageUrl?: string,                // Link to the page where the file is located, used as reference for the image source.
    license?: { // WIP
      contentUrl: string,            // Link to the license content, used for reference and to determine the license type.
      referenceUrl: string,          // Link to where the license was found.
    } | "unknown",
  }[],

  // Owners identified from the source definition.
  owner?: {
    provider: ValidSourceType,
    username: string,
    url: string,
  },

  // Socials identified from the source definition.
  socials?: SocialListDef,
}

type ResolveSourceResult = {
  scrapedEntries: EntriesDefinition,
  scrapedSocials: SocialListDef,
}


export type ScrapedResultFiles = SourceResult[ "files" ]


export async function resolveSourceDefinition(
  def: SourceDef | undefined,
  opts: {
    printPreTransformedList?: boolean,
    printTransformedList?: boolean,
    printGroups?: boolean,
    printSummary?: boolean,
  }
): Promise<ResolveSourceResult> {

  const scrapedSocials: SocialListDef = []

  if (!def) return { scrapedEntries: {}, scrapedSocials }

  // Get list of files (and other metadatas attached to them)
  const scrapedResult = await (async () => {
    if (def.from === "github")
      return stepSimple("Resolving Github Source", () => resolveGithubSource(def))
    throw new Error(`Unknown source type: ${ (def as any).from }`)
  })()

  // Apply transformations to list of files 
  const transformedList = await stepSimple(
    "Applying transformations to scraped files",
    () => resolveSourceTransformation(scrapedResult.files, def.transform, opts)
  )

  // Group files into entries-like structure based on the transformedPath.
  const scrapedEntries = await stepSimple(
    "Grouping transformed files into entries",
    () => resolveTransformedSourceToEntries(transformedList, def, opts)
  )

  // Merge scraped socials with socials from the author definition.
  scrapedSocials.push(...(scrapedResult.socials ?? []))

  return {
    scrapedEntries,
    scrapedSocials
  }

}

// --------------------------------------------------------------------------------

export function resolveSourceTransformation(
  files: ScrapedResultFiles,
  transformationDef: SourceDef[ "transform" ],
  opts: {
    printPreTransformedList?: boolean,
    printTransformedList?: boolean,
  }
): ScrapedResultFiles {

  if (opts.printPreTransformedList) {
    log(`Transformed List:`)
    files.map(t => t.transformedPath).sort().forEach(t => log(`- ${ t }`))
  }

  let transformedList = files
  const transformations = resolveArrayOrSingleToArray(transformationDef)
  for (const t of transformations) {
    if (t.type === "replace")
      transformedList.forEach(file => file.transformedPath = file.transformedPath.replace(t.from, t.to))
    if (t.type === "filter")
      transformedList = transformedList.filter(file => !file.transformedPath.includes(t.exclude))
  }

  if (opts.printTransformedList) {
    log(`Transformed List:`)
    transformedList.map(t => t.transformedPath).sort().forEach(t => log(`- ${ t }`))
  }

  return transformedList
}

// --------------------------------------------------------------------------------

export async function resolveTransformedSourceToEntries(
  transformedFiles: ScrapedResultFiles,
  def: SourceDef | undefined,
  opts: {
    printGroups?: boolean,
    printSummary?: boolean,
  }
) {
  const scrapedEntries: EntriesDefinition = {}

  // Convert transformed list into entries-like structure based on the transformedPath.
  function addToScrapeEntries(entryKey: string, entryLabel: string, file: ScrapedResultFiles[ number ]) {
    if (!scrapedEntries[ entryKey ]) {
      scrapedEntries[ entryKey ] = {
        label: entryLabel,
        images: [ {
          label: file.filenameWithoutExtension,
          src: file.rawUrl as Site,
          reference: file.pageUrl ? [ { site: file.pageUrl as Site } ] : undefined,
          style: def?.applyCssStyle,
        } ],
      }
    } else {
      if (!Array.isArray(scrapedEntries[ entryKey ].images)) {
        logerror(`Entry key collision: ${ entryKey } already exists as a non-image entry. Skipping file: ${ file.transformedPath }`)
        return
      }
      scrapedEntries[ entryKey ].images.push({
        label: file.filenameWithoutExtension,
        src: file.rawUrl as Site,
        reference: file.pageUrl ? [ { site: file.pageUrl as Site } ] : undefined,
        style: def?.applyCssStyle,
      })
    }
  }

  transformedFiles.forEach(file => {
    const segments = file.transformedPath.split("/")
    if (segments.length === 1) {
      // If there is no grouping (i.e all images are in the root), use filenameWithoutExtension as the key.
      const entryKey = slugify(file.filenameWithoutExtension)
      const entryLabel = file.filenameWithoutExtension
      addToScrapeEntries(entryKey, entryLabel, file)
    }
    else if (segments.length === 2) {
      // If there is grouping in the form of "<group>/<filename>", use the first segment as the key and the second segment as the filename.
      const entryKey = slugify(segments[ 0 ])
      const entryLabel = segments[ 0 ]
      addToScrapeEntries(entryKey, entryLabel, file)
    } else {
      logerror(`Unsupported file path with more than 2 segments: ${ file.transformedPath }. Skipping. Please use transform to modify the file paths to be at most 2 segments.`)
    }
  })

  if (opts.printSummary) {
    log(`Scraped ${ transformedFiles.length } files from source. Grouped into ${ Object.keys(scrapedEntries).length } entries.`)
  }
  if (opts.printGroups) {
    log(`Groups:`)
    Object.entries(scrapedEntries).forEach(([ key, entry ]) => {
      log(`- ${ key } (${ Array.isArray(entry.images) ? entry.images.length : 1 } images)`)
    })
  }

  return scrapedEntries
}