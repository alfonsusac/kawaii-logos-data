import { resolve } from 'path'


export const rootDir = import.meta.env['PWD'] ?? process.cwd()

export function root(...args: string[]) {
  return resolve(rootDir, ...args)
}

export const pathToGeneratedImageJSON = root(".kawaii/images.json")

export const pathToTempClonedRepo = root(".kawaii/cloned")