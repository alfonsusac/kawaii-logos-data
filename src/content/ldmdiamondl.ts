import type { AuthorDefinition } from "../resolve-author"

export const ldmdiamondl: AuthorDefinition = {
  socials: {
    x: "https://x.com/dmdiamond1234",
  },
  source: {
    from: "github",
    repo: "https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR",
    postProcess: [
      { type: "add entry createdAt", entryKey: "vscode", createdAt: "Apr 20, 2024" },
      { type: "add entry createdAt", entryKey: "neovim", createdAt: "Apr 29, 2024" },
      { type: "add entry createdAt", entryKey: "docker", createdAt: "May 13, 2024" },
    ]
  },
}