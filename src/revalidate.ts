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
    }).then((res) => res.json()).catch((err) => {
      console.error("Failed to revalidate main website:", err)
    })
  }
  fetch(`http://localhost:3000/revalidate`, {
    body: JSON.stringify({
      token: revalidateToken,
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then((res) => res.json()).catch((err) => {
    console.error("Failed to revalidate local development server:", err)
  })
}