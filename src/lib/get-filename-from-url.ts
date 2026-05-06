import { logerror } from "../pipeline"

export function getFilenameFromUrl(url: string) {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const segments = pathname.split('/')
    const lastSegment = segments.pop() || ''
    return lastSegment
  } catch (error) {
    throw new Error(`(getFilenameFromUrl) Invalid URL: ${ url }`)
  }
}