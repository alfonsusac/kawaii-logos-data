export type NonEmptyArray<T> = [ T, ...T[] ]

export type SingleOrNonEmptyArray<T> = T | NonEmptyArray<T>