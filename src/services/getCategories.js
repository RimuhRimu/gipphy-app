export default async function getCategories() {
  const url = `https://api.giphy.com/v1/gifs/categories?api_key=${process.env.REACT_APP_API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
}
