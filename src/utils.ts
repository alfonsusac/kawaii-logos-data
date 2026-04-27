export function generateGitIgnore(...files: string[]) {
  return files.join("\n") + "\n"
}