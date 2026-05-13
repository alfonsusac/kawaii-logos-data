import { frontendDomain } from "./domain"
import { isInGitHubAction, revalidateToken } from "./env"

export async function revalidateMainWebsite() {
  if (isInGitHubAction && revalidateToken) {
    fetch(`${ frontendDomain }/revalidate`, {
      body: JSON.stringify({
        token: revalidateToken,
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then((res) => res.json())
  }
  fetch(`http://localhost:3000/revalidate`, {
    body: JSON.stringify({
      token: revalidateToken,
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then((res) => res.json())
}