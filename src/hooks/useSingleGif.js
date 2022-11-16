import { useEffect, useState } from "react";
import getGifs from "services/getGifs";
const useSingleGif = ({ id }) => {
  const [loadingGif, setLoadingGif] = useState(true);
  const [singleGif, setGif] = useState({});
  useEffect(() => {
    setLoadingGif(true);
    getGifs({ single: true, query: id })
      .then((gif) => setGif(gif))
      .then((_) => setLoadingGif(false));
  }, []);
  return { singleGif, loadingGif };
};
export default useSingleGif;
