import type { AuthorDefinition } from "../resolve-author"

export const paige: AuthorDefinition = {
  displayName: "paige",
  socials: {
    github: "https://github.com/ssalggnikool",
    site: "https://paige.moe/",
  },
  entries: {
    vencordmini: {
      label: "Vencord Mini",
      images: [
        { src: "https://github.com/Vencord/vencord.dev/blob/main/public/assets/logo-nav.webp" },
        { src: "https://github.com/Vencord/vencord.dev/blob/main/public/assets/logo-nav.avif" },
      ],
      createdAt: "Jul 8, 2025",
      references: [
        "official:https://vencord.dev/",
        "contributor:https://paige.moe/"
      ]
    }
  }
}