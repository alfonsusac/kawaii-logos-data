import type { AuthorDefinition } from "../resolve-author"
// import { AlfonsImageDef } from "../resolve/entries"

export const alfonsusac: AuthorDefinition = {
  socials: {
    github: "alfonsusac",
    x: "alfonsusac",
    bsky: "alfon.dev",
    site: "alfon.dev"
  },
  fundings: [
    { type: "github", url: "https://github.com/sponsors/alfonsusac" },
    { type: "paypal", url: "https://paypal.me/alfonsusac" },
  ],
  license: {
    type: "CC BY-NC-SA 4.0",
    // has_trademark: true
  },
  entries: {
    skillissue: {
      label: "Skill Issue",
      images: [ { src: { type: "self-hosted", filepath: "./assets/alfon/skillissue.svg" } } ]
    },
    lgtm: {
      label: "LGTM",
      images: [ { src: { type: "self-hosted", filepath: "./assets/alfon/lgtm.svg" } } ]
    },
    supabase: {
      label: "Supabase",
      images: [ { src: { type: "self-hosted", filepath: "./assets/alfon/supabase.svg" } } ]
    },
    emailthing: {
      label: "EmailThing",
      images: [ { src: { type: "self-hosted", filepath: "./assets/alfon/emailthing.svg" } } ]
    },
    sharkchat: {
      label: "Sharkchat",
      images: [ { src: { type: "self-hosted", filepath: "./assets/alfon/sharkchat.svg" } } ]
    },
  }
}