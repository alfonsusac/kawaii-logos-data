export type Duration =
  | `${ number }s`
  | `${ number }m`
  | `${ number }m ${ number }s`
  | `${ number }h`
  | `${ number }h ${ number }s`
  | `${ number }h ${ number }m`
  | `${ number }h ${ number }m ${ number }s`
  | `${ number }d`
  | `${ number }d ${ number }s`
  | `${ number }d ${ number }m`
  | `${ number }d ${ number }m ${ number }s`
  | `${ number }d ${ number }h`
  | `${ number }d ${ number }h ${ number }s`
  | `${ number }d ${ number }h ${ number }m`
  | `${ number }d ${ number }h ${ number }m ${ number }s`
  | `infinite`
  | `instant`

export function durationToSeconds(duration: Duration): number {
  const parts = duration.split(' ')
  let seconds = 0

  if (duration === 'infinite') {
    return Number.POSITIVE_INFINITY
  }
  if (duration === 'instant') {
    return 0
  }

  for (const part of parts) {
    const value = parseInt(part)
    if (part.endsWith('s')) {
      seconds += value
    } else if (part.endsWith('m')) {
      seconds += value * 60
    } else if (part.endsWith('h')) {
      seconds += value * 3600
    } else if (part.endsWith('d')) {
      seconds += value * 86400
    }
  }

  return seconds
}

export function durationToMs(duration: Duration): number {
  return durationToSeconds(duration) * 1000
}


export function dateAfterDuration(date: Date, duration: Duration) {
  const seconds = durationToSeconds(duration)
  return new Date(date.getTime() + seconds * 1000)
}

export function milisecondToHumanReadableComplete(ms: number) {
  const seconds = Math.floor(ms / 1000) % 60
  const minutes = Math.floor(ms / (1000 * 60)) % 60
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))

  const parts = []
  if (days > 0) parts.push(`${ days }d`)
  if (hours > 0) parts.push(`${ hours }h`)
  if (minutes > 0) parts.push(`${ minutes }m`)
  if (seconds > 0) parts.push(`${ seconds }s`)

  return parts.join(' ')
}