import type { AuthorDef } from "../lib/model/author"

export const aikoyori: AuthorDef = {
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