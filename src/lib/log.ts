import { ShellError } from "bun"
import chalk from "chalk"
const log = console.log

export const logError = (error?: any, message?: string) => {
  log(chalk.red('\n✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️'))
  if (message)
    log(chalk.red('✖️'), message)
  if (error.message)
    log(chalk.red('✖️'), `Message: ${ error.message }`)
  log(chalk.red('✖️ ----------------------------------'))
  if ('stderr' in error || 'stdout' in error) {
    log(chalk.red('✖️'), 'Shell Error')
    log(chalk.red('✖️'), `Stderr:    ${ error.stderr }`)
    log(chalk.red('✖️'), `Stdout:    ${ error.stdout }`)
  } else { 
    log(error)
  }
  log(chalk.red('✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️'))
  log('\n')
}

export const logSuccess = (...arg: any) =>
  log(` ${ chalk.green('✔️') }`, ...arg)


export const logProcess = (...arg: any) =>
  log(` ${ chalk.yellow('⚡️') }`, ...arg)
