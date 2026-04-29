import { twitterPost } from "../lib/url"
import { GitHub } from "../lib/url-github"
import type { AuthorDefinition } from "../resolve-author"

export const styxpilled: AuthorDefinition = {
  displayName: "styxpilled",
  socials: {
    x: "styxpilled",
    bsky: "styxpilled.bsky.social"
  },
  entries: {
    svelte: {
      label: "svelte",
      images: {
        src: { type: "self-hosted", filepath: "./assets/GLlkf9EWwAAq3N9.jpeg" },
        reference: twitterPost("styxpilled", "1781565832251719868"),
        style: { objectFit: "cover" }
      }
    },
    sveltekit: {
      label: "sveltekit",
      images: {
        src: { type: "self-hosted", filepath: "./assets/GLmrDPdXgAAlKvW.jpeg" },
        reference: twitterPost("styxpilled", "1781643208130216015"),
        style: { objectFit: "cover" }
      }
    }
  }
}