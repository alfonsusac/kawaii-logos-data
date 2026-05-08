import type { Output } from "./output"
import { log, logerror, warn } from "./pipeline"
import { resolveReferencesDefinition, type ReferenceDef } from "./resolve-references"

export type LicenseDef = {
  reference?: ReferenceDef,
} & (
    | { type: Output.StandardLicense.Type }
    | { type: "custom", href: string }
    | { type: "unknown", href?: undefined }
  )

export type LicenseType = LicenseDef[ "type" ]



export const standardLicenses: Output.StandardLicense = {
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
  },
  "All Rights Reserved": {
    label: "All Rights Reserved",
    href: "",
    permissions: {
      use: "disallowed",
      modify: "disallowed",
      distribute: "disallowed",
      commercial: "disallowed",
      misc: {
        liability: "depends",
        trademark: "depends",
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



export function resolveLicenseDefinitions(license: LicenseDef | undefined): Output.License {
  if (!license) return { type: "unknown", label: "Unknown License", labelShort: "Unknown License", }

  const reference = resolveReferencesDefinition(license.reference)[ 0 ]

  if (license.type === "unknown") {
    return { reference, type: "unknown", label: "Unknown License", labelShort: "Unknown License" }
  }

  if (license.type === "custom") {
    return { reference, type: "custom", href: license.href, label: "Custom License", labelShort: "Custom License" }
  }

  if (license.type in standardLicenses === false) {
    logerror(`Unsupported license type: ${ license.type }. Please check the license definition for any typos or consider adding support for this license in ${ import.meta.path }.`)
    return { reference, type: "unknown", label: "Unknown License", labelShort: "Unknown License" }
  }

  return { reference, type: "standard", id: license.type, label: standardLicenses[ license.type ].label, labelShort: license.type, href: standardLicenses[ license.type ].href }
}



export function resolveToLicenseTypeByContent(licenseContent: string): LicenseType {

  const LicenseContentIDs: Record<Output.StandardLicense.Type, string[]> = {
    "MIT": [
      'MIT License'
    ],
    "CC BY-NC-SA 4.0": [
      'Creative Commons Attribution-NonCommercial-ShareAlike 4.0',
      'CC BY-NC-SA 4.0',
      'Attribution-NonCommercial-ShareAlike 4.0 International'
    ],
    "CC BY-SA 4.0": [
      'Creative Commons Attribution-ShareAlike 4.0',
      'CC BY-SA 4.0'
    ],
    "CC0-1.0": [
      'CC0 1.0 Universal',
      'CC0-1.0'
    ],
    "All Rights Reserved": [
      'All Rights Reserved'
    ],
  }

  for (const [ licenseType, identifiers ] of Object.entries(LicenseContentIDs)) {
    if (identifiers.some(id => licenseContent.includes(id))) {
      log(`Resolved license type as ${ licenseType } based on content identifiers.`)
      return licenseType as Output.StandardLicense.Type
    }
  }

  warn(`Failed to resolve license type from content. No known identifiers found in the license content. Please check the license content for any recognizable identifiers or consider adding support for this license in ${ import.meta.path }.`)
  return "unknown"
}