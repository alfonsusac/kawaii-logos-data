export function matchUrl(url: string, pattern: string) {
  const urlPattern = new URLPattern(pattern)
  return urlPattern.test(url)
}