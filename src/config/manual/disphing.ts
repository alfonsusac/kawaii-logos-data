import { GitHub } from "../../lib/url-github"
import type { Entries } from "../../../types"

export const disphing: Entries[number] = {
  handleName: "disphing",
  pfp: "https://avatars.githubusercontent.com/u/70198466?v=4",
  link: {
    twitter: "dsphng",
    bluesky: "disphing.com"
  },
  repository: "https://drive.google.com/drive/folders/1Hy1_pAWx95QTv1nZFKUl96GImq4iKdf8",
  images: [
    {
      title: "Skrillex",
      imgSrc: GitHub.selfHostedStaticAssetUrl("skrillexsticker.png"),
      source: "https://drive.google.com/file/d/1mumHSFG6k8O1uKG29rYc9s0Wm_jQDSpP/view?usp=sharing",
      objectFit: "contain",
    },
    {
      title: "Porter Robinson",
      imgSrc: GitHub.selfHostedStaticAssetUrl("porterrobinsonsticker.png"),
      source: "https://drive.google.com/file/d/19bMQzV2ZseW-pyV8NSjDyitiuyeJNJ1G/view?usp=sharing",
      objectFit: "contain",
    },
    {
      title: "FL Studio",
      imgSrc: GitHub.selfHostedStaticAssetUrl("flsticker.png"),
      source: "https://drive.google.com/file/d/1wMi3TOs-egixz6wuf4NNJpMfzArMcZZ2/view?usp=sharing",
      objectFit: "contain",
    },
    {
      title: "Bitwig Studio",
      imgSrc: GitHub.selfHostedStaticAssetUrl("bitwigsticker.png"),
      source: "https://drive.google.com/file/d/1Dc5icFqOCOm_6qyZh1MxsFN4QtmI6RcH/view?usp=sharing",
      objectFit: "contain",
    },
    {
      title: "Ableton Live",
      imgSrc: GitHub.selfHostedStaticAssetUrl("abletonsticker.png"),
      source: "https://drive.google.com/file/d/1HkvgRiaexWQ2TssE2ZSatUsAm5ZhGLTh/view?usp=sharing",
      objectFit: "contain",
    },
    {
      title: "Logic Pro",
      imgSrc: GitHub.selfHostedStaticAssetUrl("GLm7MOob0AAimzf.jpeg"),
      objectFit: "cover",
      source: "" // TODO: get twitter post
    },
  ]
}