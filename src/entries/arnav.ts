import type { AuthorDef } from "../resolve/author"
import { GithubPage } from "../resolve/entries"

export const arnav: AuthorDef = {
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
      title: "JSON Formatter",
      images: [
        GithubPage("https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.png"),
        GithubPage("https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.svg")
      ],
    }
  }
}

