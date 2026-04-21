import chalk from "chalk"
import { black, blue, green, red, reset } from "./ansii"
const log = console.log

export const logError = (error?: any, message?: string) => {
  log(chalk.red('\n✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️'))
  if (message)
    log('message:', message)
  if (error.message)
    log(`Message: ${ error.message }`)
  log(chalk.red('----------------------------------'))
  if ('stderr' in error || 'stdout' in error) {
    log('Shell Error')
    log(`Stderr:    ${ error.stderr }`)
    log(`Stdout:    ${ error.stdout }`)
  } else {
    log(error)
  }
  log(error)
  log(chalk.red('✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️'))
  log('\n')
}

export const logSuccess = (...arg: any) =>
  log(` ${ chalk.green('✔️') }`, ...arg)

export const logProcess = (...arg: any) =>
  log(` ${ chalk.yellow('⚡️') }`, ...arg)

export function logger(prefix: string = '') {
  return {
    info: (...args: any) =>
      console.log(`${ blue }${ prefix } i${ reset }`, ...args),
    
    success: (...args: any) =>
      console.log(`${ green }${ prefix } ✔️${ reset }`, ...args),

    error: (title: string, error?: any) => {
      console.log(`${ red }${ prefix } --- ✖️${ reset }`, title)
      if (error !== undefined) {
        console.log(error)
        console.log(`${ red }${ prefix } --- end of error ---${ reset }`)
      }
    },

    verbose: (...args: any) =>
      console.log(`${black} >`, ...args, reset)
  }
}

