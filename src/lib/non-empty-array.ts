export type NonEmptyArray<T> = [ T, ...T[] ]

export type SingleOrNonEmptyArray<T> = T | NonEmptyArray<T>

export function normalizeSingleOrNonEmptyArray<T>(input: SingleOrNonEmptyArray<T> | undefined): T[] {
  if (input === undefined) return []
  if (Array.isArray(input)) {
    return input as NonEmptyArray<T>
  }
  return [ input ] as NonEmptyArray<T>
}