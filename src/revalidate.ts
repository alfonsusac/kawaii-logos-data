import { isInGitHubAction, revalidateToken } from "./env"

export async function revalidateMainWebsite() {
  if (isInGitHubAction && revalidateToken) {
    fetch(`https://vtuberlogos.alfon.dev/revalidate?key=${ revalidateToken }`).then((res) => res.json())
  }
}