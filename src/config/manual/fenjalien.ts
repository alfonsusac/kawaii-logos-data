import type { Entries } from "../../../types"
import { createLicense } from "../helper"

export const fenjalien: Entries[number] = {
  handleName: "fenjalien",
  pfp: "https://avatars.githubusercontent.com/u/34489450?v=4",
  link: {
    github: "fenjalien",
  },
  images: [
    {
      title: "Typst",
      imgSrc: "https://gist.githubusercontent.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3/raw/2d5079562396d43e615cf0ffe81da60438b184c9/typst-logo.png",
      source: "https://gist.github.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3",
    },
  ],
  license: createLicense(`Personal Use (Custom)`, `https://gist.github.com/fenjalien/1463a19ba2b91d061ed35e295494e0b3`)
} 