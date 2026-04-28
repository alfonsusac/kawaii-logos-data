import { logger } from "../../pipeline"
import { appFetch2 } from "../fetch-cache"

export let githubFetchesCount = 0

type GithubFetchReturnType<T> =
  | { status: "ok", json: T }
  | { status: "not found", json: any }
  | { status: "rate limit exceeded", json: { message: string, documentation_url: string } }
  | { status: "error", json: any }

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
    return { status: "ok", json: res.json }
  }
  if (res.status === 404) {
    return { status: "not found", json: res.json }
  }
  if (res.statusText === "rate limit exceeded") {
    return { status: "rate limit exceeded", json: res.json }
  }
  return { status: "error", json: res.json }
}

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