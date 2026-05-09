import type { AuthorDefinition } from "../resolve-author"

export const ifalfahri: AuthorDefinition = {
  socials: {
    site: "https://ifalf.com/",
    dribbble: "https://dribbble.com/ifalfahri",
    behance: "https://www.behance.net/ifalfahri",
  },
  source: {
    from: "github",
    repo: "https://github.com/ifalfahri/VTuberStyleLogos",
    postProcess: [
      { type: "add entry createdAt", entryKey: "gsap", createdAt: "Feb 14, 2026" },
      { type: "add entry createdAt", entryKey: "webflow", createdAt: "Feb 14, 2026" },
    ]
  },
}