import type { AuthorDefinition } from "../resolve-author"

export const fumanama: AuthorDefinition = {
  displayName: "fuma-nama",
  socials: {
    github: "fuma-nama",
    x: "fuma_nama",
  },
  entries: {
    fumadocs: {
      label: "Fumadocs",
      images: [
        { src: { type: "github-blob", url: "https://github.com/fuma-nama/fumadocs/blob/dev/documents/logo.png" } }
      ]
    }
  }
}