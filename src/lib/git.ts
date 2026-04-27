import { logger } from "./log"

const { verbose } = logger("git", { verbose: true })

export const Git = {
  trackAll: () => {
    verbose(`git add .`)
    return Bun.$`git add .`
  },

  commitAllTracked: (message: string) => {
    verbose(`git commit -m "${ message }" -a`)
    return Bun.$`git commit -m "${ message }" -a`
  },

  pushAndSetUpstream(branchName: string) {
    verbose(`git push -u origin ${ branchName }`)
    return Bun.$`git push -u origin ${ branchName }`
  },

  showCurrentBranch: async () => {
    verbose(`git branch --show-current`)
    return (await Bun.$`git branch --show-current`.text()).trim()
  },

  getAllBranch: async () => {
    verbose(`git branch --format="%(refname:short)" -a`)
    return Bun.$`git branch --format="%(refname:short)" -a`
      .text()
      .then(output => output
        .split('\n')
        .map(branch => branch.trim())
        .filter(branch => branch !== ''))
  },

  statusPorcelain: () => {
    verbose(`git status --porcelain`)
    return Bun.$`git status --porcelain`.text()
  },

  switch: (branchName: string) => {
    verbose(`git switch ${ branchName }`)
    return Bun.$`git switch ${ branchName }`
  },

  switchOrphan: (branchName: string) => {
    verbose(`git switch --orphan ${ branchName }`)
    return Bun.$`git switch --orphan ${ branchName }`
  },

  forceSwitch: (branchName: string) => {
    verbose(`git switch ${ branchName } --force`)
    return Bun.$`git switch ${ branchName } --force`
  },

  pull: () => {
    verbose(`git pull`)
    return Bun.$`git pull`
  },

  fetch: () => {
    verbose(`git fetch`)
    return Bun.$`git fetch`
  },

  checkHasBranch: async (branchName: string) => {
    const branches = await Git.getAllBranch()
    const hasLocal = branches.includes(branchName)
    const hasRemote = branches.includes(`origin/${ branchName }`)
    return { hasLocal, hasRemote }
  },

  checkHasUncommitedChanges: async () => {
    const status = await Git.statusPorcelain()
    return status.trim() !== ''
  },

  createNewLocalBranchWithoutHistory: (branchName: string) => {
    return Git.switchOrphan(branchName)
  },

  getCurrentBranch: () => {
    return Git.showCurrentBranch()
  },

}

