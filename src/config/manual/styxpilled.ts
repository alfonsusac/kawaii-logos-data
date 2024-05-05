import { GitHub } from "../../url-github"
import type { Data } from "../../types"
import { twitterPost } from "../../url"

export const styxpilled: Data[number] = {
  handleName: "styxpilled",
  link: {
    twitter: "styxpilled",
  },
  images: [
    {
      title: "svelte",
      imgSrc: GitHub.selfHostedStaticAssetUrl("GLlkf9EWwAAq3N9.jpeg"),
      source: twitterPost('styxpilled', '1781565832251719868') 
    },
    {
      title: "sveltekit",
      imgSrc: GitHub.selfHostedStaticAssetUrl("GLmrDPdXgAAlKvW.jpeg"),
      source: twitterPost('styxpilled', '1781643208130216015'),
    },
  ]
} 