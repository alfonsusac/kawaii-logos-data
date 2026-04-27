import { appfetch } from "../fetch"

// getProfile()
// Reference: https://docs.bsky.app/docs/api/app-bsky-actor-get-profile
export async function getBskyProfile(id: string) {
  const url = `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${ id }`
  const res = await appfetch(url)
  const json = await res.json()
  // if (!res.ok) throw new Error(`Failed to fetch profile for ${ id }: ${ res.status } ${ json.error }: ${ json.message } `)
  return json as {
    error: undefined,
    did: string,
    handle: string,
    displayName?: string,
    description?: string,
    avatar?: string,
    createdAt?: string,
    followersCount?: number,
    followsCount?: number,
    postsCount?: number,
  } | { error: "InvalidRequest", message: "Profile not found" }
}


//