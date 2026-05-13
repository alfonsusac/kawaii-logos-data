// WIP

import { logWithType, warn } from "../pipeline"
import { black } from "./ansii"
import { durationToMs, milisecondToHumanReadableComplete, type Duration } from "./duration"
import { logger } from "./log"

// -------------------------------------------------------

const verboselog = true
const log = (...message: any[]) => logWithType.bind(null, "cache")('cache:', ...message)

// -------------------------------------------------------

const inFlightMap = new Map<any, Promise<any>>()

function dedupe<O>(fn: () => Promise<O>, key: string) {
  return () => {
    if (inFlightMap.has(key)) {
      return inFlightMap.get(key)! as Promise<O>
    }
    const promise = fn().finally(() => {
      inFlightMap.delete(key)
    })
    inFlightMap.set(key, promise)
    return promise
  }
}

// -------------------------------------------------------

type CacheData = Record<string, CacheEntry>
type CacheEntry = {
  value: string,
  expiresAt: number,
}
function validateCacheData(content: unknown): asserts content is CacheData {
  if (typeof content !== "object" || content === null) {
    throw new Error("Cache file content is not an object")
  }
  Object.values(content).forEach(entry => {
    if (typeof entry !== "object" || entry === null
      || "value" in entry === false || "expiresAt" in entry === false
      || typeof entry.value !== "string" || typeof entry.expiresAt !== "number"
    ) {
      throw new Error("Cache entry is corrupted")
    }
  })
}

// -------------------------------------------------------

export function createSingleQueue() {
  let queue = Promise.resolve()
  function enqueue(fn: () => Promise<void>) {
    queue = queue.then(fn, fn)
    return queue
  }
  return enqueue
}

// -------------------------------------------------------

const cacheFileDir = ".temp/cache.json"
export const cacheInstance = createFileCache({
  filePath: cacheFileDir,
  readJson: async (file) => {
    return await file.json()
  },
  writeJson: async (file, content) => {
    await file.write(content)
  },
})

// -------------------------------------------------------

export function createFileCache(opts: {
  filePath: string,
  readJson: (file: Bun.BunFile) => Promise<unknown>,
  writeJson: (file: Bun.BunFile, content: string) => Promise<void>,
}) {
  const file = Bun.file(opts.filePath)

  let cacheData: null | CacheData = null
  let writeScheduled = false

  const enqueueCacheDataFile = createSingleQueue()
  const enqueueInitialization = createSingleQueue()

  function enqueueSaveCacheData() {
    if (writeScheduled) return Promise.resolve()
    writeScheduled = true
    return enqueueCacheDataFile(async () => {
      writeScheduled = false
      if (!cacheData) throw new Error("Cache data not initialized")
      await opts.writeJson(file, JSON.stringify(cacheData))
    })
  }

  async function mutateAndEnqueueResetCacheData() {
    cacheData = {}
    await enqueueSaveCacheData().catch(() => { })
  }

  async function initializeCacheData() {
    await enqueueInitialization(async () => {
      if (cacheData !== null) {
        return
      }
      const exists = await file.exists()
      if (!exists) {
        await mutateAndEnqueueResetCacheData()
      } else {
        try {
          const content = await opts.readJson(file)
          validateCacheData(content)
          cacheData = content
          log(`Cache data initialized successfully. Count: ${ Object.keys(cacheData).length } entries. Size: ${ Math.round(file.size / 1024) } kb.`)
        } catch (error) {
          warn("  - Failed to read or parse cache file, resetting cache data. Error:", error)
          mutateAndEnqueueResetCacheData()
        }
      }
    })
  }

  function get(key: string) {
    if (!cacheData) throw new Error("Cache data not initialized")
    const entry = cacheData[ key ]
    if (entry && entry.expiresAt > Date.now())
      return entry
    return undefined
  }

  function set(key: string, value: string, msduration: number) {
    if (!cacheData) throw new Error("Cache data not initialized")
    const expiresAt = Date.now() + msduration
    cacheData[ key ] = { value, expiresAt }
    enqueueSaveCacheData()
      .catch((error) => {
        warn("Failed to set cache entry, ignoring cache", error)
      })
    return value
  }

  return {
    initializeCacheData,
    get,
    set,
  }
}

// -------------------------------------------------------

export function cacheEntry<T>(key: string) {
  return {
    getComplete() {
      const entry = cacheInstance.get(key)
      if (!entry) {
        return { status: "miss", content: undefined } as const
      }
      try {
        const content = JSON.parse(entry.value)
        return { status: "hit", content: content as T, expiresAt: entry.expiresAt } as const
      } catch (error) {
        return { status: "error", content: undefined, error } as const
      }
    },
    get() {
      const entry = cacheInstance.get(key)
      if (!entry) {
        verboselog && console.log(black, `- MISS ${ key }`)
        return undefined
      }
      try {
        const content = JSON.parse(entry.value)
        verboselog && log(`HIT ${ key } expires in ${ milisecondToHumanReadableComplete(Math.round((entry.expiresAt - Date.now()))) }`)
        return content as T
      } catch (error) {
        console.warn("Failed to parse cache entry, ignoring cache", error)
      }
    },
    set(value: T, duration: Duration) {
      cacheInstance.set(key, JSON.stringify(value), durationToMs(duration))
    },
  }
}

// -------------------------------------------------------


// -------------------------------------------------------

export async function cacheAsync<T>(
  key: string,
  fn: () => Promise<T>,
  duration: Duration,
): Promise<T> {

  const entry = cacheInstance.get(key)
  if (entry) {
    try {
      const content = JSON.parse(entry.value) as T
      verboselog && log(`HIT ${ key } expires in ${ Math.round((entry.expiresAt - Date.now()) / 1000) }s`)
      return content
    } catch (error) {
      console.warn("Failed to parse cache entry, ignoring cache", error)
    }
  }
  verboselog && console.log(black, `- MISS ${ key }`)
  const newValue = await dedupe<T>(fn, key)()
  cacheInstance.set(key, JSON.stringify(newValue), durationToMs(duration))
  return newValue

}

// -------------------------------------------------------



// -------------------------------------------------------
// -------------------------------------------------------
// -------------------------------------------------------
// Tests

export async function testCacheAsync() {

  function getCount() {
    return cacheAsync("count", async () => {
      console.log("Running expensive operation...")
      return Math.random() // Simulate an expensive async operation
    }, "1s")
  }

  const result1 = await getCount()
  const result2 = await getCount()
  if (result1 === result2) {
    console.log("Test passed: Cached value returned")
  }
  await Bun.sleep(1100) // Wait for cache to expire
  const result3 = await getCount()
  if (result3 !== result1) {
    console.log("Test passed: Cache expired and new value returned")
  }

  const res = await Promise.all(
    Array.from({ length: 100 }).map(() => getCount())
  )
  if (res.every(value => value === res[ 0 ])) {
    console.log("Test passed: Concurrent calls deduped and cached value returned")
  }

}