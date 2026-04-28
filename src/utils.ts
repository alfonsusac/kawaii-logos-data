export function generateGitIgnore(...files: string[]) {
  return files.join("\n") + "\n"
}


export function normalizeArrayDef<T>(def: T | T[] | undefined): T[] {
  if (!def) return []
  return Array.isArray(def) ? def : [ def ]
}

export type ArrayOrSingle<T> = T | T[]

export function resolveArrayOrSingleToArray<T>(def: ArrayOrSingle<T> | undefined): T[] {
  if (!def) return []
  return Array.isArray(def) ? def : [ def ]
}
export function getFirstFromArrayOrSingle<T>(def: ArrayOrSingle<T> | undefined): T | undefined {
  if (!def) return undefined
  return Array.isArray(def) ? def[ 0 ] : def
}