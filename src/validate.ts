import { validateSlug } from "./lib/slug"
import type { Author } from "./output"
import { logerror } from "./pipeline"

export async function validateResolvedAuthor(author: Author) {

  // Validate slug-related tokens
  validateSlug(author.id)
  author.entries.forEach(entry => {
    validateSlug(entry.id)
  })

  // Validate URLs
  // TODO

}




