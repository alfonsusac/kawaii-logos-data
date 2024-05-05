export const GitHub = {
  rawFileUrl: (repoPath: string, branch: string, file: string) =>
    `https://raw.githubusercontent.com/${ repoPath }/${ branch }/${ file }`,
  sourceFilePageUrl: (repoPath: string, branch: string, file: string) =>
    `https://github.com/${ repoPath }/blob/${ branch }/${ file }`,
  gitUrl: (repoPath: string) =>
    `https://github.com/${ repoPath }.git`,

  selfHostedStaticAssetUrl: (filename: string) => {
    // TODO: Replace with actual self-hosted URL
  },
  userProfileUrl: (username: string) =>
    `https://github.com/${ username }`,
  userAvatarUrl: (username: string) =>
    `https://avatars.githubusercontent.com/${ username }`,
  repositoryUrl: (repoPath: string) =>
    `https://github.com/${ repoPath }`,
}

export const getAvatarURLfromRepoPath = (repoPath: string) => {
  const username = repoPath.split("/")[0]
  return GitHub.userAvatarUrl(username)
}