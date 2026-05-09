export type ISODate =
  | `${ number }-${ MonthNum }-${ DayNum2 }`

export type DateDef =
  | `${ number }-${ MonthNum }-${ DayNum2 }` // ISO 8601
  | `${ Mon } ${ DayNum }, ${ number }`     // English




export type Mon =
  | `Jan`
  | `Feb`
  | `Mar`
  | `Apr`
  | `May`
  | `Jun`
  | `Jul`
  | `Aug`
  | `Oct`
  | `Sep`
  | `Nov`
  | `Dec`

type MonthNum =
  | "01" | "02" | "03" | "04" | "05" | "06" | "07"
  | "08" | "09" | 10 | 11 | 12

type DayNum =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31
type DayNum2 =
  | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09"
  | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20"
  | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30"
  | "31"

export type TimeDef =
  | `${ HourDef }.${ MinuteDef } ${ AMPMDef }` // 2.27 PM
  | `${ HourDef4 }:${ MinuteDef }`             // ISO

type HourDef =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type HourDef2 =
  | "00" | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12"
type HourDef4 =
  | HourDef2 | "13" | "14" | "15" | "16" | "17" | "18"
  | "19" | "20" | "21" | "22" | "23" | "24"
type MinuteDef = `${ 0 | 1 | 2 | 3 | 4 | 5 }${ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 }`
type AMPMDef = "AM" | "PM"


// -----------------------------------------------------------------------------


export function resolveDate(dateDef: DateDef | undefined): {
  iso: `${ number }-${ number }-${ number }`
  date: Date
} | undefined {
  if (!dateDef) return undefined
  if (typeof dateDef === "string") {
    const parsed = Date.parse(dateDef)
    if (isNaN(parsed)) {
      console.log(new Error(`Invalid date format: ${ dateDef }`))
      return undefined
    }
    return {
      iso: new Date(parsed).toISOString().split('T')[ 0 ] as `${ number }-${ number }-${ number }`,
      date: new Date(parsed)
    }
  }
  console.log(new Error(`Unsupported date definition: ${ dateDef }`))
  return undefined
}