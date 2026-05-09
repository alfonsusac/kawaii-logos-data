import type { AuthorDefinition } from "../resolve-author"

export const syke9p3: AuthorDefinition = {
  socials: {
    site: "https://syke9p3.netlify.app",
  },
  source: {
    from: "github",
    repo: "https://github.com/syke9p3/Syke-VTuber-Icons",
    postProcess: [
      { type: "add entry createdAt", entryKey: "linux-mint", createdAt: "May 24, 2024" },
      { type: "add entry createdAt", entryKey: "springboot", createdAt: "May 26, 2024" },
      { type: "add entry createdAt", entryKey: "pytorch", createdAt: "May 26, 2024" },
      { type: "add entry createdAt", entryKey: "keep-notes", createdAt: "May 29, 2024" },
      { type: "add entry createdAt", entryKey: "obsidian", createdAt: "Jun 3, 2024" },
      { type: "add entry createdAt", entryKey: "google-chrome", createdAt: "Jun 15, 2024" },
    ]
  },
  // logVerbose: true,
}