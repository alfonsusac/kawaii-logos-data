import type { AuthorDefinition } from "../resolve-author"

export const nichind: AuthorDefinition = {
  socials: {
    x: "https://x.com/n1chind",
    github: "https://github.com/nichind",
    site: "https://nichind.dev",
  },
  entries: {
    'awake.moe': {
      label: "Awake.moe",
      images: [
        { src: "./assets/awake.png" },
        // Using direct link has CORS issues, so we have to self-host it.
        // { src: "resolved:uwu:https://awake.moe/awake.png" },
      ],
      createdAt: "May 4, 2024",
      references: [
        "uwu:https://awake.moe",
        "https://x.com/n1chind/status/2051017143362203786/photo/1",
      ]
    }
  }
}