import { useEffect, useState } from "react";
import getGifs from "services/getGifs.js";

const INITIAL_PAGE = 0;
const useGigfs = ({ keyword,rating = "g" }) => {
  const [gifs, setGifs] = useState([]);
  const [loadingGifs, setLoadingGifs] = useState(true);
  const [page, setPage] = useState(INITIAL_PAGE);

  useEffect(() => {
    setLoadingGifs(true);
    getGifs({ query: keyword, rating: rating })
      .then((gifs) => setGifs(gifs))
      .then((_) => setLoadingGifs(false));
  }, [keyword,rating]);

  useEffect(() => {
    if (page === INITIAL_PAGE) return;
    getGifs({ query: keyword, rating: rating, page }).then((nextGifs) => {
      setGifs((prevGifs) => prevGifs.concat(nextGifs));
    });
  }, [page]);

  return { loadingGifs, gifs, setPage };
};
export default useGigfs;
