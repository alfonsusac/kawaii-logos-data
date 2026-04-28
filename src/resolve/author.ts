import { type EntriesDefinition } from "./entries"
import type { HistoryDef } from "./history"
import {type LicenseDef } from "./license"
import { type SourceDef } from "./source"
import { type SocialsDef } from "./socials"
import type { Site } from "../lib/site"

export type AuthorDefinition = {
  displayName?: string,
  pfp?: Site,
  socials?: SocialsDef,
  license?: LicenseDef,
  entries?: EntriesDefinition,
  history?: HistoryDef,
  source?: SourceDef,
}

