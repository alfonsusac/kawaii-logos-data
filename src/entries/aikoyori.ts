import type { AuthorDefinition } from "../resolve-author"

export const aikoyori: AuthorDefinition = {
  socials: {
    x: "Aikoyori",
    bsky: "aikoyori.xyz",
  },
  source: {
    from: "github",
    repo: "Aikoyori/ProgrammingVTuberLogos",
    transform: { type: "filter", exclude: "preview" }, 
  }
}