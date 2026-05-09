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

export function checkDuplicates<O extends object>(arr: O[], by: keyof O) {
  const seen = new Set()
  const duplicates = new Set()
  arr.forEach(item => {
    if (seen.has(item[ by ])) {
      duplicates.add(item[ by ])
    } else {
      seen.add(item[ by ])
    }
  })
  return {
    hasDuplicates: duplicates.size > 0,
    duplicates: Array.from(duplicates),
    deduped: dedupeByProp(arr)(by)
  }
}