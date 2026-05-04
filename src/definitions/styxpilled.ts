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
        reference: "https://twitter.com/styxpilled/status/1781565832251719868",
        style: { objectFit: "cover" }
      }
    },
    sveltekit: {
      label: "sveltekit",
      images: {
        src: { type: "self-hosted", filepath: "./assets/GLmrDPdXgAAlKvW.jpeg" },
        reference: "https://twitter.com/styxpilled/status/1781565832251719868",
        style: { objectFit: "cover" }
      }
    }
  }
}