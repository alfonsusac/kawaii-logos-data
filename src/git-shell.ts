import { GitHub } from "./url-github"
import { root, rootDir } from "./paths"

export class Git {
  public readonly path: string
  constructor(path: string = '') {
    // Bun shell commands always starts at binary locaiton of Bun installation.
    //  Therefore, we need to set the cwd relative to the root of the project.
    this.path = root(path)
  }
  get cwd() { return this.path }

  static clone = async (what: string, args?: GitCloneOptions, where?: string) => {
    await Bun.$`git clone ${ args?.quiet ? "-q" : "" } ${ GitHub.gitUrl(what) } ${ where }`
    return new Git(where)
  }
  clone = (what: string, args?: GitCloneOptions) => {
    return Git.clone(what, args, this.path)
  }

  static add = (what: string, cwd?: string) => {
    return cwd ? Bun.$`git add ${ what }`.cwd(cwd) : Bun.$`git add ${ what }`
  }
  add = async (what: string) => {
    return Git.add(what, this.path)
  }

  static branch = (args?: GitBranchOptions, cwd?: string) => {
    const cmd = Bun.$`git branch ${ args?.showCurrent ? "--show-current" : "" } ${ args?.all ? "-a" : "" }`
    return cwd ? cmd.cwd(cwd) : cmd
  }
  branch = (args?: GitBranchOptions) => {
    return Git.branch(args, this.path)
  }

  static commit = (message: string, cwd?: string) => {
    const cmd = Bun.$`git commit -m "${ message }"`
    return cwd ? cmd.cwd(cwd) : cmd
  }
  commit = (message: string) => {
    return Git.commit(message, this.path)
  }

  static log = (what: string, args?: GitLogOptions, cwd?: string) => {
    const cmd = Bun.$`git log ${ args?.diffFilter ? `--diff-filter=${ args.diffFilter }` : "" } ${ args?.format ? `--format=${ args.format }` : "" } ${ args?.date ? `--date=${ args.date }` : "" } ${ what }`
    return cwd ? cmd.cwd(cwd) : cmd
  }
  log = (what: string, args?: GitLogOptions) => {
    return Git.log(what, args, this.path)
  }

  static pull = (args?: GitPullOptions, cwd?: string) => {
    const cmd = Bun.$`git pull ${ args?.quiet ? "-q" : "" }`
    return cwd ? cmd.cwd(cwd) : cmd
  }
  pull = (args?: GitPullOptions) => {
    return Git.pull(args, this.path)
  }

  static push = (toWhere: string, what: string, args?: GitPushOptions, cwd?: string) => {
    const cmd = Bun.$`git push ${ args?.setUpstream ? "-u" : "" } ${ toWhere } ${ what }`
    return cwd ? cmd.cwd(cwd) : cmd
  }
  push = (toWhere: string, what: string, args?: GitPushOptions) => {
    return Git.push(toWhere, what, args, this.path)
  }

  static switch = (branch: string, args?: GitSwitchOptions, cwd?: string) => {
    const cmd = Bun.$`git switch ${ args?.orphan ? "--orphan" : "" } ${ branch } ${ args?.force ? "--force" : "" }`
    return cwd ? cmd.cwd(cwd) : cmd
  }

  switch = async (branch: string, args?: GitSwitchOptions) => {
    return Git.switch(branch, args, this.path)
  }
}

interface GitCloneOptions {
  quiet?: boolean
}
interface GitAddOptions { 
}
interface GitBranchOptions {
  showCurrent?: boolean,
  all?: boolean,
}
interface GitLogOptions {
  date?: string,
  diffFilter?: string,
  format?: string,
}
interface GitPullOptions {
  quiet?: boolean,
}
interface GitPushOptions {
  setUpstream?: boolean,
}
interface GitSwitchOptions {
  orphan?: boolean,
  force?: boolean,
}