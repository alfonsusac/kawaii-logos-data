import type { AuthorDefinition } from "../resolve/author"
import { AlfonsImageDef } from "../resolve/entries"

export const alfonsusac: AuthorDefinition = {
  socials: {
    github: "alfonsusac",
    x: "alfonsusac",
    bsky: "alfon.dev",
    site: "alfon.dev"
  },
  license: {
    type: "CC BY-NC-SA 4.0",
    has_trademark: true
  },
  entries: {
    skillissue: AlfonsImageDef("Skill Issue", "skillissue.svg"),
    lgtm:       AlfonsImageDef("LGTM", "lgtm.svg"),
    supabase:   AlfonsImageDef("Supabase", "supabase.svg"),
    emailthing: AlfonsImageDef("EmailThing", "emailthing.svg"),
    sharkchat:  AlfonsImageDef("Sharkchat", "sharkchat.svg"),
  }
}