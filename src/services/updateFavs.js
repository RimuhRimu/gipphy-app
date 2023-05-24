const URL = 'http://localhost:8080'
export default async function handleFavs({ jwt, operation, ID }) {
  const operations = {
    del: async (jwt) => {
      const res = await fetch(`${URL}/favs/${ID}`, {
        method: "DELETE",
        body: JSON.stringify({ jwt })
      })
      if (!res.ok)
        throw new Error("Response not okay")
      const json = await res.json()
      const { success } = json
      return { success }
    },
    add: async (jwt) => {
      const res = await fetch(`${URL}/favs/${ID}`, {
        method: "POST",
        body: JSON.stringify({ jwt })
      })
      if (!res.ok)
        throw new Error("Response not okay")
      const json = await res.json()
      const { success } = json
      return { success }
    },
    get: async (jwt) => {
      const res = await fetch(`${URL}/favs`, {
        method: "POST",
        body: JSON.stringify({ jwt })
      })
      if (!res.ok)
        throw new Error("Response not okay")
      const json = await res.json()
      const { success, favs } = json
      return {
        success,
        favs
      }
    }
  }
  return operations[operation](jwt)
}
