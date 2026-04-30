import { logger } from "../../pipeline"
import { appFetch2 } from "../fetch-cache"
import { logerror } from "../log"

export let githubFetchesCount = 0

type GithubFetchReturnType<T> =
  | { status: "ok", payload: T }
  | { status: "not found", payload: any }
  | { status: "rate limit exceeded", payload: { message: string, documentation_url: string } }
  | { status: "error", payload: any }

async function githubFetch<T>(key: string, url: string): Promise<GithubFetchReturnType<T>> {

  githubFetchesCount++

  const res = await appFetch2(url, undefined, {
    cache: {
      key,
      duration: (res) => {
        if (res.status === 200) return "1d"
        if (res.status === 404) return "1h"
        if (res.statusText === "rate limit exceeded") return "1h"
        return "1h"
      },
    },
    ratelimit: (res) => {
      const limit = res.headers.get("x-ratelimit-limit")
      const used = res.headers.get("x-ratelimit-used")
      return {
        limit: Number(limit),
        used: Number(used),
        resetInSeconds: Number(res.headers.get("x-ratelimit-reset")) - Math.floor(Date.now() / 1000)
      }
    }
  })

  if (res.status === 200) {
    return { status: "ok", payload: res.payload }
  }
  if (res.status === 404) {
    return { status: "not found", payload: res.payload }
  }
  if (res.statusText === "rate limit exceeded") {
    return { status: "rate limit exceeded", payload: res.payload }
  }
  return { status: "error", payload: res.payload }
}

// ------------------------------------------------------------------------------------

export function returnUndefinedIfError<T>(res: GithubFetchReturnType<T>, opts?: {
  onError?: (res: GithubFetchReturnType<T>) => void
}) {
  if (res.status === "ok") return res.payload as T
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



// ------------------------------------------------------------------------------------

export async function fetchGithubRawFile(url: `https://raw.githubusercontent.com/${ string }/main/${ string }`)
  : Promise<GithubFetchReturnType<string>> {
  const res = await appFetch2(url, undefined, {
    payloadMode: "text",
    cache: {
      key: "github-raw-file-" + url,
      duration: "1d",
    },
  })
  if (!res.payload)
    return { status: "error", payload: null as string | null }
  if (res.status === 404)
    return { status: "not found", payload: null as string | null }
  if (res.status === 200)
    return { status: "ok", payload: res.payload as string }

  logerror("fetchGithubRawFile: Unexpected response, neither has no payload, 404, or 200.")
  return { status: "error", payload: null as string | null }
}