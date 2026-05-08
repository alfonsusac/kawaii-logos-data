import { resolveArrayOrSingleToArray, type ArrayOrSingle } from "./lib/array-type-utils"
import type { Output } from "./output"

export type FundingsDef = ArrayOrSingle<
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
  def = resolveArrayOrSingleToArray(def)

  const fundings: Output.Author.Fundings = []
  for (const funding of def) {

    fundings.push({
      type: funding.type,
      url: funding.url,
    })

    continue

    // if (funding.type === "patreon") {
    //   fundings.push({
    //     type: "patreon",
    //     url: funding.url,
    //   })
    //   continue
    // }

    // if (funding.type === "ko-fi") {
    //   fundings.push({
    //     type: "ko-fi",
    //     url: funding.url,
    //   })
    //   continue
    // }

    // if (funding.type === "buymeacoffee") {
    //   fundings.push({
    //     type: "buymeacoffee",
    //     url: funding.url,
    //   })
    //   continue
    // }

    // if (funding.type === "saweria") {
    //   fundings.push({
    //     type: "saweria",
    //     url: funding.url,
    //   })
    //   continue
    // }

    // if (funding.type === "github") {
    //   // Resolve
    //   fundings.push({
    //     type: "github",
    //     url: funding.url,
    //   })
    //   continue
    // }

    // if (funding.type === "paypal") {
    //   // Resolve
    //   fundings.push({
    //     type: "paypal",
    //     url: funding.url,
    //   })
    //   continue
    // }

    // if (funding.type === "skeb") {
    //   fundings.push({
    //     type: "skeb",
    //     url: funding.url,
    //   })
    //   continue
    // }

    throw new Error(`Unknown funding type: ${ (funding as any).type }`)
  }

  return fundings
}