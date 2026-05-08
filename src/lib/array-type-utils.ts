export type NonEmptyArray<T> = [ T, ...T[] ]

// export type SingleOrNonEmptyArray<T> = T | NonEmptyArray<T>

// export function resolveSingleOrNonEmptyArray<T>(input: SingleOrNonEmptyArray<T> | undefined): T[] {
//   if (!input) return []
//   return Array.isArray(input) ? input : [ input ]
// }

export type ArrayOrSingle<T> = T | T[]

export function resolveArrayOrSingleToArray<T>(def: ArrayOrSingle<T> | undefined): T[] {
  if (!def) return []
  return Array.isArray(def) ? def : [ def ]
}