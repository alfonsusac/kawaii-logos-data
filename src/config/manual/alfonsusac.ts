import { GitHub } from "../../lib/url-github"
import type { Entry } from "../../../types"

export const alfonsusac: Entry = {
  handleName: "alfonsusac",
  pfp: "https://avatars.githubusercontent.com/alfonsusac",
  link: {
    github: "alfonsusac",
    twitter: "alfonsusac",
  },
  repository: "https://github.com/alfonsusac/kawaii-logos-data",
  license: {
    label: "CC BY-NC-SA 4.0",
    href: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  },
  images: [
    {
      title: "Skill Issue",
      imgSrc: GitHub.selfHostedStaticAssetUrl("skillissue.svg"),
      source: 'https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/skillissue.svg',
    },
    {
      title: "LGTM",
      imgSrc: GitHub.selfHostedStaticAssetUrl("lgtm.png"),
      source: 'https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/lgtm.png'
    }
  ]
}