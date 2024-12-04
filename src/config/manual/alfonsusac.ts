import { GitHub } from "../../lib/url-github"
import type { Entry } from "../../../types"

export const alfonsusac: Entry = {
  handleName: "alfonsusac",
  pfp: "https://avatars.githubusercontent.com/alfonsusac",
  link: {
    github: "alfonsusac",
    twitter: "alfonsusac",
    bluesky: "alfonsus.bsky.social"
  },
  repository: "https://github.com/alfonsusac/kawaii-logos-data",
  license: {
    label: "CC BY-NC-SA 4.0",
    href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
  images: [
    {
      title: "Skill Issue",
      imgSrc: GitHub.selfHostedStaticAssetUrl("alfon/skillissue.svg"),
      source:
        "https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/alfon/skillissue.svg",
    },
    {
      title: "LGTM",
      imgSrc: GitHub.selfHostedStaticAssetUrl("alfon/lgtm.png"),
      source:
        "https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/alfon/lgtm.png",
    },
    {
      title: "Supabase",
      imgSrc: GitHub.selfHostedStaticAssetUrl("alfon/supabase.svg"),
      source:
        "https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/alfon/supabase.svg",
    },
    {
      title: "EmailThing",
      imgSrc: GitHub.selfHostedStaticAssetUrl("alfon/emailthing.svg"),
      source:
        "https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/alfon/emailthing.svg",
    },
    {
      title: "Sharkchat",
      imgSrc: GitHub.selfHostedStaticAssetUrl("alfon/sharkchat.svg"),
      source:
        "https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/alfon/sharkchat.svg",
    }
  ],
}