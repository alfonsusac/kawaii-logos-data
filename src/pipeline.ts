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
    log(`\n${ blue }----${ reset }`, description, `${ blue }----${ reset }`)
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

type LogBuffer = {
  logs: any[][],
  warns: any[][],
  errors: any[][],
  verboses: any[][],
}

const logBuffer = new AsyncLocalStorage<LogBuffer>()

export async function usingLogBuffer<R>(cb: () => R) {

  const data = await logBuffer.run({
    logs: [],
    warns: [],
    errors: [],
    verboses: [],
  }, async () => {
    const res = await cb()
    const buffers = logBuffer.getStore() || {
      logs: [],
      warns: [],
      errors: [],
      verboses: [],
    }
    return { buffers, result: res }
  })

  return data
}

export function log(...messages: any[]) {
  const buffer = logBuffer.getStore()
  const indent = getIndent()
  if (buffer) {
    buffer.logs.push([ indent, ...messages ])
  } else {
    console.log(...[ indent, ...messages ])
  }
}

export function info(...args: any) {
  log(`${ blue }i${ reset }`, ...args, reset)
}
export function verbose(...args: any) {
  const buffer = logBuffer.getStore()
  buffer?.verboses.push([...args])
  log(`${ black }`, ...args, reset)
}
export function warn(...args: any) {
  const buffer = logBuffer.getStore()
  buffer?.warns.push([...args])
  log(`${ yellow }!${ reset }`, ...args, reset)
}
export function logerror(...args: any) {
  const buffer = logBuffer.getStore()
  buffer?.errors.push([...args])
  log(`${ red }✖️${ reset }`, ...args, reset)
}
// export function success(...args: any) {
//   log(`${ green }✔️${ reset }`, ...args, reset)
// }