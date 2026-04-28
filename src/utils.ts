export function generateGitIgnore(...files: string[]) {
  return files.join("\n") + "\n"
}


export function normalizeArrayDef<T>(def: T | T[] | undefined): T[] {
  if (!def) return []
  return Array.isArray(def) ? def : [ def ]
}