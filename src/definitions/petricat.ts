import type { AuthorDefinition } from "../resolve-author"

export const petricat: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/PetricaT/ProgrammingVTuberLogos-Addon",
    transform: [
      { type: "replace", from: "V1/", to: "V1-" },
      { type: "replace", from: "V2/", to: "V1-" },
      { type: "filter", exclude: "CC-BY-NC-SA-4.0.jpg" },
    ]
  },
  socials: {
    site: "https://petricat.github.io/PetricaT/",
  }
} 