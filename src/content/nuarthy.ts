import type { AuthorDefinition } from "../resolve-author"

export const nuarthy: AuthorDefinition = {
  socials: {
    x: "https://x.com/nuarthy",
    github: "https://github.com/akayanuarcandra",
    site: "https://nuarthy.my.id/",
  },
  entries: {
    'effectOrDie': {
      label: "Effect Or Die",
      images: [
        { src: "resolved:https://nuarthy  .my.id/works/effect.svg" },
      ],
      createdAt: "Jul 19, 2026",
      references: [
        "https://x.com/elianiva_/status/2095838679491317935",
        "https://x.com/elianiva_/status/2095864196802199961",
        "https://x.com/nuarthy/status/2095847695554687486",
      ]
    },
    'fedora': {
      label: "",
      images: [
        { src: "./assets/fedora.png" },
      ],
      createdAt: "Jan 1, 2024",
      references: [
        "https://x.com/nuarthy/status/2095864811985011047",
      ]
    }
  }
}