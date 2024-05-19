export const GitHub = {
  userProfileUrl: (username: string) =>
    `https://github.com/${ username }`,
  repositoryUrl: (repoPath: string) =>
    `https://github.com/${ repoPath }`,
  gitUrl: (repoPath: string) =>
    `https://github.com/${ repoPath }.git`,
  sourceFilePageUrl: (repoPath: string, branch: string, file: string) =>
    `https://github.com/${ repoPath }/blob/${ branch }/${ file }`,
  rawFileUrl: (repoPath: string, branch: string, file: string) =>
    `https://raw.githubusercontent.com/${ repoPath }/${ branch }/${ file }`,
  selfHostedStaticAssetUrl: (filename: string) =>
    `https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/main/assets/${ filename }`,
  userAvatarUrl: (username: string) =>
    `https://avatars.githubusercontent.com/${ username }`,
}

export const getAvatarURLfromRepoPath = (repoPath: string) => {
  const username = repoPath.split("/")[0]
  return GitHub.userAvatarUrl(username)
}