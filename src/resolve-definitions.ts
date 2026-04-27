import { black, blue, green, red, reset, yellow } from "./lib/ansii"
import { logMajorStep } from "./lib/log"
import { type AuthorDef } from "./lib/model/author"
import { resolveEntries } from "./lib/model/entries"
import type { Author, Authors } from "./lib/model/output"
import { resolvePfp } from "./lib/model/pfp"
import { resolveSocials } from "./lib/model/socials"
import { resolveSources } from "./lib/model/source"


export async function resolveDefinitions(
  defs: Record<string, AuthorDef>
): Promise<Authors> {

  const results = await Promise.all(Object
    .entries(defs)
    .map(([ id, def ]) => resolveAuthor(def, id)))

  const authorArray = results.map(result => result.resolved)

  logMajorStep("Resolved definitions:")
  for (const result of results) {
    for (const logEntry of result.logs) {
      console.log(logEntry)
    }
  }

  console.log([
    '',
    `${ blue }Summary:${ reset }`,
    ` - resolved ${ green }${ authorArray.length }${ reset } authors`,
    ` - resolved ${ green }${ authorArray.reduce((sum, a) => sum + a.entries.length, 0) }${ reset } entries`,
  ].join('\n'))

  return authorArray
}



async function resolveAuthor(author: AuthorDef, id: string) {
  const displayName = author.displayName ?? id

  const c = createResolveContext(id)

  const scraped = await resolveSources(author.source, c)
  const entries = await resolveEntries(author.entries, c)
  const {
    social,
    links,
  } = await resolveSocials(author.socials, scraped?.socialList, c)
  const pfp = await resolvePfp(author, links.socials, c)

  const resolved: Author = {
    id, displayName, pfp,
    social,
    links,
    entries: [
      ...entries,
      ...(scraped?.entries || []),
    ],
  }

  const logs = c.logResolvedAuthor(resolved)

  return {
    resolved,
    logs,
  }
}



// To be passed around during resolution to collect logs and warnings

export type ResolveContext = ReturnType<typeof createResolveContext>

function createResolveContext(id: string) {
  const warns: string[] = []
  const errors: string[] = []
  const logs: string[] = []
  logs.push(`  ${ blue }${ id }${ reset }`)

  return {
    warns, errors,
    warn: (msg: string) => warns.push(`    ${ yellow }- ${ msg }`),
    logerror: (msg: string) => errors.push(`    ${ red }- ${ msg }`),
    logResolvedAuthor: (resolved: Author) => {
      function has(what: any) {
        return (what !== undefined && what !== null) ? `${ green }✓${ reset }` : `${ red }✕${ reset }`
      }
      function count(num: number) {
        return num === 0 ? `${ black }0` : `${ reset }${ num }`
      }

      logs.push([
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

      if (errors.length > 0) {
        logs.push(`    ${ red }errors:${ reset }`)
        logs.push(...errors)
      }
      if (warns.length > 0) {
        logs.push(`    ${ yellow }warnings:${ reset }`)
        logs.push(...warns)
      }

      return logs
    }
  }
}
