import type { AuthorDefinition } from "../resolve-author"

export const styxpilled: AuthorDefinition = {
  displayName: "styxpilled",
  socials: {
    x: "https://x.com/styxpilled",
    bsky: "https://bsky.app/profile/styxpilled.bsky.social"
  },
  entries: {
    svelte: {
      label: "svelte",
      images: {
        src: "./assets/GLlkf9EWwAAq3N9.jpeg",
        references: "https://twitter.com/styxpilled/status/1781565832251719868",
        style: { objectFit: "cover" }
      }
    },
    sveltekit: {
      label: "sveltekit",
      images: {
        src: "./assets/GLmrDPdXgAAlKvW.jpeg",
        references: "https://twitter.com/styxpilled/status/1781565832251719868",
        style: { objectFit: "cover" }
      }
    }
  }
}