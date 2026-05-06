import type { License, StandardLicenseOut, StandardLicenseType } from "../output"
import { log, logerror } from "../pipeline"
import { resolveReferencesDef, type ReferenceDef } from "./references"

export type LicenseDef = {
  reference?: ReferenceDef,
} & (
    | { type: StandardLicenseType }
    | { type: "custom", href: string }
    | { type: "unknown", href?: undefined }
  )

export type LicenseType = LicenseDef[ "type" ]



export const standardLicenses: StandardLicenseOut = {
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
  if (!license) return { type: "unknown" }

  const reference = resolveReferencesDef(license.reference)[ 0 ]

  if (license.type === "unknown") {
    return { reference, type: "unknown", }
  }

  if (license.type === "custom") {
    return { reference, type: "custom", href: license.href, }
  }

  if (license.type in standardLicenses === false) {
    logerror(`Unsupported license type: ${ license.type }. Please check the license definition for any typos or consider adding support for this license in ${ import.meta.path }.`)
    return { reference, type: "unknown", }
  }

  return { reference, type: "standard", id: license.type, }
}


const LicenseContentIDs: Record<StandardLicenseType, string[]> = {
  "MIT": [ 'MIT License' ],
  "CC BY-NC-SA 4.0": [ 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0', 'CC BY-NC-SA 4.0' ],
  "CC BY-SA 4.0": [ 'Creative Commons Attribution-ShareAlike 4.0', 'CC BY-SA 4.0' ],
  "CC0-1.0": [ 'CC0 1.0 Universal', 'CC0-1.0' ],
}

export function resolveToLicenseTypeByContent(licenseContent: string): LicenseType {

  for (const [ licenseType, identifiers ] of Object.entries(LicenseContentIDs)) {
    if (identifiers.some(id => licenseContent.includes(id))) {
      return licenseType as StandardLicenseType
    }
  }


  return "unknown"
}