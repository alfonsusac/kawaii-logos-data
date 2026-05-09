import type { AuthorDefinition } from "../resolve-author"

export const petricat: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/PetricaT/ProgrammingVTuberLogos-Addon",
    transform: [
      { type: "replace", from: "V1/", to: "V1-" },
      { type: "replace", from: "V2/", to: "V1-" },
      { type: "filter", exclude: "CC-BY-NC-SA-4.0.jpg" },
    ],
    postProcess: [
      { type: "add entry createdAt", entryKey: "tidersky", createdAt: "Nov 21, 2025" },
      { type: "add entry reference", entryKey: "tidersky", reference: "https://github.com/PetricaT/ProgrammingVTuberLogos-Addon/tree/main/Tidersky" },
      
      { type: "add entry createdAt", entryKey: "papermc", createdAt: "May 18, 2024" },
      { type: "add entry createdAt", entryKey: "nordvangfilms", createdAt: "May 18, 2024" },
      { type: "add entry createdAt", entryKey: "neovim", createdAt: "Apr 19, 2024" },
      
      { type: "add entry createdAt", entryKey: "hitszopenauto", createdAt: "Apr 24, 2024" },
      { type: "add entry reference", entryKey: "hitszopenauto", reference: "https://github.com/PetricaT/ProgrammingVTuberLogos-Addon/tree/main/HITSZOpenAuto" },
      
      { type: "add entry createdAt", entryKey: "determinant", createdAt: "May 10, 2024" },
      { type: "add entry reference", entryKey: "determinant", reference: "https://github.com/PetricaT/ProgrammingVTuberLogos-Addon/tree/main/Determinant" },
    ]
  },
  socials: {
    site: "https://petricat.github.io/PetricaT/",
  },
} 