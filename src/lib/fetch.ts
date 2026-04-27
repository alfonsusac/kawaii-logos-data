import { logger } from "./log"

// -------------------------------------------------------

const log = logger('fetch', { verbose: true })

// -------------------------------------------------------

export async function appfetch(url: string, options?: RequestInit) {
  log.verbose(options?.method ?? "GET", url)

  const res = await fetch(url, options)
  return res
}

export function GET(url: string, query?: Record<string, string>, opts?: RequestInit) {
  const queryString = query ? `?${ new URLSearchParams(query).toString() }` : ""
  return appfetch(`${ url }${ queryString }`, {
    method: "GET",
    ...opts,
  })
}

// Bun Fetch Errors

// fetch("123")
// throw 
//   err.name = TypeError
//   err.message = "fetch() URL is invalid"
//   err.code = "ERR_INVALID_URL"

// fetch("ftp://a")
// throw
//   err.name = TypeError
//   err.message = "protocol must be http:, https: or s3:"
//   err.code = "ERR_INVALID_ARG_VALUE"

// fetch("htp:/123") or
//  - with no connection
//  - with invalid protocol
//  - with no service running on port 12345
// throw
//   err.name = Error
//   err.message = "Unable to connect. Is the computer able to access the url?"
//   err.code = "ConnectionRefused"
//   err.errno = 0
//   err.path = "htp:/123"

// fetch('...')
//  - infinite redirects
// throw
//   err.name = Error
//   err.message = "The response redirected too many times. For more information, pass `verbose: true` in the second argument to fetch()"
//   err.code = "TooManyRedirects"

// fetch('...')
//  - infinite server processing time
// throw
//   err.name = Error
//   err.message = "The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()"
//   err.code = "ECONNRESET"
//   err.errno = 0

// fetch('http://example.com', { signal: AbortSignal.timeout(1) })
// throw
//   err.cosntructor.name = DOMException
//   err.name = "TimeoutError"
//   err.message = "The operation timed out."
//   err.code = 23

// fetch('http://example.com', { signal: new AbortController })
// throw
//   err.cosntructor.name = DOMException
//   err.name = "AbortError"
//   err.message = "The operation was aborted."
//   err.code = 20