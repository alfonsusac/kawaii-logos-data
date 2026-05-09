import type { AuthorDefinition } from "../resolve-author"

export const c29h25n3o5: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/C29H25N3O5/cute-logos",
    transform: [
      { type: "replace", from: "dist/", to: "" },
    ],
    postProcess: [
      // From commit history
      { type: "add entry createdAt", createdAt: "Jun 22, 2024", entryKey: "clion", },
      { type: "add entry createdAt", createdAt: "Jun 22, 2024", entryKey: "jetbrains-clion", },
    ]
  },

  // logVerbose: true,
}