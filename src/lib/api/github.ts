import { black } from "../ansii"
import { cacheEntry } from "../cache"
import { milisecondToHumanReadableComplete } from "../duration"
import { appfetch } from "../fetch"

async function githubFetch(url: string) {
  const res = await appfetch(url)
  const limit = res.headers.get("x-ratelimit-limit")
  const remaining = res.headers.get("x-ratelimit-remaining")
  const used = res.headers.get("x-ratelimit-used")
  const reset = new Date(Number(res.headers.get("x-ratelimit-reset")) * 1000)
  console.log(`- github rate limit info: ${ used }/${ limit } (${ remaining } remaining). resets at ${ milisecondToHumanReadableComplete(reset.getTime() - Date.now()) }`)
  return res
}

// 403 reate limit exceeded {"message":"API rate limit exceeded for 111.222.333.444. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)","documentation_url":"https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"}

// ------------------------------------------------------------------------------------

export function returnUndefinedIfError<T extends
  | Awaited<ReturnType<typeof fetchGithubRepoFiles>>
  | Awaited<ReturnType<typeof fetchGithubProfile>>
  | Awaited<ReturnType<typeof fetchGithubProfileSocialAccounts>>
>(res: T, opts?: {
  onError?: (res: T) => void
}) {
  if (res.status === "ok") return res.data as T[ "data" ]
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
  const cache = cacheEntry<GithubRepoFilesResponsePayload>("github-repo-files-" + repo, "1d")
  const cached = cache.get()
  if (cached) return { status: "ok" as const, data: cached.tree }

  const url = `https://api.github.com/repos/${ repo }/git/trees/main?recursive=1`
  const res = await githubFetch(url)
  const data = await res.json() as GithubRepoFilesResponsePayload

  if (res.status === 200) {
    cache.set(data)
    return { status: "ok" as const, data: data.tree } as const
  }
  if (res.status === 404) {
    cache.set(data, "1h")
    return { status: "not found" as const } as const
  }
  if (res.statusText === "rate limit exceeded") {
    cache.set(data, "5m")
    return { status: "rate limit exceeded" as const } as const
  }

  console.log(black, `Unexpected response from fetchGithubRepoFiles(${ repo }):`,
    res.status, res.statusText, data
  )
  return { status: "error" as const } as const
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
  if (cached) return { status: "ok" as const, data: cached } as const

  const url = `https://api.github.com/users/${ profile }`
  const res = await githubFetch(url)
  const data = await res.json() as GithubProfileResponsePayload

  if (res.status === 200) {
    cache.set(data)
    return { status: "ok" as const, data } as const
  }
  if (res.status === 404) {
    cache.set(data, "1h")
    return { status: "not found" as const } as const
  }
  if (res.statusText === "rate limit exceeded") {
    cache.set(data, "5m")
    return { status: "rate limit exceeded" as const } as const
  }

  console.log(black, `Unexpected response from fetchGithubProfile(${ profile }):`,
    res.status, res.statusText, data
  )
  return { status: "error" as const } as const
}


type GithubProfileSocialAccountsResponsePayload = {
  provider: "linkedin" | "twitter" | "youtube" | "generic" | (string & {}),
  url: string,
}[]

export async function fetchGithubProfileSocialAccounts(profile: string) {
  const cache = cacheEntry<GithubProfileSocialAccountsResponsePayload>("github-profile-social-accounts-" + profile, "1d")
  const cached = cache.get()
  if (cached) return { status: "ok" as const, data: cached } as const

  const url = `https://api.github.com/users/${ profile }/social_accounts`
  const res = await githubFetch(url)
  const data = await res.json() as GithubProfileSocialAccountsResponsePayload

  if (res.status === 200) {
    cache.set(data)
    return { status: "ok" as const, data } as const
  }
  if (res.status === 404) {
    cache.set(data, "1h")
    return { status: "not found" as const } as const
  }
  if (res.statusText === "rate limit exceeded") {
    cache.set(data, "5m")
    return { status: "rate limit exceeded" as const } as const
  }

  console.log(black, `Unexpected response from fetchGithubProfileSocialAccounts(${ profile }):`,
    res.status, res.statusText, data
  )
  return { status: "error" as const } as const
}