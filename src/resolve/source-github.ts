import { fetchGithubProfile, fetchGithubProfileSocialAccounts, fetchGithubRepoFiles, returnUndefinedIfError } from "../lib/api/github"
import { logerror } from "../pipeline"
import type { ScrapedResultFiles, SourceDef, SourceResult } from "../resolve-source"
import { normalizeArrayDef } from "../utils"
import { getGithubProfileURL, resolveGithub, type SocialListDef } from "./socials"

type GithubSourceDef = SourceDef & { from: "github" }


export async function resolveGithubSource(def: GithubSourceDef): Promise<SourceResult> {
  const [ owner, repoName ] = def.repo.split("/")

  return {
    files: await resolveGithubRepository(def),
    owner: {
      provider: "github",
      username: owner,
      url: getGithubProfileURL(owner),
    }
  }


  // const scrapedResult = await resolveGithubRepository(def)
  // const socialList = await resolveGithubProfileSocialList(owner)

  // return {
  //   scrapedResult,
  //   socialList,
  // }
}

// ------------------------------------------------------------------------------------

async function resolveGithubRepository(def: GithubSourceDef): Promise<ScrapedResultFiles> {

  const repoFiles = returnUndefinedIfError(await fetchGithubRepoFiles(def.repo), {
    onError: (res) => logerror(`Failed to fetch github repo files for ${ def.repo }: ${ res.status }`),
  })

  if (repoFiles === undefined) return []

  const resolvedTree = repoFiles.tree.map(item => {
    return {
      ...item,
      githubPageUrl: `https://github.com/${ def.repo }/blob/main/${ item.path }`,
      rawPageUrl: `https://raw.githubusercontent.com/${ def.repo }/main/${ item.path }`,
    }
  })

  // For now, we only resolve the root license file if it exists. 
  // In the future, we could potentially resolve all license files and their contents.
  const rootLicense = resolvedTree.find(item => item.path.toLowerCase().includes("license"))

  // Filter only image files. 
  // In the future, we could potentially support other file types as well.
  const images = resolvedTree.filter(item => item.type === "blob" && item.path.toLowerCase().match(/\.(png|jpe?g|svg|gif|webp)$/))

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

  const scrapedResultFiles: ScrapedResultFiles = imagesWithLicense.map(image => {
    return {
      label: image.path.split("/").slice(-1)[ 0 ],
      rawUrl: image.rawPageUrl,
      pageUrl: image.githubPageUrl,
      transformedPath: image.path,
      // id: image.path,
      // src: image.rawPageUrl,
      // reference: [ { site: image.githubPageUrl } ],
      // label: image.path.split("/").slice(-1)[ 0 ],
      // style: undefined,
      // license: image.license,
    } satisfies ScrapedResultFiles[ number ]
  })

  return scrapedResultFiles

  // // resolve transform
  // const transforms = normalizeArrayDef(def.transform)
  // const transfomedImageRef = { current: imagesWithLicense.map(image => { return { ...image, transformedPath: image.path } }) }
  // for (const t of transforms) {
  //   if (t.type === "replace") {
  //     transfomedImageRef.current = transfomedImageRef.current.map(image => {
  //       return { ...image, transformedPath: image.path.replace(t.from, t.to) }
  //     })
  //   }
  //   if (t.type === "filter") {
  //     transfomedImageRef.current = transfomedImageRef.current.filter(image => !image.path.includes(t.exclude))
  //   }
  // }

  // const result = transfomedImageRef.current
  // return {
  //   result,
  //   rootLicense,
  // }
}

// ------------------------------------------------------------------------------------

async function resolveGithubProfileSocialList(owner: string) {

  const ghuser = returnUndefinedIfError(await fetchGithubProfile(owner), {
    onError: (res) => logerror(`Failed to fetch github profile for ${ owner }: ${ res.status }`),
  })
  const ghsocials = returnUndefinedIfError(await fetchGithubProfileSocialAccounts(owner), {
    onError: (res) => logerror(`Failed to fetch github profile social accounts for ${ owner }: ${ res.status }`),
  })

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

  return socialList
}