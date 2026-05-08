import type { AuthorDefinition } from "../resolve-author"

export const fumanama: AuthorDefinition = {
  displayName: "fuma-nama",
  socials: {
    github: 'https://github.com/fuma-nama',
    x: 'https://x.com/fuma_nama',
    site: "https://www.fuma-nama.dev/",
  },
  entries: {
    fumadocs: {
      label: "Fumadocs",
      images: [
        { src: "https://github.com/fuma-nama/fumadocs/blob/dev/documents/logo.png" }
      ]
    }
  },
  fundings: [
    { type: "github", url: "https://github.com/sponsors/fuma-nama" },
  ]
}