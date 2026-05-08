import type { SingleOrNonEmptyArray } from "./lib/non-empty-array"
import type { Output } from "./output"

export type FundingsDef = SingleOrNonEmptyArray<
  | { type: "patreon", url: `https://patreon.com/${ string }` }
  | { type: "ko-fi", url: `https://ko-fi.com/${ string }` }
  | { type: "buymeacoffee", url: `https://buymeacoffee.com/${ string }` }
  | { type: "saweria", url: `https://saweria.co/${ string }` }
  | { type: "github", url: `https://github.com/sponsors/${ string }` }
  | { type: "paypal", url: `https://paypal.me/${ string }` }
  | { type: "skeb", url: `https://skeb.jp/@${ string }` }
>

export function resolveFundingsDef(def: FundingsDef | undefined) {
  if (!def) return []
  if (!Array.isArray(def)) def = [ def ]

  const fundings: Output.Author.Fundings = []
  for (const funding of def) {
    if (funding.type === "patreon") {
      // Resolve
      fundings.push({
        type: "patreon",
        url: funding.url,
        label: "Patreon",
      })
      continue
    }

    if (funding.type === "ko-fi") {
      // Resolve
      fundings.push({
        type: "ko-fi",
        url: funding.url,
        label: "Ko-fi",
      })
      continue
    }

    if (funding.type === "buymeacoffee") {
      // Resolve
      fundings.push({
        type: "buymeacoffee",
        url: funding.url,
        label: "Buy Me a Coffee",
      })
      continue
    }

    if (funding.type === "saweria") {
      // Resolve
      fundings.push({
        type: "saweria",
        url: funding.url,
        label: "Saweria",
      })
      continue
    }

    if (funding.type === "github") {
      // Resolve
      fundings.push({
        type: "github",
        url: funding.url,
        label: "Github Sponsors",
      })
      continue
    }

    if (funding.type === "paypal") {
      // Resolve
      fundings.push({
        type: "paypal",
        url: funding.url,
        label: "PayPal",
      })
      continue
    }

    if (funding.type === "skeb") {
      // Resolve
      fundings.push({
        type: "skeb",
        url: funding.url,
        label: "Skeb",
      })
      continue
    }

    throw new Error(`Unknown funding type: ${ (funding as any).type }`)
  }

  return fundings
}