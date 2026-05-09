import type { AuthorDefinition } from "../resolve-author"

export const cocoa_xu: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/cocoa-xu/ProgrammingVTuberLogos-BEAM",
    transform: [
      { type: "filter", include: "CC-BY-NC-SA-4.0.jpg" },
    ],
    postProcess: [
      // From commit history
      { type: "add entry createdAt", createdAt: "Apr 24, 2024", entryKey: "elixir", },
      { type: "add entry createdAt", createdAt: "Apr 24, 2024", entryKey: "gleam", },
    ]
  },
  fundings: {
    type: "github", url: "https://github.com/sponsors/cocoa-xu",
  },

  // logVerbose: true,
}