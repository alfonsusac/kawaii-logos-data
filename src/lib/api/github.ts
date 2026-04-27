import { verbose } from "../../pipeline"
import { black } from "../ansii"
import { cacheEntry } from "../cache"
import { milisecondToHumanReadableComplete } from "../duration"
import { appfetch } from "../fetch"

export let githubFetchesCount = 0

type GithubFetchReturnType<T> =
  | { status: "ok", json: T }
  | { status: "not found", json: any }
  | { status: "rate limit exceeded", json: { message: string, documentation_url: string } }
  | { status: "error", json: any }

async function githubFetch<T>(key: string, url: string): Promise<GithubFetchReturnType<T>> {
  githubFetchesCount++

  const cache = cacheEntry<any>(key, "1d")
  const cached = cache.get()
  if (cached) {
    return { ...cached, cached: true }
  }

  const res = await appfetch(url)
  const json = await res.json()

  const limit = res.headers.get("x-ratelimit-limit")
  const remaining = res.headers.get("x-ratelimit-remaining")
  const used = res.headers.get("x-ratelimit-used")
  const reset = new Date(Number(res.headers.get("x-ratelimit-reset")) * 1000)
  verbose(`   - github rate limit info: ${ used }/${ limit } (${ remaining } remaining). resets at ${ milisecondToHumanReadableComplete(reset.getTime() - Date.now()) }. url: ${ url }`)

  if (res.status === 200) {
    const response = { status: "ok" as const, json, cached: false } as const
    cache.set(response)
    return response
  }

  if (res.status === 404) {
    const response = { status: "not found" as const, json, cached: false } as const
    cache.set(response, "1h")
    return response
  }

  if (res.status === 403 && res.statusText === "rate limit exceeded") {
    const response = { status: "rate limit exceeded" as const, json, cached: false } as const
    cache.set(response, "1h")
    return response
  }

  const response = { status: "error" as const, json, cached: false } as const
  console.log(black, `Unexpected response from githubFetch(${ url }):`,
    res.status, res.statusText, json
  )
  return response
}

// 403 reate limit exceeded {"message":"API rate limit exceeded for 111.222.333.444. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)","documentation_url":"https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"}

// ------------------------------------------------------------------------------------

export function returnUndefinedIfError<T>(res: GithubFetchReturnType<T>, opts?: {
  onError?: (res: GithubFetchReturnType<T>) => void
}) {
  if (res.status === "ok") return res.json as T
  opts?.onError?.(res)
  return undefined
}

// ------------------------------------------------------------------------------------

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

export async function fetchGithubRepoFiles(repo: `${ string }/${ string }`) {
  const res = await githubFetch<GithubRepoFilesResponsePayload>(
    "github-repo-files-" + repo,
    `https://api.github.com/repos/${ repo }/git/trees/main?recursive=1`
  )
  return res
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
  return await githubFetch<GithubProfileResponsePayload>(
    "github-profile-" + profile,
    `https://api.github.com/users/${ profile }`
  )
}




type GithubProfileSocialAccountsResponsePayload = {
  provider: "linkedin" | "twitter" | "youtube" | "generic" | (string & {}),
  url: string,
}[]

export async function fetchGithubProfileSocialAccounts(profile: string) {
  return await githubFetch<GithubProfileSocialAccountsResponsePayload>(
    "github-profile-social-accounts-" + profile,
    `https://api.github.com/users/${ profile }/social_accounts`
  )
}