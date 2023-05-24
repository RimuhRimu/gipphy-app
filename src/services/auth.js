const URL = 'http://localhost:8080'
export default async function auth({ localJWT }) {
  const res = await fetch(`${URL}/auth`, {
    method: "POST",
    body: JSON.stringify({
      jwt: localJWT
    })
  })
  if (!res.ok)
    throw new Error("Response not okay")
  const json = await res.json()
  const { success } = json
  return success
}
