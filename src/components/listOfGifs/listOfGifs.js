import Gif from "components/gif/gif.js";
import useGifs from "hooks/useGifs";
import VisorPagination from "components/visorPagination/index";
import Spinner from "components/spinner/spinner";
import "./listOfGifs.css";
import "components/spinner/spinner.css";
import useSEO from "hooks/useSEO";
import useUser from "hooks/useUser";
import { useContext, useEffect } from "react";
import { GlobalContext } from "components/global";

const ListOfgifs = ({ params }) => {
  const { keyword = "", rating = "g" } = params;
  useSEO({ title: keyword || "Gipphy App" });
  const { loadingGifs, gifs, setPage } = useGifs({ keyword, rating });
  const { loadingFavs, favHandle, favs } = useUser()
  const { global } = useContext(GlobalContext)
  const { isAuth } = global
  useEffect(() => {
    favHandle({ operation: "get" })
  }, [isAuth])

  return (
    <>
      {loadingGifs && loadingFavs ? (
        <Spinner></Spinner>
      ) : (
        <>
          <div className="wrapper">
            <div className="listOfGifs">
              {gifs.map((gif) => (
                <Gif
                  url={gif.images.downsized_medium.url}
                  name={gif.title}
                  id={gif.id}
                  key={gif.id}
                  isFavInitial={Boolean(favs?.find(id => id === gif.id))}
                />
              ))}
            </div>
            <VisorPagination setPage={setPage}></VisorPagination>
          </div>
        </>
      )}
    </>
  );
};

export default ListOfgifs;
