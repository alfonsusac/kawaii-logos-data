import { fetchGithubProfile, fetchGithubProfileSocialAccounts, fetchGithubRepoFiles, returnUndefinedIfError } from "./lib/api/github"
import { log, logerror } from "./pipeline"
import type { ScrapedResultFiles, SourceDef, SourceResult } from "./resolve-source"
import { normalizeArrayDef } from "./utils"
import { getGithubProfileURL, resolveGithub, type SocialListDef } from "./resolve/socials"

type GithubSourceDef = SourceDef & { from: "github" }


export async function resolveGithubSource(def: GithubSourceDef): Promise<SourceResult> {
  const [ owner, repoName ] = def.repo.split("/")

  log(`Link to Github Repo: ${ getGithubProfileURL(owner) }/${ repoName }`)

  return {
    files: await resolveGithubRepository(def),
    owner: {
      provider: "github",
      username: owner,
      url: getGithubProfileURL(owner),
    }
  }
}

// ------------------------------------------------------------------------------------

async function resolveGithubRepository(def: GithubSourceDef): Promise<ScrapedResultFiles> {

  const repoFiles = returnUndefinedIfError(await fetchGithubRepoFiles(def.repo), {
    onError: (res) => logerror(`Failed to fetch github repo files for ${ def.repo }: ${ res.status }`),
  })

  if (repoFiles === undefined) return []

  const resolvedTree = repoFiles.tree.map(item => {
    return {
      gh: item,
      githubPageUrl: `https://github.com/${ def.repo }/blob/main/${ item.path }`,
      rawPageUrl: `https://raw.githubusercontent.com/${ def.repo }/main/${ item.path }`,
    }
  })

  // For now, we only resolve the root license file if it exists. 
  // In the future, we could potentially resolve all license files and their contents.
  const rootLicense = resolvedTree.find(item => item.gh.path.toLowerCase().includes("license"))
  log("license: ", rootLicense?.rawPageUrl ?? "not found")

  // Filter only image files. 
  // In the future, we could potentially support other file types as well.
  const imageFiles = resolvedTree
    .filter(item => item.gh.type === "blob" && item.gh.path.toLowerCase().match(/\.(png|jpe?g|svg|gif|webp)$/))
    .map(item => {
      return {
        ...item,
        // For now we only support root license, so we attach the license info to each image file. In the future, we could potentially resolve license for each file based on its path and the closest license file in its directory tree.
        // TODO: recursively check current and parent directories for license file, and resolve the most relevant one (i.e the closest one to the image file)
        license: rootLicense
      }
    })

  const scrapedResultFiles: ScrapedResultFiles = imageFiles.map(image => {
    const filename = image.gh.path.split("/").at(-1) ?? (() => {
      logerror(`Failed to resolve filename from path: ${ image.gh.path }`)
      return image.gh.path
    })()
    const extension = filename?.split(".").at(-1) ?? (() => {
      throw new Error(`Failed to resolve file extension from filename: ${ filename }`)
    })()
    const filenameWithoutExtension = filename.split(".").slice(0, -1).join(".")

    return {
      rawUrl: image.rawPageUrl,
      pageUrl: image.githubPageUrl,
      transformedPath: image.gh.path,
      license: image.license ? {
        contentUrl: image.license.rawPageUrl,
        referenceUrl: image.license.githubPageUrl,
      } : "unknown",
      filename,
      filenameWithoutExtension,
      extension,
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