import { type EntriesDef } from "./entries"
import type { HistoryDef } from "./history"
import {type LicenseDef } from "./license"
import { type SourcesDef } from "./source"
import { type SocialsDef } from "./socials"
import type { Site } from "../site"

export type AuthorDef = {
  displayName?: string,
  pfp?: Site,
  socials?: SocialsDef,
  license?: LicenseDef,
  entries?: EntriesDef,
  history?: HistoryDef,
  source?: SourcesDef,
}

