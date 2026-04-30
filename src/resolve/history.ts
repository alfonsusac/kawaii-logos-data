import type { DateDef } from "./date"
import type { Reference, ReferenceDef } from "./references"

export type HistoryDef = []

export type HistoryEntryDef = {
  id: string,
  date: DateDef,
  type: "added" | "removed" | "updated",
  description?: string,
  reference: ReferenceDef,
}

export type History = {
  id: string,
  date: string,
  type: "added" | "removed" | "updated",
  description?: string,
  reference: Reference,
}[]