import { validateSlug } from "./lib/slug"
import type { AuthorOutput } from "./output"

export async function validateResolvedAuthor(author: AuthorOutput) {

  // Validate slug-related tokens
  validateSlug(author.id)
  author.entries.forEach(entry => {
    validateSlug(entry.id)
  })

  // Validate URLs
  // TODO

}




