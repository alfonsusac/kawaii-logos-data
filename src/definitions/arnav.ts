import type { AuthorDefinition } from "../resolve-author"

export const arnav: AuthorDefinition = {
  displayName: "arnav-kr",
  socials: {
    github: "arnav-kr",
    x: "arnavkr_"
  },
  license: {
    type: "MIT",
    // has_trademark: false,
    reference: "https://github.com/arnav-kr/json-formatter/blob/main/LICENSE"
  },
  entries: {
    "json-formatter": {
      label: "JSON Formatter",
      images: [
        { src: { type: "github-blob", url: "https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.png" } },
        { src: { type: "github-blob", url: "https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.svg" } }
      ],
    }
  }
}

