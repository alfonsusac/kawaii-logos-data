import type { History } from "../../types"
import type { Git } from "./git-shell"
import { logError, logProcess } from "./log"

export async function getHistory(file: string, git: Git) {
  try {
    const raw = await git.log(file, { pretty: "format:>%cD|%s", nameStatus: true })
    let history: History[] = parseCommitLog(raw)
    return history
  } catch (error) {
    logError(error, "Error retrieving commit log of file")
    return []    
  }
}

// ------

function parseCommitLog(log: string) {
  let history: History[] = []
  try {
    const historyItems = log.split(">")
    for (const item of historyItems) {
      if (item === "") continue
      const [l1, l2] = item.split("\n")
      const [date, message] = l1.split("|")
      const status = l2.split("\t")[0]
      history.push({ date, message, status: status as History["status"] })
    }
  } catch (error) {
    logError(error, "Error parsing commit log: invalid format")
  }
  return history
}

// ------

export async function getCreationDate(file: string, git: Git) {
  try {
    const res = (await git.log(file, {
      diffFilter: "A",
      format: "%cD",
      date: "short",
    })).replaceAll(`\n`, ``)
    return res
  } catch (error) {
    logError(error, "Error retrieving creation date of file")
    return undefined
  }
}