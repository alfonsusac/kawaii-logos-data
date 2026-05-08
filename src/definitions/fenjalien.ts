import type { AuthorDefinition } from "../resolve-author"

export const fenjalien: AuthorDefinition = {
  displayName: "fenjalien",
  socials: {
    github: 'https://github.com/fenjalien',
  },
  entries: {
    typst: {
      label: "Typst",
      images: [
        { src: "https://gist.githubusercontent.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3/raw/2d5079562396d43e615cf0ffe81da60438b184c9/typst-logo.png" },
        { src: "https://gist.githubusercontent.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3/raw/2d5079562396d43e615cf0ffe81da60438b184c9/typst-logo.svg" }
      ]
    }
  },
  license: {
    type: "custom",
    // label: "Personal Use (Custom)",
    href: "https://gist.github.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3",
    // has_trademark: false,
    reference: "https://gist.github.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3"
  },
  fundings: {
    type: "github",
    url: "https://github.com/sponsors/fenjalien",
  }
}