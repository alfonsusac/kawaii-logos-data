import type { AuthorDefinition } from "../resolve-author"

export const shiroiame_kusu: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/Shiroiame-Kusu/ProgrammingVTuberLogos-Windows",
    transform: [
      { type: "filter", exclude: "CC-BY-NC-SA-4.0.jpg" }
    ]
  }
}