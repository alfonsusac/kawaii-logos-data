import { frontendDomain, frontendPreviewDomain } from "./domain"
import { isInGitHubAction, revalidateToken } from "./env"

export async function revalidateMainWebsite() {
  if (isInGitHubAction && revalidateToken) {
    const res = await Promise.allSettled(
      [
        fetch(`${ frontendDomain }/revalidate`, {
          body: JSON.stringify({
            token: revalidateToken,
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        }).then((res) => ({ res: res.json(), url: `${ frontendDomain }/revalidate` })).catch((err) => {
          console.error("Failed to revalidate main website:", err)
          return
        }),
        fetch(`${ frontendPreviewDomain }/revalidate`, {
          body: JSON.stringify({
            token: revalidateToken,
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        }).then((res) => ({ res: res.json(), url: `${ frontendPreviewDomain }/revalidate` })).catch((err) => {
          console.error("Failed to revalidate preview website:", err)
        }),
        fetch(`http://localhost:3000/revalidate`, {
          body: JSON.stringify({
            token: revalidateToken,
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        }).then((res) => ({ res: res.json(), url: `http://localhost:3000/revalidate` })).catch((err) => {
          console.error("Failed to revalidate local development server:", err)
        })
      ]
    )
    res.forEach((r) => {
      if (r.status === "fulfilled") {
        console.log(`ok: ${ r.value }`)
      } else {
        console.log(`rejected: ${ r.reason }`)
      }
    })
  }
}