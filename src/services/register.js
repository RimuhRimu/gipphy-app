const URL = process.env.REACT_APP_BACKEND_DIR
export default async function registerService({ username, password }) {
  const res = await fetch(`${URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  if (!res.ok)
    throw new Error("Response not okay")
  const json = await res.json()
  const { jwt } = json
  return jwt
}
