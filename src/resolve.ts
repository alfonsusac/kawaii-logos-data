import { black, blue, green, red, reset, yellow } from "./lib/ansii"
import type { KawaiiLogosData } from "./output"
import { log, usingLogBuffer, type LogBuffer } from "./pipeline"
import { resolveAuthorDefinition, type AuthorDefinition } from "./resolve-author"
import { standardLicenses } from "./resolve-license"
import { resolveOfficialLinks } from "./resolve-official-links"


export async function resolveDefinitions(
  defs: Record<string, AuthorDefinition>
): Promise<KawaiiLogosData> {

  const results = await Promise.all(Object
    .entries(defs)
    .map(e => usingLogBuffer(() => resolveAuthorDefinition(...e)))
  )
  logResults(results)

  const authorArray = results.map(result => result.result.resolved.author)
  const entryArray = results.map(result => result.result.resolved.entries).flat()

  const authorCount = authorArray.length
  const imageCount = entryArray.length

  const output: KawaiiLogosData = {
    authorCount, imageCount,
    authors: authorArray,
    entries: entryArray,
    standardLicenses: standardLicenses,
    officialLinks: resolveOfficialLinks(),
  }

  return output
}

// ------------------------------------------------------------------------

function logResults(
  results: {
    buffers: LogBuffer
    result: Awaited<ReturnType<typeof resolveAuthorDefinition>>
  }[],
) {
  const authorArray = results.map(result => result.result.resolved.author)
  const entryArray = results.map(result => result.result.resolved.entries).flat()

  // Pin errors on the top
  const errors = results.reduce(
    (acc, curr) => {
      const { id } = curr.result.resolved.author
      const relevantBuffers = curr.buffers.filter(b => b.type === "error" || b.type === "warn")
      if (relevantBuffers.length > 0) {
        acc.push({
          id,
          buffer: relevantBuffers.map(b => ({
            type: b.type as ("error" | "warn"),
            message: b.message
          }))
        })
      }
      return acc
    },
    [] as { id: string, buffer: { type: "error" | "warn", message: any[] }[] }[]
  )

  if (errors.length > 0) {
    log(`\n${ red }Errors and Warnings:${ reset }`)
    errors.forEach(e => {
      log(`${ red }- ${ e.id }:${ reset }`)
      e.buffer.forEach(b => {
        log(`${ b.type === "error" ? red : yellow }`, ...b.message)
      })
    })
    log()
  }

  // Then log the all logs per resolved authors
  for (const { result, buffers } of results) {
    const id = result.resolved.author.id
    const { author, entries } = result.resolved


    function has(what: any) {
      return (what !== undefined && what !== null) ? `${ green }✓${ reset }` : `${ red }✕${ reset }`
    }
    function count(num: number) {
      return num === 0 ? `${ black }0` : `${ reset }${ num }`
    }

    const images = entries.reduce((acc, curr) => {
      acc.push(...curr.images)
      return acc
    }, [] as KawaiiLogosData.EntryImage[])

    log([
      `${ blue }${ id.padEnd(17) }${ reset }`,
    ].filter(Boolean).join(''))
    log([
      `  `,
      `${ has(author.pfp) } ${ black }pfp`,
      `   `,
      `${ reset }${ author.socials.length } ${ black }socials`,
      ` `,
      `${ reset }${ count(author.socials.filter(s => s.type === "x").length) } ${ black }twt`,
      ` `,
      `${ reset }${ count(author.socials.filter(s => s.type === "github").length) } ${ black }gh`,
      ` `,
      `${ reset }${ entries.length } ${ black }entries`,
      ` `,
      `${ reset }${ count(images.length) } ${ black }imgs`,
    ].filter(Boolean).join(''))

    const logVerbose = result.definition.logVerbose
    if (!logVerbose) {
      buffers.forEach(b => b.type === "error" || b.type === "warn" ? log(`${ b.type === "error" ? red : yellow }`, ...b.message) : null)
      continue
    }

    // Log entries
    entries.forEach(e => {
      log([
        `    ${ black }- ${ `${ e.id }` } `,
      ].join(''))
      log([
        `    ${ black }  | ${ e.images.length } imgs | ${ e.license.labelShort } | ${ e.references.length } refs | ${ e.createdAt }`
      ].join(''))
      e.images.forEach(img => {
        log([
          `       ${ black }* ${ img.label.padEnd(30) } ${ img.src.type } | ${ img.references.length } refs`
        ].join(''))
      })
    })

    buffers.forEach(b => log(`${ b.type === "error" ? red : b.type === "warn" ? yellow : black }`, ...b.message))
  }

  log([
    '',
    `${ blue }Summary:${ reset }`,
    ` - resolved ${ green }${ authorArray.length }${ reset } authors`,
    ` - resolved ${ green }${ entryArray.length }${ reset } entries`,
  ].join('\n'))

}


