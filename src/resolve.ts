import { black, blue, green, red, reset, yellow } from "./lib/ansii"
import { resolveSource } from "./resolve/source"
import { log, usingLogBuffer, type LogBuffer } from "./pipeline"
import type { Authors, Author } from "../types"
import type { AuthorDefinition } from "./resolve/author"
import { resolveEntries } from "./resolve/entries"
import { resolvePfp } from "./resolve/pfp"
import { resolveSocials } from "./resolve/socials"


export async function resolveDefinitions(
  defs: Record<string, AuthorDefinition>
): Promise<Authors> {

  const results = await Promise.all(Object
    .entries(defs)
    .map(([ id, def ]) => usingLogBuffer(() => resolveAuthor(def, id))))

  logResults(results)

  const authorArray = results.map(result => result.result)
  return authorArray
}

// ------------------------------------------------------------

async function resolveAuthor(author: AuthorDefinition, id: string) {
  const displayName = author.displayName ?? id

  // Convert source to definitions
  const { scrapedEntries, scrapedSocials } = await resolveSource(author.source)

  // Resolve entries and enrichd datas
  const entries = await resolveEntries(author.entries)

  // Resolve socials
  const { social, links } = await resolveSocials(author.socials, scrapedSocials)

  // Resolve pfp from def or scraped socials
  const pfp = await resolvePfp(author, links.socials)

  // Compile resolved data into final Author object
  const resolved: Author = {
    id,
    displayName,
    pfp,
    social,
    links,
    entries: [
      ...entries,
      ...scrapedEntries,
    ],
  }

  return resolved
}

// ------------------------------------------------------------------------

function logResults(
  results: {
    buffers: LogBuffer
    result: Author
  }[],
) {
  const authorArray = results.map(r => r.result)

  for (const { result, buffers } of results) {
    const id = result.id
    const resolved = result
    function has(what: any) {
      return (what !== undefined && what !== null) ? `${ green }✓${ reset }` : `${ red }✕${ reset }`
    }
    function count(num: number) {
      return num === 0 ? `${ black }0` : `${ reset }${ num }`
    }
    log([
      `${ blue }${ id.padEnd(17) }${ reset }`,
      `   `,
      `${ has(resolved.pfp) } ${ black }pfp`,
      `   `,
      `${ reset }${ resolved.links.socials.length } ${ black }socials`,
      ` `,
      `${ reset }${ count(resolved.links.socials.filter(s => s.type === "x").length) } ${ black }twt`,
      ` `,
      `${ reset }${ count(resolved.links.socials.filter(s => s.type === "github").length) } ${ black }gh`,
      ` `,
      `${ reset }${ resolved.entries.length } ${ black }entries`,
    ].filter(Boolean).join(''))
    buffers.forEach(b => log(`${ b.type === "error" ? red : b.type === "warn" ? yellow : black }`, ...b.message))
  }

  log([
    '',
    `${ blue }Summary:${ reset }`,
    ` - resolved ${ green }${ authorArray.length }${ reset } authors`,
    ` - resolved ${ green }${ authorArray.reduce((sum, a) => sum + a.entries.length, 0) }${ reset } entries`,
  ].join('\n'))

}


