import { logWithType } from "../pipeline"
import { cacheEntry } from "./cache"
import { durationToMs, milisecondToHumanReadableComplete, type Duration } from "./duration"


type RateLimitResult = { limit: number, used: number, resetInSeconds: number }


export async function appFetch2(
  url: string,
  opts?: RequestInit,
  resultOpts?: {
    cache?: {
      key: string,
      duration: Duration | ((res: Response) => Duration)
    },
    ratelimit?: (res: Response) => RateLimitResult
  }
) {
  // Types
  type CachedResult = {
    json: any,
    status: number,
    statusText: string,
    ratelimit?: RateLimitResult
  }

  type AppFetchReturn = CachedResult & {
    response: Response | undefined,
    cache:
    | { status: "nocache" }
    | { status: "hit", expiresAt: number }
    | { status: "error", error: any }
    | { status: "miss" },
    ratelimit?: RateLimitResult
  }

  // Initialization
  const method = opts?.method || "GET"

  // Caching
  const cache = (resultOpts?.cache && method === "GET") ? {
    opts: resultOpts?.cache,
    entry: cacheEntry<CachedResult>(resultOpts?.cache.key),
  } : undefined

  let cacheStatus: AppFetchReturn[ "cache" ] = { status: "nocache" }

  // Logging
  function printDetail(ratelimit: RateLimitResult | undefined) {
    const parsedUrl = (() => { try { return new URL(url) } catch (error) { return { host: url, pathname: '' } } })();
    [
      [
        method,
        cacheStatus.status !== "nocache" ? ` (${ cacheStatus.status }) ` : ' ',
        parsedUrl.host,
        parsedUrl.pathname,
      ].join(''),

      cache ? [
        ratelimit ? '├ ' : '└ ',
        'cache: ',
        cacheStatus.status === "hit" ? `[expires at ${ milisecondToHumanReadableComplete(cacheStatus.expiresAt - Date.now()) }]` : '',
        cacheStatus.status === "error" ? `(error: ${ cacheStatus.error })` : '',
        ' ',
        `${ cache.opts.key }`,
        ' ',
      ].join('') : undefined,

      ratelimit ? [
        '└ ratelimit: ',
        `${ ratelimit.used }/${ ratelimit.limit } used`,
        `, resets in ${ milisecondToHumanReadableComplete(ratelimit.resetInSeconds * 1000) }`,
      ].join('') : undefined,

    ].filter(Boolean).forEach(e => logWithType('fetch', e))
  }



  if (cache) {
    const cached = cache.entry.getComplete()
    if (cached.status === "hit") {
      cacheStatus = { status: "hit", expiresAt: cached.expiresAt }
      printDetail(cached.content.ratelimit)
      return {
        response: undefined,
        json: cached.content.json,
        status: cached.content.status,
        statusText: cached.content.statusText,
        cache: { status: "hit", expiresAt: cached.expiresAt },
        ratelimit: cached.content.ratelimit,
      } satisfies AppFetchReturn
    }
    if (cached.status === "error") {
      cacheStatus = { status: "error", error: cached.error }
    }
    if (cached.status === "miss") {
      cacheStatus = { status: "miss" }
    }
  }

  const response = await fetch(url, opts)
  const ratelimit = resultOpts?.ratelimit ? resultOpts.ratelimit(response) : undefined
  const json = await jsonOrUndefined(response)

  if (cache) {
    const cacheDurationFn
      = typeof cache.opts.duration === "function" ? cache.opts.duration
        : () => cache.opts.duration as Duration

    const cacheDuration = cacheDurationFn(response)
    if (durationToMs(cacheDuration) !== 0) {
      const cachedResult: CachedResult = {
        json,
        status: response.status,
        statusText: response.statusText,
        ratelimit,
      }
      cache.entry.set(cachedResult, cacheDuration)
    }
  }

  printDetail(ratelimit)
  return {
    response,
    json,
    status: response.status,
    statusText: response.statusText,
    cache: cacheStatus,
    ratelimit,
  } satisfies AppFetchReturn
}



// Tests

(() => {
  appFetch2("github", {}, {
    cache: {
      key: "github",
      duration: (res) => {
        return "1h"
      }
    }
  })
})

// Utils

async function jsonOrUndefined(res: Response) {
  try {
    return await res.json()
  } catch (error) {
    return undefined
  }
}