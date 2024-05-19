import { GitHub } from "../../lib/url-github"
import type { Entries } from "../../../types"
import { twitterPost } from "../../lib/url"

export const styxpilled: Entries[number] = {
  handleName: "styxpilled",
  link: {
    twitter: "styxpilled",
  },
  images: [
    {
      title: "svelte",
      imgSrc: GitHub.selfHostedStaticAssetUrl("GLlkf9EWwAAq3N9.jpeg"),
      source: twitterPost("styxpilled", "1781565832251719868"),
      objectFit: "cover",
    },
    {
      title: "sveltekit",
      imgSrc: GitHub.selfHostedStaticAssetUrl("GLmrDPdXgAAlKvW.jpeg"),
      source: twitterPost("styxpilled", "1781643208130216015"),
      objectFit: "cover",
    },
  ],
}
