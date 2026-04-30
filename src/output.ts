export type Authors = Author[]
export type Output = Authors
export type Resolved = Authors

export type Author = {
  id: string,
  displayName: string,
  pfp?: string,
  social: {
    github?: {
      username: string,
      url: string,
    },
    x?: {
      username: string,
      url: string,
    },
    bsky?: {
      username: string,
      url: string,
    },
    site?: string,
  },
  links: {
    socials: {
      type: "github" | "x" | "bsky",
      username: string,
      url: string,
    }[],
    personalsites: string[],
  }
  entries: {
    id: string,
    title: string,
    images: {
      src: string,                  // for <img> source
      pageUrl?: string,             // where the image was found, for linking back to the source
      label?: string,
      style?: {
        objectFit?: "cover" | "contain"
      }
    }[],
    references: Reference[],
    license: License
  }[],
}

export type AuthorLinks = Author[ 'links' ]
export type AuthorSocialLinks = Author[ 'links' ][ 'socials' ]
export type AuthorPersonalSites = Author[ 'links' ][ 'personalsites' ]
export type AuthorEntries = Author[ 'entries' ]
export type AuthorEntryItem = Author[ 'entries' ][ number ]

export type Reference = {
  site: string,
  dateAccessed?: string,
}

export type License = {
  reference?: Reference, // where the information was gathered
  // has_trademark: boolean, // No way yet to determine this, and it's not a standard license property, so we'll leave it out for now
} & (
    | { type: "unknown", meta?: undefined }
    | { type: "custom", meta: { href: string } }
    | { type: "standard", meta: StandardLicenseMeta }
  )

export type StandardLicenseMeta = {
  label: string,
  href: string, // link to the definitive license text
  // Public restrictions are not absolute—they are default rules, not universal limits
  // These are for non-custom licenses, this is just informational and may be inaccurate
  permissions: {
    use: Permission,
    modify: Permission, // 
    distribute: Permission, // Distribution implies someone else can access your copy.
    commercial: Permission,
    misc: {
      liability: Permission,
      trademark: Permission,
    }
    conditions: {
      sale_requires_modification: Condition,
      disclose_source: Condition,
      state_changes: Condition,
      include_license: Condition,
      include_copyright: Condition,
      give_credit: Condition,
    }
  }
}

type Permission = "allowed" | "disallowed" | "depends"
type Condition = "required" | "recommended" | "not needed"