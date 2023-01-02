export default async function getGifs({
  query,
  rating = "g",
  limit = "25",
  page = 0,
  single = false,
}) {
  if (single) {
    const searchURL = `https://api.giphy.com/v1/gifs/${query}?api_key=${process.env.REACT_APP_API_KEY}`;
    const res = await fetch(searchURL);
    const json = await res.json();
    return json.data;
  }

  const searchURL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}`;
  const trendingSearch = `https://api.giphy.com/v1/gifs/trending?api_key=${
    process.env.REACT_APP_API_KEY
  }&limit=${limit}&rating=${rating}&offset=${page * limit}`;

  const searchQuery = query
    ? `${
        searchURL +
        "&q=" +
        query +
        `&limit=${limit}&offset=${page * limit}&rating=${rating}&lang=en`
      }`
    : trendingSearch;
  const res = await fetch(searchQuery);
  const json = await res.json();
  return json.data;
}
