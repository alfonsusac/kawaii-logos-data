import type { License, StandardLicenseMeta } from "../output"
import { log, logerror } from "../pipeline"
import { resolveReference, type ReferenceDef } from "./references"

export type StandardLicense =
  | "MIT"
  | "CC BY-NC-SA 4.0"
  | "CC BY-SA 4.0"
  | "CC0-1.0"

export type LicenseDef = {
  reference?: ReferenceDef,
  // has_trademark: boolean,
} & (
    | { type: StandardLicense }
    | { type: "custom", href: string }
    | { type: "unknown", href?: undefined }
    // | { type: "from-source", url: string, } // scraped licenses must be resolved at resolveSource. So when resolving entries, licenses are already resolved.
  )

export type LicenseType = LicenseDef[ "type" ]



const Licenses: Record<StandardLicense, StandardLicenseMeta> = {
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
  },
  "CC0-1.0": {
    label: "Creative Commons CC0 1.0 Universal",
    href: "https://creativecommons.org/publicdomain/zero/1.0/",
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
        include_license: "not needed",
        include_copyright: "not needed",
        give_credit: "not needed"
      }
    }
  }
}

export function resolveLicenseDefinitions(license: LicenseDef | undefined): License {
  if (!license) return {
    type: "unknown",
  }

  if (license.type === "unknown") {
    return {
      type: "unknown",
      reference: resolveReference(license.reference),
    }
  }

  if (license.type === "custom") {
    return {
      type: "custom",
      meta: { href: license.href, },
      reference: resolveReference(license.reference),
    }
  }

  if (license.type in Licenses === false) {
    logerror(`Unsupported license type: ${ license.type }. Please check the license definition for any typos or consider adding support for this license in ${ import.meta.path }.`)
    return {
      type: "unknown",
    }
  }

  return {
    type: "standard",
    reference: resolveReference(license.reference),
    meta: Licenses[ license.type ],
  }
}


const LicenseContentIDs: Record<StandardLicense, string[]> = {
  "MIT": [ 'MIT License' ],
  "CC BY-NC-SA 4.0": [ 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0', 'CC BY-NC-SA 4.0' ],
  "CC BY-SA 4.0": [ 'Creative Commons Attribution-ShareAlike 4.0', 'CC BY-SA 4.0' ],
  "CC0-1.0": [ 'CC0 1.0 Universal', 'CC0-1.0' ],
}

export function resolveToLicenseTypeByContent(licenseContent: string): LicenseType {

  for (const [ licenseType, identifiers ] of Object.entries(LicenseContentIDs)) {
    if (identifiers.some(id => licenseContent.includes(id))) {
      return licenseType as StandardLicense
    }
  }


  return "unknown"
}