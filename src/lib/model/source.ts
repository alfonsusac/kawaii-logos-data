import { fetchGithubProfile, fetchGithubProfileSocialAccounts, fetchGithubRepoFiles } from "../api/github"
import type { Entries } from "./entries"
import type { License } from "./output"
import { getBskySocialFromURL, getGithubSocial, getTwitterSocialFromURL, type Socials } from "./socials"

export type SourcesDef = SourceDef

// Source definition, when resolved should return list of filepaths to be included in the entry.
// Default groupings by "<group>/<filename>" i.e "github/github.svg"
// If deeper path is encountered (i.e github/svg/github.svg), use transform to modify the filepaths so that the segments is only one level deep.
type SourceDef = {
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

function normalizeArrayDef<T>(def: T | T[] | undefined): T[] {
  if (!def) return []
  return Array.isArray(def) ? def : [ def ]
}

export async function resolveSources(def: SourcesDef | undefined) {
  // const defArray = normalizeArrayDef(def)
  // const resolved = await Promise.all(defArray.map(resolveSource))
  // return resolved
  return  await resolveSource(def)

  // given multiple sources, how do we resolve the socials?
  // 1. we can merge the socials from all sources, and if there are duplicates, we can prioritize the first one in the list (i.e the one with the most entries)
  // 2. we can merge the socials from all sources, and if there are duplicates, we can prioritize the one with the most followers (this requires additional API calls to fetch follower count)
  // 3. we can merge the socials from all sources, and if there are duplicates, we can prioritize the one with the most recent activity (this requires additional API calls to fetch recent activity)
}



async function resolveSource(def: SourceDef | undefined) {
  if (!def) return undefined
  if (def.from === "github") {
    const [ owner, repoName ] = def.repo.split("/")

    const tree = await fetchGithubRepoFiles(`${ owner }/${ repoName }`)
    const ghuser = await fetchGithubProfile(owner)
    const ghsocials = await fetchGithubProfileSocialAccounts(owner)

    if (tree === undefined) return undefined
    const resolvedTree = tree.map(item => {
      return {
        ...item,
        githubPageUrl: `https://github.com/${ def.repo }/blob/main/${ item.path }`,
        rawPageUrl: `https://raw.githubusercontent.com/${ def.repo }/main/${ item.path }`,
      }
    })
    const rootLicense = resolvedTree.find(item => item.path.toLowerCase().includes("license"))

    const images = resolvedTree.filter(item => item.type === "blob" && item.path.toLowerCase().match(/\.(png|jpe?g|svg|gif|webp)$/))

    // resolve license
    const imagesWithLicense = images.map(image => {
      // TODO: recursively check current and parent directories for license file, and resolve the most relevant one (i.e the closest one to the image file)
      const license = rootLicense ? {
        src: rootLicense.rawPageUrl,
        ref: rootLicense.githubPageUrl,
      } : undefined
      return {
        ...image,
        license,
      }
    })

    // resolve transform
    const transforms = normalizeArrayDef(def.transform)
    const transfomedImageRef = { current: imagesWithLicense.map(image => { return { ...image, transformedPath: image.path } }) }
    for (const t of transforms) {
      if (t.type === "replace") {
        transfomedImageRef.current = transfomedImageRef.current.map(image => {
          return { ...image, transformedPath: image.path.replace(t.from, t.to) }
        })
      }
      if (t.type === "filter") {
        transfomedImageRef.current = transfomedImageRef.current.filter(image => !image.path.includes(t.exclude))
      }
    }

    // TODO! resolve groupings based on transformedPath, and if no transform is provided, use the default grouping based on the original path (i.e "github/<filename>")


    // resolve socials
    const socials: Socials = {
      x: (() => {
        const xAccount = ghsocials?.find(s => s.provider === "twitter")
        if (!xAccount) return undefined
        return getTwitterSocialFromURL(xAccount.url)
      })(),
      bsky: await (async () => {
        const bskyAccount = ghsocials?.find(s => s.provider === "bluesky")
        if (!bskyAccount) return undefined
        return await getBskySocialFromURL(bskyAccount.url)
      })(),
      github: getGithubSocial(owner),
      site: ghuser?.blog ?? undefined,
    }

    const result = {
      license: rootLicense ? {
        src: rootLicense.rawPageUrl,
        ref: rootLicense.githubPageUrl,
      } : undefined,
      entries: transfomedImageRef.current.map(image => {
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
      }),
      socials,
    } as {
      license?: License,
      entries?: Entries,
      socials?: Socials,
    }

    // console.log("Resolved source", def, result)

    return result
  }
  console.warn("Unknown source type", def)
  return undefined
}

