import { black, blue, green, red, reset, yellow } from "./lib/ansii"
import type { AuthorOutput, KawaiiLogoData } from "./output"
import { log, usingLogBuffer, type LogBuffer } from "./pipeline"
import { resolveAuthorDefinition, type AuthorDefinition } from "./resolve-author"
import { standardLicenses } from "./resolve/license"


export async function resolveDefinitions(
  defs: Record<string, AuthorDefinition>
): Promise<KawaiiLogoData[ 'data' ]> {

  const authorResults = await Promise.all(Object
    .entries(defs)
    .map(
      ([ id, def ]) => {
        return usingLogBuffer(() => resolveAuthorDefinition(def, id))
      }
    )
  )
  logResults(authorResults)
  const authorArray = authorResults.map(result => result.result)

  const authorCount = authorArray.length
  const imageCount = authorArray.reduce((sum, a) => {
    return sum + a.entries.reduce((entrySum, entry) => {
      return entrySum + entry.images.length
    }, 0)
  }, 0)


  const output: KawaiiLogoData[ 'data' ] = {
    authorCount, imageCount,
    authors: authorArray,
    standardLicenses: standardLicenses,
  }

  return output
}

// ------------------------------------------------------------------------

function logResults(
  results: {
    buffers: LogBuffer
    result: AuthorOutput
  }[],
) {
  const authorArray = results.map(r => r.result)

  // Pin errors on the top
  const errors = results.reduce(
    (acc, curr) => {
      const { id } = curr.result
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
    const id = result.id
    const resolved = result
    function has(what: any) {
      return (what !== undefined && what !== null) ? `${ green }✓${ reset }` : `${ red }✕${ reset }`
    }
    function count(num: number) {
      return num === 0 ? `${ black }0` : `${ reset }${ num }`
    }

    const images = resolved.entries.reduce((acc, curr) => {
      acc.push(...curr.images)
      return acc
    }, [] as AuthorOutput.EntryItem[ 'images' ])

    log([
      `${ blue }${ id.padEnd(17) }${ reset }`,
    ].filter(Boolean).join(''))
    log([
      `  `,
      `${ has(resolved.pfp) } ${ black }pfp`,
      `   `,
      `${ reset }${ resolved.links.socials.length } ${ black }socials`,
      ` `,
      `${ reset }${ count(resolved.links.socials.filter(s => s.type === "x").length) } ${ black }twt`,
      ` `,
      `${ reset }${ count(resolved.links.socials.filter(s => s.type === "github").length) } ${ black }gh`,
      ` `,
      `${ reset }${ resolved.entries.length } ${ black }entries`,
      ` `,
      `${ reset }${ count(images.length) } ${ black }imgs`,
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


