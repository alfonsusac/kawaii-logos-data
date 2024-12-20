import { type Author, type ObjectFit } from "../../types"
import { createLicense } from "./helper"

export type RepositoryConfig = {
  repoPath: `${ string }/${ string }`
  handleName?: Author['handleName']
  twitter?: Author['link']['twitter'],
  bluesky?: Author['link']['bluesky'],
  pfp?: Author['pfp']
  license?: Author['license']
  objectFit?: ObjectFit
  path?: string
  filter?: ((filepath: string) => boolean)[],
  preprocess?: ((filepath: string) => string)[],
}


export const repositoryConfigs: RepositoryConfig[] = [
  {
    repoPath: "Crysta1221/tech_logos",
    objectFit: "contain",
    handleName: "cr1sta_dev",
    pfp: "https://avatars.githubusercontent.com/u/70198466?v=4",
    twitter: "cr1sta_dev",
    license: createLicense("Custom", "https://github.com/Crysta1221/tech_logos/blob/main/README.md#license"),
  },
  {
    repoPath: "Aikoyori/ProgrammingVTuberLogos",
    objectFit: "contain",
    twitter: "Aikoyori",
    bluesky: "aikoyori.xyz",
    license: createLicense("CC BY-NC-SA 4.0", "https://github.com/Aikoyori/ProgrammingVTuberLogos/blob/main/LICENSE.md"),
    filter: [filepath => !filepath.includes("preview")]
  },
  {
    repoPath: "SAWARATSUKI/KawaiiLogos",
    objectFit: "contain",
    twitter: "sawaratsuki1004",
    bluesky: "sawaratsuki.bsky.social",
    license: createLicense('Custom', 'https://github.com/SAWARATSUKI/KawaiiLogos?tab=readme-ov-file#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9'),
    preprocess: [(filepath) => filepath.includes('ResponseCode') ? filepath.split('/')[1] : filepath]
  },
  {
    repoPath: "G2-Games/fun-logos",
    objectFit: "contain",
    license: createLicense("CC BY-NC-SA 4.0", "https://github.com/G2-Games/fun-logos/blob/main/LICENSE")
  },
  {
    repoPath: "mkpoli/VTuber-Styled-Logos",
    path: "logos",
    twitter: "mkpoli",
    bluesky: "mkpoli.misskey.io.ap.brid.gy",
    license: createLicense("CC0", "https://github.com/mkpoli/VTuber-Styled-Logos/blob/main/LICENSE")
  },
  {
    repoPath: "cocoa-xu/ProgrammingVTuberLogos-BEAM",
    twitter: "_uwu_cocoa",
    bluesky: "uwucocoa.moe",
    license: createLicense("CC BY-NC-SA 4.0", "https://github.com/cocoa-xu/ProgrammingVTuberLogos-BEAM/blob/main/LICENSE.md"),
    filter: [filepath => !filepath.includes("CC-BY-NC-SA-4.0.jpg")]
  },
  {
    repoPath: "andregans/code_logotype",
    license: createLicense("Custom", "https://github.com/andregans/code_logotype#-code-logotype"),
  },
  {
    repoPath: "syke9p3/Syke-VTuber-Icons",
    license: createLicense("CC BY-NC-SA 4.0", "https://github.com/syke9p3/Syke-VTuber-Icons/tree/main?tab=readme-ov-file#license"),
  },
  {
    repoPath: "lDMDiamondl/ProgrammingVTuberLogosKR",
    twitter: "dmdiamond1234",
    license: createLicense("CC BY-NC-SA 4.0", "https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR/blob/main/LICENSE.md")
  }
]



