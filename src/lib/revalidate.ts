import { logProcess, logSuccess } from "./log"
import { revalidateToken, toJson } from "./util"

export async function revalidateWebsite() {
  logProcess("Revalidating website...")
  const data = await fetch(`https://vtuberlogos.alfon.dev/revalidate?key=${ revalidateToken }`).then(toJson)
  logSuccess(`Response: ` + data.message)
}
