import type { AuthorDefinition } from "../resolve-author"

export const anwar_achilles: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/AnwarAchilles/VTuber-Style-Logos",
    transform: [
      // { type: "replace", from: "-new/", to: "/new-"}
    ],
    applyCssStyle: {
      objectFit: "cover",
    },
    postProcess: [
      // From commit history
      { type: "add entry createdAt", createdAt: "Oct 6, 2024", entryKey: "php", },
      { type: "add entry createdAt", createdAt: "Oct 6, 2024", entryKey: "codeigniter", },
      { type: "add entry createdAt", createdAt: "Oct 7, 2024", entryKey: "nestjs", },
      { type: "add entry createdAt", createdAt: "Oct 8, 2024", entryKey: "php-new", },
      { type: "add entry createdAt", createdAt: "Sep 18, 2024", entryKey: "rune", },
    ],
  },

  // logVerbose: true,
}