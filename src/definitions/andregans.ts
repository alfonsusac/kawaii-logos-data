import type { AuthorDefinition } from "../resolve-author"

export const andregans: AuthorDefinition = {
  source: {
    from: "github",
    repo: "andregans/code_logotype",
    licenseFallback: {
      type: "custom",
      href: "https://github.com/andregans/code_logotype#-programming-logotype--sticker",
    }
  }
}