import { GitHub } from "./github-url"
import { root, rootDir } from "./paths"

export class Git {
  public readonly path: string
  constructor(path: string = '') {
    // Bun shell commands always starts at binary locaiton of Bun installation.
    //  Therefore, we need to set the cwd relative to the root of the project.
    this.path = root(path) 
  }
  get cwd() {
    return this.path
  }
  static clone = async (what: string, args?: {
    quiet?: boolean,
  }, where?: string) => {
    await Bun.$`git clone ${ args?.quiet ? "-q" : "" } ${ GitHub.gitUrl(what) } ${ where }`
    return new Git(where)
  }
  clone = (what: string, args: {
    quiet?: boolean,
  }) => {
    return Git.clone(what, args, this.path)
  }
  static add = (what: string, cwd?: string) => {
    return cwd ? Bun.$`git add ${ what }`.cwd(cwd) : Bun.$`git add ${ what }`
  }
  add = async (what: string) => {
    await Bun.$`pwd`.cwd(this.path)
    await Bun.$`git branch`.cwd(this.path)
    await Bun.$`git status`.cwd(this.path)
    await Bun.$`ls -help`.cwd(this.path)
    return Bun.$`git add ${ what }`.cwd(this.path)
  }
  branch = (args?: {
    showCurrent?: boolean,
    all?: boolean,
  }) => {
    return Bun.$`git branch ${ args?.showCurrent ? "--show-current" : "" }`
  }
  commit = (message: string) => {
    return Bun.$`git commit -m "${ message }"`.cwd(this.path)
  }
  log = (what: string, args?: {
    date?: string,
    diffFilter?: string,
    format?: string,
  }) => {
    return Bun.$`git log ${ args?.diffFilter ? `--diff-filter=${ args.diffFilter }` : "" } ${ args?.format ? `--format=${ args.format }` : "" } ${ args?.date ? `--date=${ args.date }` : "" } ${ what }`.cwd(this.path)
  }
  pull = (args?: {
    quiet?: boolean,
  }) => {
    return Bun.$`git pull ${ args?.quiet ? "-q" : ""}`.cwd(this.path)
  }
  push = (toWhere: string, what: string, args?: {
    setUpstream?: boolean,
  }) => {
    return Bun.$`git push ${ args?.setUpstream ? "-u" : "" } ${ toWhere } ${ what }`.cwd(this.path)
  }

  switch = async (branch: string, args?: {
    orphan?: boolean,
    force?: boolean,
  }) => {
    return Bun.$`git switch ${ args?.orphan ? "--orphan" : "" } ${ branch } ${ args?.force ? "--force" : "" } `.cwd(this.path)
  }




}