import type { AuthorDefinition } from "../resolve-author"

export const aikoyori: AuthorDefinition = {
  socials: {
    x: "Aikoyori",
    bsky: "aikoyori.xyz",
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