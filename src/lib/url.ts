import type { Site } from "./site"

export const twitterPost = (username: string, postId: string) =>
  `https://twitter.com/${username}/status/${postId}` as Site

export const blueskyPost = (username: string, postId: string) =>
  `https://bsky.app/profile/${username}/post/${postId}` as Site