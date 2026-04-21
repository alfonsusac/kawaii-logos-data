import { logger } from "./lib/log"
import { type AuthorDef } from "./lib/model/author"
import { resolveEntries } from "./lib/model/entries"
import type { Author, Authors } from "./lib/model/output"
import { resolveSocials } from "./lib/model/socials"
import { resolveSources } from "./lib/model/source"

const log = logger("index")


export async function resolveDefinitions(
  defs: Record<string, AuthorDef>
): Promise<Authors> {
  const authorArray = await Promise
    .all(Object
      .entries(defs)
      .map(([ id, def ]) => resolveAuthor(def, id)))
  return authorArray
}




async function resolveAuthor(author: AuthorDef, id: string): Promise<Author> {

  const socials = await resolveSocials(author.socials)
  const entries = await resolveEntries(author.entries)
  const scraped = await resolveSources(author.source)

  const displayName = (() => {
    if (author.displayName) return author.displayName
    return id
  })()

  const pfp = (() => {
    if (author.pfp) return author.pfp
    if (socials.github) return `https://avatars.githubusercontent.com/${ socials.github }`
    if (scraped?.socials?.github) return `https://avatars.githubusercontent.com/${ scraped.socials.github }`
    return undefined
  })()

  const resolved = {
    id, displayName, pfp,
    socials: {
      ...socials,
      ...scraped?.socials,
    },
    license: scraped?.license,
    entries,
  }

  return resolved
}