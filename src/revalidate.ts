import { frontendDomain, frontendPreviewDomain } from "./domain"
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
    }).then(async (res) => {
      const json = await res.json()
      console.log(`Revalidating to ${ frontendDomain }/revalidate OK: ${ res.status } ${ JSON.stringify(json, null, 2) }`)
    }).catch((err) => {
      console.error(`Failed to revalidate main website (${ frontendDomain }/revalidate):`, err)
    })
    fetch(`${ frontendPreviewDomain }/revalidate`, {
      body: JSON.stringify({
        token: revalidateToken,
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(async (res) => {
      const json = await res.json()
      console.log(`Revalidating to ${ frontendPreviewDomain }/revalidate OK: ${ res.status } ${ JSON.stringify(json, null, 2) }`)
    }).catch((err) => {
      console.error(`Failed to revalidate preview website (${ frontendPreviewDomain }/revalidate):`, err)
    })
  }

  if (!isInGitHubAction)
    fetch(`http://localhost:3000/revalidate`, {
      body: JSON.stringify({
        token: revalidateToken,
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then((res) => res.json()).catch((err) => {
      console.error("Failed to revalidate local development server (http://localhost:3000/revalidate):", err)
    })
}