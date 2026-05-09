import type { AuthorDefinition } from "../resolve-author"

export const g2_games: AuthorDefinition = {
  socials: {
    site: "https://g2games.dev",
  },
  source: {
    from: "github",
    repo: "https://github.com/G2-Games/fun-logos",
    postProcess: [
      { type: "add entry createdAt", entryKey: "kate", createdAt: "Apr 19, 2024" },
    ]
  },
  fundings: [
    { type: "ko-fi", url: "https://ko-fi.com/S6S5X3LJR" },
    { type: "github", url: "https://github.com/sponsors/G2-Games" },
  ],
  // logVerbose: true,
}