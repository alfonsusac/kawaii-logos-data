import type { License } from "./output"
import { resolveReference, type ReferenceDef } from "./references"

export type StandardLicense =
  | "MIT"
  | "CC BY-NC-SA 4.0"
  | "CC BY-SA 4.0"

export type LicenseDef = {
  reference?: ReferenceDef,
  has_trademark: boolean,
} & ({
  type: StandardLicense,
} | {
  type: "Custom",
  href: string
  label: string
})





const Licenses: Record<StandardLicense, License[ 'meta' ]> = {
  "MIT": {
    label: "MIT License",
    href: "https://opensource.org/license/mit/",
    permissions: {
      use: "allowed",
      modify: "allowed",
      distribute: "allowed",
      commercial: "allowed",
      misc: {
        liability: "disallowed",
        trademark: "disallowed",
      },
      conditions: {
        sale_requires_modification: "not needed",
        disclose_source: "not needed",
        state_changes: "not needed",
        include_license: "required",
        include_copyright: "required",
        give_credit: "recommended"
      }
    }
  },
  "CC BY-NC-SA 4.0": {
    label: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0",
    href: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    permissions: {
      use: "allowed",
      modify: "allowed",
      distribute: "allowed",
      commercial: "disallowed",
      misc: {
        liability: "disallowed",
        trademark: "disallowed",
      },
      conditions: {
        sale_requires_modification: "not needed",
        disclose_source: "not needed",
        state_changes: "not needed",
        include_license: "required",
        include_copyright: "required",
        give_credit: "required"
      }
    }
  },
  "CC BY-SA 4.0": {
    label: "Creative Commons Attribution-ShareAlike 4.0",
    href: "https://creativecommons.org/licenses/by-sa/4.0/",
    permissions: {
      use: "allowed",
      modify: "allowed",
      distribute: "allowed",
      commercial: "allowed",
      misc: {
        liability: "disallowed",
        trademark: "disallowed",
      },
      conditions: {
        sale_requires_modification: "not needed",
        disclose_source: "not needed",
        state_changes: "not needed",
        include_license: "required",
        include_copyright: "required",
        give_credit: "required"
      }
    }
  }
}

export function resolveLicense(license: LicenseDef | undefined): License | undefined {
  if (!license) return undefined
  return {
    reference: resolveReference(license.reference),
    meta: license.type === "Custom" ? {
      label: license.label,
      href: license.href,
      permissions: "custom"
    } : Licenses[license.type],
    has_trademark: license.has_trademark,
  }
} 