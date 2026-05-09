import type { AuthorDefinition } from "../resolve-author"

export const arnav: AuthorDefinition = {
  displayName: "arnav-kr",
  socials: {
    github: "https://github.com/arnav-kr",
    x: "https://x.com/arnavkr_",
    dribbble: "https://dribbble.com/arnav-kr",
    figma: "https://www.figma.com/@arnav-kr",
    site: "https://arnav.bio.link"
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
        { src: "https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.png" },
        { src: "https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.svg" }
      ],
      createdAt: "Dec 9, 2024",
    }
  },
  fundings: [
    { type: "buymeacoffee", url: "https://buymeacoffee.com/arnavkr" },
    { type: "patreon", url: "https://patreon.com/arnavkr" },
    { type: "ko-fi", url: "https://ko-fi.com/arnav" },
    { type: "github", url: "https://github.com/sponsors/arnav-kr" }
  ]
}

