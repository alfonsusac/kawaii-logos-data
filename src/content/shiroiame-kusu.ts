import type { AuthorDefinition } from "../resolve-author"

export const shiroiame_kusu: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/Shiroiame-Kusu/ProgrammingVTuberLogos-Windows",
    transform: [
      { type: "filter", include: "CC-BY-NC-SA-4.0.jpg" }
    ],
    applyCssStyle: {
      objectFit: "cover",
    },
    postProcess: [
      { type: "add entry createdAt", entryKey: "windows", createdAt: "Aug 28, 2024" },
    ],
  },
  // logVerbose: true
}