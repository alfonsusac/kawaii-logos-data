import { validateSlug } from "./lib/slug"
import type { Output } from "./output"

export async function validateResolvedAuthor(author: Output.Author) {

  // Validate slug-related tokens
  validateSlug(author.id)
  author.entries.forEach(entry => {
    validateSlug(entry.id)
  })

  // Validate URLs
  // TODO

}




