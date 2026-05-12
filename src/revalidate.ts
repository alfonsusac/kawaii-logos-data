import { frontendDomain } from "./domain"
import { isInGitHubAction, revalidateToken } from "./env"

export async function revalidateMainWebsite() {
  if (isInGitHubAction && revalidateToken) {
    fetch(`${ frontendDomain }/revalidate?key=${ revalidateToken }`).then((res) => res.json())
  }
}