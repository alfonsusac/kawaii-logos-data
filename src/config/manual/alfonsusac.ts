import { GitHub } from "../../url-github"
import type { Entries } from "../../../types"

export const alfonsusac: Entries[number] = {
  handleName: "alfonsusac",
  pfp: "https://avatars.githubusercontent.com/alfonsusac",
  link: {
    github: "alfonsusac",
    twitter: "alfonsusac",
  },
  repository: "https://github.com/alfonsusac/kawaii-logos-data/tree/main",
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