import { type Author, type ObjectFit } from "../types"

export type RepositoryConfig = {
  repoPath: `${ string }/${ string }`
  author: Partial<Author>
  path?: string
  objectFit?: ObjectFit
  filter?: (filepath: string) => boolean,
  // add custom groupBy?
}

export const repositoryConfigs: RepositoryConfig[] = [
  {
    repoPath: "Crysta1221/tech_logos",
    objectFit: "contain",
    author: {
      handleName: "cr1sta_dev",
      pfp: "https://avatars.githubusercontent.com/u/70198466?v=4",
      link: {
        twitter: "cr1sta_dev",
      },
      license: {
        label: "Custom",
        href: "https://github.com/Crysta1221/tech_logos/blob/main/README.md#license",
      },
    },
  },
  {
    repoPath: "Aikoyori/ProgrammingVTuberLogos",
    objectFit: "contain",
    author: {
      link: {
        twitter: "Aikoyori",
      },
      license: {
        label: "CC BY-NC-SA 4.0",
        href: "https://github.com/Aikoyori/ProgrammingVTuberLogos/blob/main/LICENSE.md",
      },
    },
    filter: (filepath) => !filepath.includes('preview'),
  },
  {
    repoPath: 'SAWARATSUKI/ServiceLogos',
    objectFit: "contain",
    author: {
      link: {
        twitter: "sawaratsuki1004",
      },
      license: {
        label: "CC BY-NC-SA 4.0 with Additional Notes",
        href: "https://github.com/SAWARATSUKI/ServiceLogos#license",
      },
    },
  },
  {
    repoPath: "G2-Games/fun-logos",
    objectFit: "contain",
    author: {
      license: {
        label: "CC BY-NC-SA 4.0",
        href: "https://github.com/G2-Games/fun-logos/blob/main/LICENSE",
      },
    },
  },
  {
    repoPath: "mkpoli/VTuber-Styled-Logos",
    path: "logos",
    author: {
      link: {
        twitter: "mkpoli",
      },
      license: {
        label: "CC0",
        href: "https://github.com/mkpoli/VTuber-Styled-Logos/blob/main/LICENSE",
      },
    },
  },
]
