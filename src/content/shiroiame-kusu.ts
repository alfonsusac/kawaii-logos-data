import type { AuthorDefinition } from "../resolve-author"

export const shiroiame_kusu: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/Shiroiame-Kusu/ProgrammingVTuberLogos-Windows",
    transform: [
      { type: "filter", include: "CC-BY-NC-SA-4.0.jpg" }
    ],
    postProcess: [
      { type: "add entry createdAt", entryKey: "windows", createdAt: "Aug 28, 2024" },
      { type: "override image style", entryKey: "windows", imageIndex: 0, style: { objectFit: "cover" } },
    ],
  },
  // logVerbose: true
}