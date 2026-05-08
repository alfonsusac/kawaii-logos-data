import type { AuthorDefinition } from "../resolve-author"

export const saltyaom: AuthorDefinition = {
  displayName: "saltyaom",
  socials: {
    github: "https://github.com/SaltyAom",
    x: "https://x.com/saltyaom",
    bsky: "https://bsky.app/profile/saltyaom.com",
    site: "https://saltyaom.com",
  },
  entries: {
    elysia: {
      label: "Elysia",
      images: [
        { src: "https://github.com/elysiajs/documentation/blob/main/docs/public/assets/elysia_v.svg" }
      ]
    }
  },
  fundings: [
    { type: "github", url: "https://github.com/sponsors/SaltyAom" }
  ]
}