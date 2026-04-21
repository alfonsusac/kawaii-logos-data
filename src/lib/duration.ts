export type Duration =
  | `${ number }s`
  | `${ number }m`
  | `${ number }m ${ number } s`
  | `${ number }h`
  | `${ number }h ${ number } m`
  | `${ number }h ${ number } m ${ number } s`
  | `${ number }d`
  | `${ number }d ${ number } h`
  | `${ number }d ${ number } h ${ number } m`
  | `${ number }d ${ number } h ${ number } m ${ number } s`

export function durationToSeconds(duration: Duration): number {
  const parts = duration.split(' ')
  let seconds = 0

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