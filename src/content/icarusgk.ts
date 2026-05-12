import type { AuthorDefinition } from "../resolve-author"

export const icarusgk: AuthorDefinition = {
  socials: {
    bsky: "https://bsky.app/profile/icarusgk.com",
  },
  source: {
    from: "github",
    repo: "https://github.com/icarusgk/kawaii-tech-logos",
    licenseFallback: {
      type: "CC BY-NC-SA 4.0",
      reference: "https://github.com/icarusgk/kawaii-tech-logos#license",
    },
    postProcess: [
      // from commit history
      { type: "add entry createdAt", entryKey: "nuxt", createdAt: "May 16, 2024" },
      { type: "add entry createdAt", entryKey: "oxc", createdAt: "May 16, 2024" },
      { type: "add entry createdAt", entryKey: "rolldown", createdAt: "May 16, 2024" },
      { type: "add entry createdAt", entryKey: "vite", createdAt: "May 16, 2024" },
      { type: "add entry createdAt", entryKey: "vue", createdAt: "May 16, 2024" },

      { type: "add entry createdAt", entryKey: "vue", createdAt: "Apr 19, 2024" },
      { type: "add entry reference", entryKey: "vue", reference: "https://x.com/icarusgkx/status/1781058139552420114/photo/1" },
      { type: "add entry reference", entryKey: "vue", reference: "uwu:https://vuejs.org/?uwu" },

      // Pinia (missing src)
      { type: "add entry createdAt", entryKey: "pinia", createdAt: "Apr 20, 2024" },
      { type: "add entry reference", entryKey: "pinia", reference: "https://x.com/icarusgkx/status/1781439427786514628/photo/1" },

      // nuxt
      { type: "add entry createdAt", entryKey: "nuxt", createdAt: "May 11, 2024" },
      { type: "add entry reference", entryKey: "nuxt", reference: "https://x.com/icarusgkx/status/1788995457428971753/photo/1" },
      { type: "add entry reference", entryKey: "nuxt", reference: "https://github.com/nuxt/nuxt.com/pull/1581" },
      { type: "add entry reference", entryKey: "nuxt", reference: "https://x.com/TheAlexLichter/status/1791453271267082625" },


      // Laravel (missing src)
      { type: "add entry createdAt", entryKey: "laravel", createdAt: "May 18, 2024" },
      { type: "add entry reference", entryKey: "laravel", reference: "https://x.com/icarusgkx/status/1791824308500910489/photo/1" },

    ]
  },
  // logVerbose: true,
} 