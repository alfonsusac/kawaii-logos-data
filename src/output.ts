export type KawaiiLogoData = {
  updatedAt: string,
  data: {
    authorCount: number,
    imageCount: number,
    authors: AuthorOutput[],
    standardLicenses: StandardLicenseOut,
  }
}

export namespace KawaiiLogoData {
  export type Data = KawaiiLogoData[ 'data' ]
}

export type AuthorOutput = {
  id: string,
  displayName: string,
  pfp?: string,
  socials: {
    type: Output.SocialTypes,
    username: string,
    url: string,
  }[],
  personalSites: string[],
  fundings: {
    type: Output.FundingTypes,
    label: string,
    url: string,
  }[]
  // social: {
  //   github?: {
  //     username: string,
  //     url: string,
  //   },
  //   x?: {
  //     username: string,
  //     url: string,
  //   },
  //   bsky?: {
  //     username: string,
  //     url: string,
  //   },
  //   behance?: {
  //     username: string,
  //     url: string,
  //   },
  //   figma?: {
  //     username: string,
  //     url: string,
  //   },
  //   dribbble?: {
  //     username: string,
  //     url: string,
  //   },
  //   site?: string,
  // },
  // links: {
  //   socials: {
  //     type: "github" | "x" | "bsky" | "behance" | "figma" | "dribbble",
  //     username: string,
  //     url: string,
  //   }[],
  //   personalsites: string[],
  // }
  entries: {
    id: string,
    title: string,
    imageCount: number,
    images: {
      src: Output.Link,
      references: Output.Reference[],        // where the image was found, for linking back to the source
      label: string,
      style?: {
        objectFit?: "cover" | "contain"
      }
    }[],
    references: Output.Reference[],
    license: Output.License
  }[],
  licenses: Output.License[],
  references: Output.Reference[],

}

// export namespace AuthorOutput {
//   // export type Links = AuthorOutput[ 'links' ]
//   export type SocialLinks = AuthorOutput[ 'socials' ]
//   export type PersonalSites = AuthorOutput[ 'personalSites' ]
//   // export type Socials = AuthorOutput[ 'social' ]
//   export type Entries = AuthorOutput[ 'entries' ]
//   export type EntryItem = AuthorOutput[ 'entries' ][ number ]
//   export type EntryItemImages = AuthorOutput.EntryItem[ 'images' ]
//   export type Fundings = AuthorOutput[ 'fundings' ]
//   export type FundingType = AuthorOutput.Fundings[ number ][ 'type' ]
// }

export namespace Output {

  export type Author = AuthorOutput
  export namespace Author {
    // export type Links = Author[ 'links' ]
    export type SocialLinks = Author[ 'socials' ]
    export type PersonalSites = Author[ 'personalSites' ]
    // export type Socials = Author[ 'social' ]
    export type Entries = Author[ 'entries' ]
    export type EntryItem = Author[ 'entries' ][ number ]
    export type EntryItemImages = Author.EntryItem[ 'images' ]
    export type Fundings = Author[ 'fundings' ]
    export type FundingType = Author.Fundings[ number ][ 'type' ]
  }

  export const socialTypes = [ "github", "x", "bsky", "behance", "figma", "dribbble" ] as const
  export type SocialTypes = typeof socialTypes[ number ]

  export const fundingTypes = [ "patreon", "ko-fi", "buymeacoffee", "saweria", "github", "paypal", "skeb" ] as const
  export type FundingTypes = typeof fundingTypes[ number ]

  export type Link = {
    type:
    | "github-repo-text-content"
    | "github-blob"
    | "github-repo"
    | "github-raw"
    | "github-camo"
    | "github-unknown"
    | "gist-raw"
    | "gist-page"
    | "google-drive"
    | "twitter-post"
    | "bsky-post"
    | "skeb-creator-page"
    | "skeb-creator-guideline-page"
    | "unknown"
    label: string
    url: string
  }
  export namespace Link {
    export type Type = Link[ 'type' ]
  }

  export type Reference = {
    link: Output.Link,
    dateAccessed?: string,
  }

  export type License = {
    reference?: Reference, // where the information was gathered
    label: string,
    labelShort: string,
  } & (
      | { type: "unknown" }
      | { type: "custom", href: string }
      | { type: "standard", id: StandardLicenseType }
    )

}









export type StandardLicenseType =
  | "MIT"
  | "CC BY-NC-SA 4.0"
  | "CC BY-SA 4.0"
  | "CC0-1.0"
  | "All Rights Reserved"

export type StandardLicenseOut = Record<StandardLicenseType, StandardLicenseMeta>

export type StandardLicenseMeta = {
  label: string,
  href: string, // link to the definitive license text
  // Public restrictions are not absolute—they are default rules, not universal limits
  // These are for non-custom licenses, this is just informational and may be inaccurate
  permissions: {
    use: LicensePermission,
    modify: LicensePermission, // 
    distribute: LicensePermission, // Distribution implies someone else can access your copy.
    commercial: LicensePermission,
    misc: {
      liability: LicensePermission,
      trademark: LicensePermission,
    }
    conditions: {
      sale_requires_modification: LicenseCondition,
      disclose_source: LicenseCondition,
      state_changes: LicenseCondition,
      include_license: LicenseCondition,
      include_copyright: LicenseCondition,
      give_credit: LicenseCondition,
    }
  }
}

export type LicensePermission = "allowed" | "disallowed" | "depends"
export type LicenseCondition = "required" | "recommended" | "not needed"