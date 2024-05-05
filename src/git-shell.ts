import { GitHub } from "./github-url"
import { rootDir } from "./paths"

export class Git {
  constructor(public readonly pathToGit: string = rootDir) { }

  static clone = async (what: string, cwd: string, args?: {
    quiet?: boolean,
  }) => {
    await Bun.$`git clone ${ args?.quiet ? "-q" : "" } ${ GitHub.gitUrl(what) } ${ cwd }`
    return new Git(cwd)
  }
  get cwd() {
    return this.pathToGit
  }
  clone = (what: string, args: {
    quiet?: boolean,
  }) => {
    return Git.clone(what, this.pathToGit, args)
  }
  
  add = (what: string) => {
    return Bun.$`git add ${ what }`.cwd(this.pathToGit)
  }
  branch = (args?: {
    showCurrent?: boolean,
    all?: boolean,
  }) => {
    return Bun.$`git branch ${ args?.showCurrent ? "--show-current" : "" }`
  }
  commit = (message: string) => {
    return Bun.$`git commit -m "${ message }"`.cwd(this.pathToGit)
  }
  log = (what: string, args?: {
    date?: string,
    diffFilter?: string,
    format?: string,
  }) => {
    return Bun.$`git log ${ args?.diffFilter ? `--diff-filter=${ args.diffFilter }` : "" } ${ args?.format ? `--format=${ args.format }` : "" } ${ args?.date ? `--date=${ args.date }` : "" } ${ what }`.cwd(this.pathToGit)
  }
  pull = (args?: {
    quiet?: boolean,
  }) => {
    return Bun.$`git pull ${ args?.quiet ? "-q" : ""}`.cwd(this.pathToGit)
  }
  push = (toWhere: string, what: string, args?: {
    setUpstream?: boolean,
  }) => {
    return Bun.$`git push ${ args?.setUpstream ? "-u" : "" } ${ toWhere } ${ what }`.cwd(this.pathToGit)
  }
  switch = (branch: string, args?: {
    orphan?: boolean,
  }) => {
    return Bun.$`git switch ${ args?.orphan ? "--orphan" : "" } ${ branch }`.cwd(this.pathToGit)
  }




}