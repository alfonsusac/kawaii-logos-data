export type Site = `https://${ string }`
export function site(domainPath: string) {
  if (domainPath.startsWith("https://")) {
    return domainPath as Site
  }
  if (domainPath.startsWith("http://")) {
    throw new Error(`site() needs to be a secure domain. Either use https or omit protocol to default to https. Found: ${ domainPath }`)
  }
  // if (domainPath.startsWith("http://") || domainPath.startsWith("https://")) {
  //   console.warn(`site() should be used with domain paths without protocol. Received: ${ domainPath }`)
  //   return domainPath as Site
  // }
  return `https://${ domainPath }` as Site
}