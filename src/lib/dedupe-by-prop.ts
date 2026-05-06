export function dedupeByProp<O extends object>(arr: O[]) {
  return <F extends keyof O>(field: F) => {
    const seen = new Set()
    return arr.filter(item => {
      if (seen.has(item[ field ])) return false
      seen.add(item[ field ])
      return true
    })
  }
}
