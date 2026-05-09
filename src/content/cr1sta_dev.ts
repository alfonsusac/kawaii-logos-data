import type { AuthorDefinition } from "../resolve-author"

export const cr1sta_dev: AuthorDefinition = {
  socials: {
    x: 'https://x.com/cr1sta_dev',
  },
  license: {
    type: "MIT",
    reference: "https://github.com/Crysta1221/tech_logos/blob/main/LICENSE",
  },
  source: {
    from: "github",
    repo: "https://github.com/Crysta1221/tech_logos",
    postProcess: [
      // From commit history
      { type: "add entry createdAt", createdAt: "Apr 22, 2024", entryKey: "svelte", },
      { type: "add entry createdAt", createdAt: "Apr 22, 2024", entryKey: "react", },
      { type: "add entry createdAt", createdAt: "Apr 22, 2024", entryKey: "nuxtjs", },
      { type: "add entry createdAt", createdAt: "Apr 23, 2024", entryKey: "rubyonrails", },
    ]
  },
  fundings: [
    { type: "ko-fi", url: "https://ko-fi.com/J3J0152VNW" },
    { type: "github", url: "https://github.com/sponsors/Crysta1221" }
  ],

  // logVerbose: true,
}