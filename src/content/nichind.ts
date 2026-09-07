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
        "official:https://awake.moe",
        "https://x.com/n1chind/status/2051017143362203786/photo/1",
      ]
    },
    'pawstash': {
      label: "Pawstash",
      images: [
        { src: "https://github.com/pawstash/pawstash/blob/main/assets/pawstash.png" },
      ],
      createdAt: "Sep 7, 2026",
      references: [
        "https://github.com/pawstash/pawstash"
      ],
      license: undefined,
    }
  }
}