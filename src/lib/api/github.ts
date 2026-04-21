import { black } from "../ansii"
import { cacheEntry } from "../cache"
import { appfetch } from "../fetch"

async function githubFetch(url: string) {
  const res = await appfetch(url)
  const limit = res.headers.get("x-ratelimit-limit")
  const remaining = res.headers.get("x-ratelimit-remaining")
  const used = res.headers.get("x-ratelimit-used")
  const reset = new Date(Number(res.headers.get("x-ratelimit-reset")) * 1000)
  console.log(`- github rate limit info: ${used}/${limit} (${remaining} remaining). resets at ${ reset.getTime() - Date.now() } seconds`)
  if (!res.ok) {
    console.warn("Failed to fetch from github", res.status, res.statusText)
    console.log(black, url)
    return undefined // Maybe throw for reusability?
  }
  return res
}



type GithubRepoFilesResponsePayload = {
  sha: string,
  url: `https://api.github.com/repos/${ string }/${ string }/git/trees/${ string }`,
  tree: {
    path: string,
    mode: string,
    type: "blob" | "tree" | (string & {}),
    sha: string,
    size: number,
    url: `https://api.github.com/repos/${ string }/${ string }/git/blobs/${ string }`
  }[],
  truncated: boolean,
}

export async function fetchGithubRepoFiles(repo: string) {
  const cache = cacheEntry<GithubRepoFilesResponsePayload>("github-repo-files-" + repo, "1d")
  const cached = cache.get()
  if (cached) return cached.tree

  const url = `https://api.github.com/repos/${ repo }/git/trees/main?recursive=1`
  const res = await githubFetch(url)
  if (!res) return undefined // Maybe throw for reusability?
  const data = await res.json() as GithubRepoFilesResponsePayload
  
  cache.set(data)
  return data.tree
}


type GithubProfileResponsePayload = {
  login: string,
  id: number,
  avatar_url: string,
  html_url: string,
  name: string | null,
  company: string | null,
  blog: string | null,
  location: string | null,
  email: string | null,
  bio: string | null,
  twitter_username?: string | null
}

export async function fetchGithubProfile(profile: string) {
  const cache = cacheEntry<GithubProfileResponsePayload>("github-profile-" + profile, "1d")
  const cached = cache.get()
  if (cached) return cached

  const url = `https://api.github.com/users/${ profile }`
  const res = await githubFetch(url)
  if (!res) return undefined // Maybe throw for reusability?
  const data = await res.json() as GithubProfileResponsePayload

  cache.set(data)
  return data
}


type GithubProfileSocialAccountsResponsePayload = {
  provider: "linkedin" | "twitter" | "youtube" | "generic" | (string & {}),
  url: string,
}[]

export async function fetchGithubProfileSocialAccounts(profile: string) {
  const cache = cacheEntry<GithubProfileSocialAccountsResponsePayload>("github-profile-social-accounts-" + profile, "1d")
  const cached = cache.get()
  if (cached) return cached

  const url = `https://api.github.com/users/${ profile }/social_accounts`
  const res = await githubFetch(url)
  if (!res) return undefined // Maybe throw for reusability?
  const data = await res.json() as GithubProfileSocialAccountsResponsePayload

  cache.set(data)
  return data
}