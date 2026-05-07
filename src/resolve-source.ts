

// Definitions

import { log, logerror, stepSimple, warn } from "./pipeline"
import type { EntriesDefinition, EntryDefinition, ImageDefinition } from "./resolve-entries"
import type { SocialListDef } from "./resolve/socials"
import { resolveGithubSource } from "./resolve-source-github"
import { resolveArrayOrSingleToArray, type ArrayOrSingle } from "./utils"
import { slugify } from "./lib/slug"
import type { Site } from "./lib/site"
import type { LicenseDef } from "./resolve/license"
import type { ReferenceDef } from "./resolve/references"

// Source definition, when resolved should return list of filepaths to be included in the entry.
// Default groupings by "<group>/<filename>" i.e "github/github.svg"
// If deeper path is encountered (i.e github/svg/github.svg), use transform to modify the filepaths so that the segments is only one level deep.
export type SourceDef = {
  transform?: ArrayOrSingle<
    | { type: "replace", from: string, to: string }
    | { type: "filter", exclude: string }
  >,
  licenseFallback?: LicenseDef,
  applyCssStyle?: ImageDefinition[ 'style' ]
} & (
    | { from: "github", repo: `https://github.com/${ string }/${ string }` }
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
    pageUrl: string,                // Link to the page where the file is located, used as reference for the image source.
    licenseDef: LicenseDef
    // license: { // WIP
    //   content: string,           // Content of the license file, used to determine the license type and how to display it.
    //   rawUrl: string,            // Direct link to the raw license file, used to fetch the license content.
    //   pageUrl: string,           // Link to the page where the license file is located, used as reference for the license source.
    // } | "unknown",
  }[],

  // Socials identified from the source definition.
  socials?: SocialListDef,

  // License identified from the source definition.
  rootLicense?: LicenseDef,

  // Source Reference
  scrapedReferenceUrl?: Site,
}

type ResolveSourceResult = {
  scrapedEntries: EntriesDefinition,
  scrapedSocials: SocialListDef,
  scrapedReference: ReferenceDef | undefined,
}


export type ScrapedResultFiles = SourceResult[ "files" ]


export async function resolveSourceDefinition(
  def: SourceDef | undefined,
): Promise<ResolveSourceResult> {

  const opts = {
    // printPreTransformedList: true,
    // printTransformedList: true,
    // printGroups: true,
    // printSummary: true,
  }

  const scrapedSocials: SocialListDef = []

  if (!def) return { scrapedEntries: {}, scrapedSocials, scrapedReference: undefined }

  // Get list of files (and other metadatas attached to them)
  const sourceResult = await (async () => {
    if (def.from === "github")
      return stepSimple(
        "Resolving Github Source",
        () => resolveGithubSource(def)
      )
    throw new Error(`Unknown source type: ${ def.from }`)
  })()

  // Apply transformations to list of files 
  const transformedList = await stepSimple(
    "Applying transformations to scraped files",
    () => resolveSourceTransformation(sourceResult.files, def.transform, opts)
  )

  // Group files into entries-like structure based on the transformedPath.
  const scrapedEntries = await stepSimple(
    "Grouping transformed files into entries",
    () => resolveTransformedSourceToEntries(transformedList, def, opts)
  )

  // Merge scraped socials with socials from the author definition.
  scrapedSocials.push(...(sourceResult.socials ?? []))

  return {
    scrapedEntries,
    scrapedSocials,
    scrapedReference: sourceResult.scrapedReferenceUrl ? { site: sourceResult.scrapedReferenceUrl } : undefined,
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
    const imageData: ImageDefinition = {
      label: file.filename,
      src: { type: "resolved", url: file.rawUrl as Site },
      reference: file.pageUrl ? [ { site: file.pageUrl as Site } ] : undefined,
      style: def?.applyCssStyle,
    }

    if (!scrapedEntries[ entryKey ]) {
      // Resolving license for each entry. 
      // Priority: file - level license > source - level license fallback > unknown.
      // Assume that all images under the same entry have the same license, so we only check the license of the first image in the entry.
      let licenseData: EntryDefinition[ 'license' ] = { type: "unknown" }
      if (file.licenseDef.type === "unknown") {
        licenseData = def?.licenseFallback ?? { type: "unknown" }
      } else {
        licenseData = file.licenseDef
      }
      if (licenseData.type === "unknown") {
        warn("license for entry: " + entryKey + " is unknown. ")
      }

      scrapedEntries[ entryKey ] = {
        label: entryLabel,
        images: [ imageData ],
        license: licenseData,
      }
    } else {
      if (!Array.isArray(scrapedEntries[ entryKey ].images)) {
        logerror(`Entry key collision: ${ entryKey } already exists as a non-image entry. Skipping file: ${ file.transformedPath }`)
        return
      }
      scrapedEntries[ entryKey ].images.push(imageData)
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