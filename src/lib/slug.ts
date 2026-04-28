import { logerror } from "../pipeline"

// Check for uppercases and spaces only.
export function validateSlug(str: string) {
  if (/[A-Z]/.test(str)) {
    logerror(`Slug "${ str }" contains uppercase letters.`)
  }
  if (/\s/.test(str)) {
    logerror(`Slug "${ str }" contains spaces.`)
  }
}

export function slugify(str: string) {
  const newstr = str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace("'", '-')
  return newstr
}