import type { AuthorDefinition } from "../resolve-author"

export const mkpoli: AuthorDefinition = {
  source: {
    from: "github",
    repo: "mkpoli/VTuber-Styled-Logos",
    transform: [
      { type: "replace", from: "logos/", to: ""}
    ]
  }
}