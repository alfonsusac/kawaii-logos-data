import { GitHub } from "./url-github"

export type AuthorSource = {
  handleName: string,
  pfp?: string,
  socials: {
    github?: string,
    x?: string,
    bsky?: string,
    site?: string,
  }
  license: {
    label: string,
    href: string,
  },
  entries?: Record<string, {
    type: "image",
    title: string,
    imgSrc: `https://${ string }`,
    source: `https://${ string }`[] | `https://${ string }`,
    style?: EntryStyle,
    createdAt?: string,
    history?: any
  } | {
    type: "group",
    name: string,
    files: ReturnType<typeof Image>[],
  }>,
  scrape?: {
    strategy: {
      platform: "github",
      repoPath: `${ string }/${ string }`,
      strategy: "folder->variants-file"
    },
    opts?: {
      filter?: ((filepath: string) => boolean)[],
      preprocess?: ((filepath: string) => string)[]
    },
    style?: EntryStyle
  }
}

export type EntryStyle = {
  objectFit?: "cover" | "contain"
}

export type AuthorScrapeConfig = NonNullable<AuthorSource[ 'scrape' ]>

export function Author(opts: AuthorSource) { return opts }

export function License(label: string, href: string) {
  return { label, href }
}
export function CustomLicense(href: string) {
  return License("Custom", href)
}


export type AuthorEntries = NonNullable<AuthorSource[ 'entries' ]>
type AuthorEntry = AuthorEntries[ string ]
// type EntrySource = {
//   type: "image",
//   title: string,
//   imgSrc: `https://${ string }`,
//   source: `https://${ string }`[] | `https://${ string }`,
//   style?: EntryStyle
// } | {
//   type: "group",
//   name: string,
//   files: ReturnType<typeof Image>[],
// }
export type ScrapedEntrySource = NonNullable<AuthorSource[ 'scrape' ]>
type ImageEntrySource = AuthorEntry & { type: "image" }
type GroupEntrySource = AuthorEntry & { type: "group" }

export function Image(opts:
  Omit<ImageEntrySource, 'type'>
): ImageEntrySource {
  return { ...opts, type: "image" as const }
}

export function Group(
  name: string,
  files: ImageEntrySource[],
): GroupEntrySource {
  return { name, files, type: "group" as const }
}

export type AuthorEntryGroup = ReturnType<typeof Group>



export function AlfonsImage(
  title: string,
  filename: string,
  opts?: Omit<ImageEntrySource, 'title' | 'href' | 'source'>
) {
  return Image({
    title,
    imgSrc: GitHub.selfHostedStaticAssetUrl(`alfon/${ filename }`),
    source: `https://github.com/alfonsusac/kawaii-logos-data/blob/main/assets/alfon/${ filename }`,
    ...opts
  })
}

export function LocalImage(
  title: string,
  filename: string,
  source: `https://${ string }`,
  opts?: Omit<ImageEntrySource, 'title' | 'href'>
) {
  return Image({
    title,
    imgSrc: GitHub.selfHostedStaticAssetUrl(filename),
    source,
    ...opts
  })
}


export function GithubRepo(repositoryPath: `${ string }/${ string }`) {
  return {
    url: `https://github.com/${ repositoryPath }`,
    image(
      path: `/${ string }`,
      opts?: Omit<ImageEntrySource, 'href' | 'source'> & { branch?: string }
    ) {
      const filename = path.split('/').at(-1)!
      const branch = opts?.branch ?? "main"
      const pageUrl = `https://github.com/${ repositoryPath }/blob/${ branch }${ path }`
      const rawUrl = `https://raw.githubusercontent.com/${ repositoryPath }/refs/heads/${ branch }${ path }`
      return Image({
        title: opts?.title ?? filename,
        imgSrc: rawUrl as `https://${ string }`,
        source: pageUrl as `https://${ string }`,
        ...opts
      })
    }
  }
}

export function ScrapeGithub({ repoPath, strategy, ...opts }: {
  repoPath: ScrapedEntrySource[ 'strategy' ][ 'repoPath' ],
  strategy: ScrapedEntrySource[ 'strategy' ][ 'strategy' ],
} & ScrapedEntrySource[ 'opts' ]): ScrapedEntrySource {
  return {
    strategy: {
      platform: "github" as const,
      strategy,
      repoPath,
    },
    opts
  }
}