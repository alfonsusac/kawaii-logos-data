import { getProfile } from "../api/bsky"
import { site } from "./type"

export type SocialsDef = {
  github?: string,
  x?: string,
  bsky?: string,
  site?: string,
}

export type Socials = {
  github?: {
    username: string,
    avatar: string | undefined,
    url: string,
  },
  x?: {
    username: string,
    url: string,
  },
  bsky?: {
    username: string,
    url: string,
    avatar?: string,
  },
  site?: string
}

export async function resolveSocials(socials: SocialsDef | undefined) {
  if (!socials) return {}

  return {
    github: socials.github === undefined ? undefined : getGithubSocial(socials.github),
    x: socials.x === undefined ? undefined : {
      username: socials.x,
      profile: site(`x.com/${ socials.x }`),
    },
    bsky: socials.bsky === undefined ? undefined : {
      username: socials.bsky,
      profile: site(`bsky.app/${ socials.bsky }`),
      avatar: await getProfile(socials.bsky)
        .then(profile => profile.avatar)
        .catch(() => {
          console.warn(`Failed to fetch bsky profile for ${ socials.bsky }. Avatar will be undefined.`)
          return undefined
        }),
    }
  }
}

// --- Github

export function getGithubSocial(username: string): Socials[ 'github' ] {
  return {
    username,
    avatar: site(`avatars.githubusercontent.com/${ username }`),
    url: site(`github.com/${ username }`)
  }
}

// --- x/twitter

export function getTwitterSocialFromURL(url: string): Socials[ 'x' ] {
  const username = url.split("/").slice(-1)[ 0 ]
  return {
    username,
    url,
  }
}

// --- bsky

export async function getBskySocialFromURL(url: string): Promise<Socials[ 'bsky' ]> {
  const username = url.split("/").slice(-1)[ 0 ]
  return {
    username,
    url,
    avatar: await getProfile(username)
      .then(profile => profile.avatar)
      .catch(() => {
        console.warn(`Failed to fetch bsky profile for ${ username }. Avatar will be undefined.`)
        return undefined
      }),
  }
}