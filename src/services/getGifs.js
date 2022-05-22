export default async function getGifs({query, limit = "25", page = 0}) {
  const searchURL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}`
  const trendingSearch = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&rating=g&offset=${page * limit}`
 
  const searchQuery = query ? 
  `${searchURL + '&q=' + query + `&limit=${limit}&offset=${page * limit}&rating=g&lang=en`}` : trendingSearch
  const res = await fetch(searchQuery)
  const json = await res.json()
  return json.data
}
