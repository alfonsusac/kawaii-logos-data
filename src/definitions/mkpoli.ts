import type { AuthorDefinition } from "../resolve-author"

export const mkpoli: AuthorDefinition = {
  source: {
    from: "github",
    repo: "https://github.com/mkpoli/VTuber-Styled-Logos",
    transform: [
      { type: "replace", from: "logos/", to: "" }
    ]
  },
  fundings: {
    type: "ko-fi",
    url: "https://ko-fi.com/mkpoli"
  }
}