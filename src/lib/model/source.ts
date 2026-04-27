import { logerror } from "../../pipeline"
import { fetchGithubProfile, fetchGithubProfileSocialAccounts, fetchGithubRepoFiles, returnUndefinedIfError } from "../api/github"
import type { Author } from "./output"
import { resolveBskyFromURL, resolveGithub, resolveGithubFromURL, type SocialListDef } from "./socials"

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
  return await resolveSource(def)
}



async function resolveSource(def: SourceDef | undefined) {
  if (!def) return undefined
  if (def.from === "github") {
    const [ owner, repoName ] = def.repo.split("/")

    const repoFiles = returnUndefinedIfError(await fetchGithubRepoFiles(`${ owner }/${ repoName }`), {
      onError: (res) => logerror(`Failed to fetch github repo files for ${ def.repo }: ${ res.status }`),
    })
    const ghuser = returnUndefinedIfError(await fetchGithubProfile(owner), {
      onError: (res) => logerror(`Failed to fetch github profile for ${ owner }: ${ res.status }`),
    })
    const ghsocials = returnUndefinedIfError(await fetchGithubProfileSocialAccounts(owner), {
      onError: (res) => logerror(`Failed to fetch github profile social accounts for ${ owner }: ${ res.status }`),
    })




    if (repoFiles === undefined) return undefined
    const resolvedTree = repoFiles.tree.map(item => {
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

    const socialList: SocialListDef = []
    ghsocials?.forEach(s => {
      if (s.provider === "twitter") {
        socialList.push({ label: "x", url: s.url })
      }
      if (s.provider === "bluesky") {
        socialList.push({ label: "bsky", url: s.url })
      }
      if (s.provider === "generic") {
        socialList.push({ label: "site", url: s.url })
      }
    })
    if (ghuser?.blog) {
      socialList.push({ label: "site", url: ghuser.blog })
    }
    socialList.push({ label: "github", url: resolveGithub(owner)!.url })

    // const twitterAccount = ghsocials?.find(s => s.provider === "twitter")
    // const bskyAccount = ghsocials?.find(s => s.provider === "bluesky")
    // const githubAccount = resolveGithub(owner)
    // const site = ghuser?.blog ?? undefined

    // const twitter = resolveGithubFromURL(twitterAccount?.url, c)
    // const bsky = resolveBskyFromURL(bskyAccount?.url, c)
    // const github = resolveGithubFromURL(githubAccount?.url, c)

    // const socials: Author[ 'socials' ] = []
    // if (twitter) socials.push({ label: "x", ...twitter })
    // if (bsky) socials.push({ label: "bsky", ...bsky })
    // if (github) socials.push({ label: "github", ...github })
    // if (site) socials.push({ label: "site", url: site })

    const entries: Author[ 'entries' ] = transfomedImageRef.current.map(image => {
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
      license: rootLicense ? {
        src: rootLicense.rawPageUrl,
        ref: rootLicense.githubPageUrl,
      } : undefined,
      entries,
      socialList,
    }

    return result
  }
  console.warn("Unknown source type", def)
  return undefined
}

