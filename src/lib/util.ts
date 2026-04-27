import { logProcess } from './log'

// export const isInGitHubAction = process.env['GITHUB_ACTIONS'] === "true"

// export const allImgGlob = `**/*.{png,svg,jpg,jpeg,gif,webp,avif,apng,tiff}`

// ----------------------------

// Settle all promises and return an array of the results
// export const resolveIntoArray = <T>(
//   promises: Promise<T>[]
// ) => Promise.allSettled(promises)
//   .then(
//     results => results.map(
//       // If the promise was rejected, return an empty array
//       res => res.status === "rejected" ? [] : res.value
//     )
//   )
//   // Flatten the array of arrays
//   .then(results => results.flat())

// ----------------------------

// export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// export const logAndDelay = async (message: string) => {
//   logProcess(message)
//   // await delay(2000)
// }

// ----------------------------

// export function generateGitIgnore(...files: string[]) {
//   return files.join("\n") + "\n"
// }

// ----------------------------

// export const toJson = (res: Response) => res.json()

// ----------------------------

// export const revalidateToken = process.env[ 'REVALIDATE_TOKEN' ]

// ----------------------------

// export function groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]> {
//   return list.reduce((result, item) => {
//     const key = getKey(item)
//     if (!result[key]) {
//       result[key] = []
//     }
//     result[key].push(item)
//     return result
//   }, {} as Record<K, T[]>)
// }

