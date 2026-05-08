import type { AuthorDefinition } from "../resolve-author"

export const andregans: AuthorDefinition = {
  socials: {
    behance: "https://www.behance.net/andrerio",
    figma: "https://www.figma.com/@hanzo",
  },
  source: {
    from: "github",
    repo: "https://github.com/andregans/code_logotype",
    licenseFallback: {
      type: "custom",
      href: "https://github.com/andregans/code_logotype#-programming-logotype--sticker",
    }
  },
  fundings: [
    { type: "ko-fi", url: "https://ko-fi.com/andrerio" },
    { type: "saweria", url: "https://saweria.co/andrerio"}
  ],
}