import type { AuthorDefinition } from "../resolve-author"

export const mkpoli: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/mkpoli/VTuber-Styled-Logos",
    transform: [
      { type: "replace", from: "logos/", to: "" }
    ],
    postProcess: [
      { type: "add entry createdAt", entryKey: "svelte", createdAt: "Apr 27, 2024" },
    ]
  },
  fundings: {
    type: "ko-fi",
    url: "https://ko-fi.com/mkpoli"
  },
}