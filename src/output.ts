export type KawaiiLogoData = {
  updatedAt: string,
  data: {
    authorCount: number,
    imageCount: number,
    authors: Output.Author[],
    standardLicenses: Output.StandardLicense,
    officialLinks: Output.OfficialLinks, 
  }
}

export namespace KawaiiLogoData {
  export type Data = KawaiiLogoData[ 'data' ]
}


export namespace Output {
  export type Author = {
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
      url: string,
    }[]
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
      license: Output.License,
      createdAt: `${ number }-${ number }-${ number }` | undefined, // ISO Date string (YYYY-MM-DD) or undefined if unknown
    }[],
    licenses: Output.License[],
    references: Output.Reference[],
  }
  export namespace Author {
    export type SocialLinks = Author[ 'socials' ]
    export type PersonalSites = Author[ 'personalSites' ]
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
    | "figma-file"
    | "official-website-usage"
    | "shop-page"
    | "unknown"
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
    reference?: Reference,
    label: string,
    labelShort: string,
  } & (
      | { type: "unknown", id?: undefined, href?: undefined }
      | { type: "custom", id?: undefined, href: string }
      | { type: "standard", id: StandardLicense.Type, href: string }
    )
  export namespace License {
    export type Permission = "allowed" | "disallowed" | "depends"
    export type Condition = "required" | "recommended" | "not needed"
  }


  export type StandardLicense = Record<StandardLicense.Type, StandardLicense.Meta>
  export namespace StandardLicense {
    export const standardLicenceTypes = [
      "MIT",
      "CC BY-NC-SA 4.0",
      "CC BY-SA 4.0",
      "CC0-1.0",
      "All Rights Reserved"
    ] as const
    export type Type = typeof standardLicenceTypes[ number ]
    export type Meta = {
      label: string,
      href: string, // link to the definitive license text
      // Public restrictions are not absolute—they are default rules, not universal limits
      // These are for non-custom licenses, this is just informational and may be inaccurate
      permissions: {
        use: License.Permission,
        modify: License.Permission, // 
        distribute: License.Permission, // Distribution implies someone else can access your copy.
        commercial: License.Permission,
        misc: {
          liability: License.Permission,
          trademark: License.Permission,
        }
        conditions: {
          sale_requires_modification: License.Condition,
          disclose_source: License.Condition,
          state_changes: License.Condition,
          include_license: License.Condition,
          include_copyright: License.Condition,
          give_credit: License.Condition,
        }
      }
    }
  }

  export type OfficialLinks = {
    label: string
    url: string
    authorid: string
  }[]
}











