import { black, blue, green, magenta, red, reset, yellow } from "./lib/ansii"
import { bskyFetchesCount } from "./lib/api/bsky"
import { githubFetchesCount } from "./lib/api/github"
import { AsyncLocalStorage } from "async_hooks"

const APP_TITLE = "kawaii-logos-data"


export function runApp(cb: () => Promise<void>) {
  (async () => {
    log(`${ blue }\n${ APP_TITLE } ${ green }(${ process.env.NODE_ENV })${ reset }`)
    try {
      await cb()
    } catch (error) {
      logerror(error)
    }

    log(`\n${ green }Process finished${ reset }`)

    info(`Total bluesky fetches: ${ magenta }${ bskyFetchesCount }`)
    info(`Total github fetches: ${ magenta }${ githubFetchesCount }`)
  })()
}

// ----------------------------------------------------

const stepDepth = new AsyncLocalStorage<number>()

function getIndent(add: number = 0) {
  const currentDepth = stepDepth.getStore() || 0
  return "  ".repeat(Math.max(currentDepth - 1, 0) + add)
}

export async function step<R>(
  description: string,
  cb: () => R
): Promise<R> {
  const currentDepth = stepDepth.getStore() || 0
  const indent = getIndent()

  if (currentDepth === 0) {
    log(`\n${ blue }[${ reset }`, description, `${ blue }]${ reset }`)
  }
  if (currentDepth === 1) {
    log(`${ blue }-${ reset }`, description, `${ blue }${ reset }`)
  }
  if (currentDepth >= 2) {
    log(`${ indent }${ blue }-${ reset }`, description)
  }

  return stepDepth.run(currentDepth + 1, cb)
}

// ----------------------------------------------------

export type LogBufferType =
  | "log"
  | "verbose"
  | "info"
  | "warn"
  | "error"
  | (string & {})

export type LogBuffer = {
  type: LogBufferType, message: any[]
}[]

const logBuffer = new AsyncLocalStorage<LogBuffer>()

export async function usingLogBuffer<R>(cb: () => R) {

  const data = await logBuffer.run([], async () => {
    const res = await cb()
    const buffers = logBuffer.getStore() || []
    return { buffers, result: res }
  })

  return data
}


export function logWithType(type: LogBufferType, ...messages: any[]) {
  const buffer = logBuffer.getStore()
  const indent = getIndent()
  if (buffer)
    buffer.push({ type, message: [ indent, ...messages ] })
  else
    console[ type === "error" ? "error" : "log" ](...messages)
}


export function log(...messages: any[]) {
  logWithType("log", ...messages)
}

export function info(...args: any) {
  logWithType("info", `${ blue }i${ reset }`, ...args, reset)
}
export function verbose(...args: any) {
  logWithType("verbose", ...args, reset)
}
export function warn(...args: any) {
  logWithType("warn", `${ yellow }!${ reset }`, ...args, reset)
}
export function logerror(...args: any) {
  logWithType("error", `${ red }✖️${ reset }`, ...args, reset)
}
export function logger(type: LogBufferType) {
  return (...args: any) => logWithType(type, ...args, reset)
}