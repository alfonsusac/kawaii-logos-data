import { GitHub } from "../lib/url-github"
import type { AuthorDefinition } from "../resolve-author"

export const dsphng: AuthorDefinition = {
  displayName: "dsphng",
  socials: {
    x: "dsphng",
    bsky: "klfjlgjhjfkg.bsky.social"
  },
  entries: {
    skrillex: {
      label: "Skrillex",
      images: {
        src: { type: "self-hosted", filepath: "./assets/skrillexsticker.png" },
        reference: "https://drive.google.com/file/d/1mumHSFG6k8O1uKG29rYc9s0Wm_jQDSpP/view?usp=sharing",
        style: { objectFit: "contain" }
      }
    },
    porterrobinson: {
      label: "Porter Robinson",
      images: {
        src: { type: "self-hosted", filepath: "./assets/porterrobinsonsticker.png" },
        reference: "https://drive.google.com/file/d/19bMQzV2ZseW-pyV8NSjDyitiuyeJNJ1G/view?usp=sharing",
        style: { objectFit: "contain" }
      }
    },
    flstudio: {
      label: "FL Studio",
      images: {
        src: { type: "self-hosted", filepath: "./assets/flsticker.png" },
        reference: "https://drive.google.com/file/d/1wMi3TOs-egixz6wuf4NNJpMfzArMcZZ2/view?usp=sharing",
        style: { objectFit: "contain" }
      }
    },
    bitwigstudio: {
      label: "Bitwig Studio",
      images: {
        src: { type: "self-hosted", filepath: "./assets/bitwigsticker.png" },
        reference: "https://drive.google.com/file/d/1Dc5icFqOCOm_6qyZh1MxsFN4QtmI6RcH/view?usp=sharing",
        style: { objectFit: "contain" }
      }
    },
    abletonlive: {
      label: "Ableton Live",
      images: {
        src: { type: "self-hosted", filepath: "./assets/abletonsticker.png" },
        reference: "https://drive.google.com/file/d/1HkvgRiaexWQ2TssE2ZSatUsAm5ZhGLTh/view?usp=sharing",
        style: { objectFit: "contain" }
      }
    },
    logicpro: {
      label: "Logic Pro",
      images: {
        src: { type: "self-hosted", filepath: "./assets/logicsticker.png" },
        style: { objectFit: "cover" }
      }
    },
  }

}