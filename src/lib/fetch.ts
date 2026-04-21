import { logger } from "./log"

const log = logger()

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