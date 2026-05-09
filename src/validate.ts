import { validateSlug } from "./lib/slug"
import type { KawaiiLogosData } from "./output"

export async function validateResolvedAuthor(
  author: KawaiiLogosData.Author,
  entries: KawaiiLogosData.Entry[],
) {

  // Validate slug-related tokens
  validateSlug(author.id)
  entries.forEach(entry => {
    validateSlug(entry.id)
  })

  // Validate URLs
  // TODO

}




