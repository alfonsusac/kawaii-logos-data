import { fetchGithubProfile, fetchGithubProfileSocialAccounts, fetchGithubRawFile, fetchGithubRepoFiles, returnUndefinedIfError } from "./lib/api/github"
import { log, logerror, stepSimple } from "./pipeline"
import type { ScrapedResultFiles, SourceDef, SourceResult } from "./resolve-source"
import { resolveToLicenseTypeByContent, type LicenseDef } from "./resolve-license"
import { getGithubProfileURL, getGithubRepoLink, type SocialListDef } from "./resolve-socials"
import { site } from "./resolve-url"

type GithubSourceDef = SourceDef & { from: "github" }


export async function resolveGithubSource(def: GithubSourceDef): Promise<SourceResult> {
  const [ owner, repoName ] = def.repo.replaceAll('https://github.com/', '').split("/")

  log(`Link to Github Repo: ${ getGithubRepoLink(owner, repoName) }`)

  const { files, ghLicenseFile } = await stepSimple(
    "Resolving Github Repository",
    () => resolveGithubRepository(def)
  )


  return {
    files,
    socials: await stepSimple(
      "Resolving Github Profile",
      () => resolveGithubProfileSocialList(owner)
    ),
    scrapedReferenceUrl: site(`github.com/${ owner }/${ repoName }`)
  }
}

// ------------------------------------------------------------------------------------

async function resolveGithubRepository(def: GithubSourceDef) {

  const [ owner, repoName ] = def.repo.replaceAll('https://github.com/', '').split("/")
  const repo = `${ owner }/${ repoName }`

  const repoFiles = returnUndefinedIfError(await fetchGithubRepoFiles(def.repo), {
    onError: (res) => logerror(`Failed to fetch github repo files for ${ repo }: ${ res.status }`),
  })

  if (repoFiles === undefined) return {
    files: [],
  }

  const resolvedTree = repoFiles.tree.map(item => ({
    _gh: item,
    size: item.size,
    path: item.path,
    type: item.type,
    githubPageUrl: `https://github.com/${ repo }/blob/main/${ item.path }` as const,
    rawPageUrl: `https://raw.githubusercontent.com/${ repo }/main/${ item.path }` as const,
  }))

  // For now, we only resolve the root license file if it exists. 
  // In the future, we could potentially resolve all license files and their contents.

  // check if there are any files with "license" or "licence" in the name (case-insensitive)
  const licenseFiles = [ "license", "license.md", "license.txt", "licence", "licence.md", "licence.txt" ]
  const rootLicense = resolvedTree.find(item => licenseFiles.includes(item.path.toLowerCase()))
  log(`Licenses: ${ rootLicense?.githubPageUrl }`)

  const licenseDef = await (async (): Promise<LicenseDef> => {
    if (!rootLicense) return { type: "unknown" }

    const res = returnUndefinedIfError(await fetchGithubRawFile(rootLicense.rawPageUrl))
    if (!res) {
      logerror(`File exists on API but failed to get raw content for license file: ${ rootLicense.rawPageUrl }`)
      return { type: "unknown", reference: { site: rootLicense.githubPageUrl } }
    }

    const licenseType = resolveToLicenseTypeByContent(res)
    if (licenseType === "unknown") {
      logerror(`Failed to resolve license from content. `)
      logerror(`Please check the license content for any recognizable identifiers or consider adding support for this license.`)
      logerror(`in src/resolve/license.ts`)
      logerror(`link to raw content: ${ rootLicense.rawPageUrl }`)
      logerror(`link to github page: ${ rootLicense.githubPageUrl }`)
      return { type: "unknown", reference: { site: rootLicense.githubPageUrl } }
    }

    if (licenseType === "custom") {
      return { type: "custom", reference: { site: rootLicense.githubPageUrl }, href: rootLicense.githubPageUrl }
    }

    return {
      type: licenseType,
      reference: { site: rootLicense.githubPageUrl },
    }

  })()




  const scrapedResultFiles: ScrapedResultFiles = []

  for (const item of resolvedTree) {
    if (item.type === "tree") continue
    if (!item.path.toLowerCase().match(/\.(png|jpe?g|svg|gif|webp)$/)) continue

    // log(`Found file in repo: ${ item.path } (type: ${ item.type })`)

    const filename = item.path.split("/").at(-1)!
    const extension = filename.split(".").at(-1)!
    const filenameWithoutExtension = filename.split(".").slice(0, -1).join(".")

    scrapedResultFiles.push({
      rawUrl: item.rawPageUrl,
      pageUrl: item.githubPageUrl,
      transformedPath: item._gh.path,
      licenseDef,
      filename,
      filenameWithoutExtension,
      extension,
    })
  }

  return {
    files: scrapedResultFiles,
    ghLicenseFile: rootLicense
  }
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
  socialList.push({ label: "github", url: getGithubProfileURL(owner) })

  return socialList
}

// ------------------------------------------------------------------------------------
