import { AsyncLocalStorage } from "node:async_hooks"
import { black, blue, green, red, reset, yellow } from "./lib/ansii"
import { logMajorStep } from "./lib/log"
import { type AuthorDef } from "./lib/model/author"
import { resolveEntries } from "./lib/model/entries"
import type { Author, Authors } from "./lib/model/output"
import { resolvePfp } from "./lib/model/pfp"
import { resolveSocials } from "./lib/model/socials"
import { resolveSources } from "./lib/model/source"
import { log, usingLogBuffer } from "./pipeline"
import { buffer } from "node:stream/consumers"


export async function resolveDefinitions(
  defs: Record<string, AuthorDef>
): Promise<Authors> {

  const results = await Promise.all(Object
    .entries(defs)
    .map(([ id, def ]) => {
      return usingLogBuffer(() => resolveAuthor(def, id))
    }))

  const authorArray = results.map(result => result.result)

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
      `${ reset }${ count(resolved.links.socials.filter(s => s.type === "x").length) } ${ black }X/twt`,
      ` `,
      `${ reset }${ count(resolved.links.socials.filter(s => s.type === "github").length) } ${ black }gh`,
      ` `,
      `${ reset }${ resolved.entries.length } ${ black }entries`,
    ].filter(Boolean).join(''))
    buffers.errors.forEach(e => log(`  ${ red }e:`, ...e))
    buffers.warns.forEach(w => log(`  ${ yellow }w:`, ...w))
    buffers.verboses.forEach(v => log(` ${ black }`, ...v))
  }

  log([
    '',
    `${ blue }Summary:${ reset }`,
    ` - resolved ${ green }${ authorArray.length }${ reset } authors`,
    ` - resolved ${ green }${ authorArray.reduce((sum, a) => sum + a.entries.length, 0) }${ reset } entries`,
  ].join('\n'))

  return authorArray
}

// ------------------------------------------------------------

export const resolveContext = new AsyncLocalStorage<{
  id: string,
}>()

// ------------------------------------------------------------

async function resolveAuthor(author: AuthorDef, id: string) {
  const displayName = author.displayName ?? id

  const scraped = await resolveSources(author.source)
  const entries = await resolveEntries(author.entries)
  const {
    social,
    links,
  } = await resolveSocials(author.socials, scraped?.socialList)
  const pfp = await resolvePfp(author, links.socials)

  const resolved: Author = {
    id, displayName, pfp,
    social,
    links,
    entries: [
      ...entries,
      ...(scraped?.entries || []),
    ],
  }

  return resolved
}