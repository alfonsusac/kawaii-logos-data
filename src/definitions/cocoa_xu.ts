import type { AuthorDefinition } from "../resolve-author"

export const cocoa_xu: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/cocoa-xu/ProgrammingVTuberLogos-BEAM",
    transform: [
      { type: "filter", exclude: "CC-BY-NC-SA-4.0.jpg" },
    ]
  },
  fundings: {
    type: "github", url: "https://github.com/sponsors/cocoa-xu",
  }
}