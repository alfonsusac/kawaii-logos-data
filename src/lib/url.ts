export const twitterPost = (username: string, postId: string) =>
  `https://twitter.com/${username}/status/${postId}`

export const blueskyPost = (username: string, postId: string) =>
  `https://bsky.app/profile/${username}/post/${postId}`