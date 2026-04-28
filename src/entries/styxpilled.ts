import { twitterPost } from "../lib/url"
import { GitHub } from "../lib/url-github"
import type { AuthorDefinition } from "../resolve/author"

export const styxpilled: AuthorDefinition = {
  displayName: "styxpilled",
  socials: {
    x: "styxpilled",
    bsky: "styxpilled.bsky.social"
  },
  entries: {
    svelte: {
      title: "svelte",
      images: {
        src: GitHub.selfHostedStaticAssetUrl("GLlkf9EWwAAq3N9.jpeg"),
        reference: twitterPost("styxpilled", "1781565832251719868"),
        style: { objectFit: "cover" }
      }
    },
    sveltekit: {
      title: "sveltekit",
      images: {
        src: GitHub.selfHostedStaticAssetUrl("GLmrDPdXgAAlKvW.jpeg"),
        reference: twitterPost("styxpilled", "1781643208130216015"),
        style: { objectFit: "cover" }
      }
    }
  }
}