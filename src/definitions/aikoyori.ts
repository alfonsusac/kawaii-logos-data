import type { AuthorDefinition } from "../resolve-author"

export const aikoyori: AuthorDefinition = {
  socials: {
    x: 'https://x.com/Aikoyori',
    bsky: 'https://bsky.app/profile/aikoyori.xyz',
  },
  source: {
    from: "github",
    repo: "https://github.com/Aikoyori/ProgrammingVTuberLogos",
    transform: { type: "filter", exclude: "preview" },
  },
  fundings: [
    { type: "ko-fi", url: "https://ko-fi.com/aikoyori" }
  ]
}