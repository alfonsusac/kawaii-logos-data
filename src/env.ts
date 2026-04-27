import { cyan, reset, yellow } from "./lib/ansii"
import { info, warn } from "./pipeline"

export const envGithubActions = process.env[ 'GITHUB_ACTIONS' ]
export const isInGitHubAction = envGithubActions === "true"
export const revalidateToken = process.env[ 'REVALIDATE_TOKEN' ]
export const environment = process.env.NODE_ENV

export function checkEnvVars() {

  if (envGithubActions === undefined) {
    warn(`${ cyan }GITHUB_ACTIONS${ yellow } environment variable not detected.${ reset }`)
  }
  if (isInGitHubAction) {
    info(`${ cyan }GITHUB_ACTIONS${ yellow } environment variable detected. Assuming GitHub Actions environment.${ reset }`)
  }
  if (revalidateToken === undefined) {
    warn(`${ cyan }REVALIDATE_TOKEN${ yellow } environment variable not detected.${ reset }`)
  }
  if (![ 'production', 'development' ].includes(environment || "")) {
    warn(`${ cyan }NODE_ENV${ yellow } environment variable is set to '${ environment }'. Expected 'production' or 'development'.${ reset }`)
  }
  if (environment === "development") {
    warn(`${ cyan }--watch${ yellow } mode used in bun dev. Skipping git switch and commit.\n  Use ${ cyan }'bun start'${ reset } to enable git switch and commit.${ reset }`)
  }
}