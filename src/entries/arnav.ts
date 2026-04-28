import type { AuthorDefinition } from "../resolve-author"
import { GithubPage } from "../resolve/entries"

export const arnav: AuthorDefinition = {
  displayName: "arnav-kr",
  socials: {
    github: "arnav-kr",
    x: "arnavkr_"
  },
  license: {
    type: "MIT",
    has_trademark: false,
    reference: "https://github.com/arnav-kr/json-formatter/blob/main/LICENSE"
  },
  entries: {
    "json-formatter": {
      label: "JSON Formatter",
      images: [
        GithubPage("https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.png"),
        GithubPage("https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.svg")
      ],
    }
  }
}

