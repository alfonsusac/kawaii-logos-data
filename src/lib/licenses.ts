import { License } from "./model"

export const Licenses = {
  [ 'CC BY-NC-SA 4.0' ]: License(
    "CC BY-NC-SA 4.0",
    "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  ),
  [ 'MIT' ]: License(
    "MIT",
    "https://opensource.org/license/mit/"
  ),
  [ 'Unknown' ]: License(
    "Unknown",
    ""
  )
} as const