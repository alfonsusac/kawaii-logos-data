import chalk from "chalk"
import { black, blue, cyan, green, magenta, red, reset, white, yellow } from "./ansii"
import path from "path"
import { readFileSync } from "fs"
import { log, verbose } from "../pipeline"

export const logError = (error?: any, message?: string, opts?: {
  hideStack?: boolean
}) => {
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


// -----

export function logger(prefix: string = '', options?: {
  verbose?: boolean
}) {
  const res = {
    info: (...args: any) =>
      log(`${ black }${ prefix ? prefix + ' ' : '' }${ blue }i${ reset }`, ...args, reset),
    verbose: (...args: any) =>
      options?.verbose ? verbose(`${ black }${ prefix ? prefix + ':' : '' }`, ...args, reset) : undefined,
    // success: (...args: any) =>
    //   log(`${ green }${ prefix } ✔️${ reset }`, ...args),

    error: (title: string, error?: any) => {
      logerror(`${ red } --- ✖️${ reset }`, title)
      if (error !== undefined) {
        logerror(error)
        logerror(`${ red } --- end of error ---${ reset }`)
      }
    },

  }
  return {
    ...res,
    loginfo: res.info,
    // logsuccess: res.success,
    logerror: res.error,
    logverbose: res.verbose,
  }
}

// -----




// only tested in MacOS. May not work in Windows.
export function logerror(error?: any, message?: string, opts?: {
  simple?: boolean
}) {
  const isSimple = opts?.simple ?? false
  if (isSimple) {
    log(`${ red }Error caught!`)
    log(`${ red }   name: ${ magenta }${ error.name ?? 'N/E' } ${ red }`)
    log(`${ red }message: ${ reset }${ error.message ?? 'N/E' }`)
  } else {
    log(`\n\n${ red }-- ${ ((message ?? 'Error occured!') + ' ').padEnd(80, '-') }`)
    log(`${ red }error instanceof Error: ${ error instanceof Error ? `${ green }true` : `${ yellow }false` }`)
  }



  if (error instanceof Error) {
    if (isSimple) {

    } else {
      log(`${ red }error.constructor.name:${ reset }`, error.constructor.name)
      log(`${ red }error.name:${ reset }`, error.name, reset)
      log(`${ red }error.message:${ reset }`, error.message, reset)
      log(`${ red }error.cause:${ reset }`, error.cause ?? `${ black }skill issue${ reset }`)
      log(`${ red }error.code:${ reset }`, (error as any).code, reset)
      log(`${ red }error.stack:${ reset }`)
    }


    if (!error.stack) return []
    let firstStackCodeContentFlag = false
    const stack = error.stack
      .split('\n')
      .slice(1)
      .map(line => line.split('at ')[ 1 ])
      .map(line => {
        // console.log(line)
        let token = ''
        let filepath = ''
        let cwdpath = ''
        let lineNumber = ''
        let column = ''
        let userland = false
        let filecontents: {
          lineNumber: string,
          content: string
        }[] = []
        let isFirstStackCodeContent = false
        let isMain = false

        if (line.startsWith('/')) {
          isMain = true;
          [ filepath, lineNumber, column ] = line.split(':')
        } else {
          let rest: string[] = [];
          [ token, ...rest ] = line.split(' (')
          const location = rest.join(' ').slice(0, -1);
          [ filepath, lineNumber, column ] = location.split(':')
        }
        if (filepath.startsWith(path.sep)) {
          cwdpath = path.relative(process.cwd(), filepath)
          userland = true
        } else {
          cwdpath = filepath
        }
        token ??= ''
        filepath ??= ''
        cwdpath ??= ''
        lineNumber ??= ''
        column ??= ''
        if (userland) {
          try {
            const contents = readFileSync(filepath, 'utf-8').split('\n')
            const range = 2 // number of lines to show before and after the error line
            const start = Math.max(0, parseInt(lineNumber) - range - 1)
            const end = Math.min(contents.length, parseInt(lineNumber) + range)
            filecontents = contents.slice(start, end).map((content, index) => {
              return {
                lineNumber: (start + index + 1).toString(),
                content
              }
            })
            if (!firstStackCodeContentFlag) {
              firstStackCodeContentFlag = true
              isFirstStackCodeContent = true
            }
          } catch (error) { }

        }
        return {
          token, filepath, lineNumber, column, line, cwdpath, userland, filecontents, isFirstStackCodeContent, isMain
        }
      })
    // console.log(stack)

    if (isSimple) {
      const x = stack[ 0 ]
      log(
        [
          `${ red }  where: `,
          `${ black }at `,
          x.isMain && `${ yellow }(main)${ reset } `,
          x.token && `${ x.userland ? magenta : blue }${ x.token }${ reset } `,
          `${ black }${ x.cwdpath }:${ reset }${ x.lineNumber }${ black }:${ reset }${ x.column }${ reset }`,
        ].filter(Boolean).join('')
      )
      log('')
    } else {
      log(
        stack.map(x => {
          return [
            [
              `  ${ black }at `,
              x.isMain && `${ yellow }(main)${ reset } `,
              x.token && `${ x.userland ? magenta : blue }${ x.token }${ reset } `,
              `${ black }${ x.cwdpath }:${ reset }${ x.lineNumber }${ black }:${ reset }${ x.column }${ reset }`,
            ].filter(Boolean).join(''),
            x.filecontents.length > 0 && x.isFirstStackCodeContent && [
              x.filecontents.map(line => {
                const isErrorLine = line.lineNumber === x.lineNumber
                if (isErrorLine) {
                  return [
                    `${ reset }${ line.lineNumber.padStart(4, ' ') } | ${ line.content }${ reset }`,
                    `${ reset }${ ''.padStart(4, ' ') } | ${ ''.padStart(Number(x.column), ' ') }${ yellow }^${ reset }`
                  ]
                } else {
                  return `${ black }${ line.lineNumber.padStart(4, ' ') } | ${ line.content }${ reset }`
                }
              })
                .flat(10)
                .map(l => `     ${ l }`),
              ''
            ]
          ]
            .filter(Boolean)
            .flat(10)
            .join('\n')
        }).join('\n')
      )
      log(`\n\n`)
    }

  } else {
    log(error)
  }
}


// export const logError = (error?: any, message?: string) => {
//   log(chalk.red('\n✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️'))
//   if (message)
//     log('message:', message)
//   if (error.message)
//     log(`Message: ${ error.message }`)
//   log(chalk.red('----------------------------------'))
//   if ('stderr' in error || 'stdout' in error) {
//     log('Shell Error')
//     log(`Stderr:    ${ error.stderr }`)
//     log(`Stdout:    ${ error.stdout }`)
//   } else {
//     log(error)
//   }
//   log(error)
//   log(chalk.red('✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️✖️'))
//   log('\n')
// }


export function logMajorStep(step: string) {
  log(`\n${ blue }=== ${ reset }${ step } ${ blue }===`)
}






