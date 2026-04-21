import type { AuthorDef } from "../lib/model/author"
import { GithubPage } from "../lib/model/entries"

export const arnav: AuthorDef = {
  displayName: "arnav-kr",
  pfp: "https://avatars.githubusercontent.com/arnav-kr",
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
      ...GithubPage("https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.png"),
      images: [
        GithubPage("https://github.com/arnav-kr/json-formatter/blob/main/images/banners/JF_VTuber_logo.svg")
      ],
    }
  }
}

