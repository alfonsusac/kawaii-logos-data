export const black = `\x1b[30m`
export const red = `\x1b[31m`
export const green = `\x1b[32m`
export const yellow = `\x1b[33m`
export const blue = `\x1b[34m`
export const magenta = `\x1b[35m`
export const cyan = `\x1b[36m`
export const white = `\x1b[37m`

export const bgBlack = `\x1b[40m`
export const bgRed = `\x1b[41m`
export const bgGreen = `\x1b[42m`
export const bgYellow = `\x1b[43m`
export const bgBlue = `\x1b[44m`
export const bgMagenta = `\x1b[45m`
export const bgCyan = `\x1b[46m`
export const bgWhite = `\x1b[47m`

export const reset = `\x1b[0m`

export function printAnsiiTest() {
  console.log(`${ black }Black${ reset } ${ red }Red${ reset } ${ green }Green${ reset } ${ yellow }Yellow${ reset } ${ blue }Blue${ reset } ${ magenta }Magenta${ reset } ${ cyan }Cyan${ reset } ${ white }White${ reset }`)
}