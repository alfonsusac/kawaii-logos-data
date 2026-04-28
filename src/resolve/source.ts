import type { Author } from "./output"
import type { SocialListDef } from "./socials"
import { resolveGithubSource } from "./source-github"


// Source definition, when resolved should return list of filepaths to be included in the entry.
// Default groupings by "<group>/<filename>" i.e "github/github.svg"
// If deeper path is encountered (i.e github/svg/github.svg), use transform to modify the filepaths so that the segments is only one level deep.
export type SourceDef = {
  transform?: TransformDef | TransformDef[],
} & (
    | GithubSourceDef
  )

type GithubSourceDef = {
  from: "github",
  repo: `${ string }/${ string }`,
}

type TransformDef =
  | { type: "replace", from: string, to: string }
  | { type: "filter", exclude: string }


// Implementations

export type ScrapedResult = {
  files?: {
    label: string,
    rawUrl: string,
    pageUrl?: string,
    license?: {
      value: string,
      referenceUrl: string,
    },
  }[],
  socialsList?: SocialListDef
}

export async function resolveSource(def: SourceDef | undefined) {



  if (!def) return undefined
  if (def.from === "github") {
    const result = await resolveGithubSource(def)

    const entries: Author[ 'entries' ] | undefined = scrapedResult?.result?.map(image => {
      return {
        id: image.path,
        images: [ {
          src: image.rawPageUrl,
          reference: [ { site: image.githubPageUrl } ],
          label: image.path.split("/").slice(-1)[ 0 ],
          style: undefined,
        } ],
        title: image.path.split("/").slice(-1)[ 0 ],
      }
    })

    const result = {
      license: scrapedResult?.rootLicense ? {
        src: scrapedResult?.rootLicense.rawPageUrl,
        ref: scrapedResult?.rootLicense.githubPageUrl,
      } : undefined,
      entries,
      socialList,
    }

    return result
  }
  throw new Error(`Unknown source type: ${ (def as any).from }`)
}

