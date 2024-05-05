import type { ShellError } from "bun"
import chalk from "chalk"

export const logError = (message: string, error?: any) => {
  console.log(
    ` ${ chalk.red('✖️') } ${ message }${ error ? '\n' : '' }${ chalk.gray(error?.stderr ?? error ?? "") }`
  )
}

export const logSuccess = (message: string) => {
  console.log(
    ` ${ chalk.green('✔️') } ${ message }`
  )
}

export const logProcess = (message: string) => {
  console.log(
    ` ${ chalk.yellow('⚡️') }${ message }`
  )
}