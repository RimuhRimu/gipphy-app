import Gif from "components/gif/gif.js";
import useGifs from "hooks/useGifs";
import VisorPagination from "components/visorPagination/index";
import Spinner from "components/spinner/spinner";
import "./listOfGifs.css";
import "components/spinner/spinner.css";
import useSEO from "hooks/useSEO";

const ListOfgifs = ({ params }) => {
  const { keyword } = params;
  useSEO({ title: keyword || "Gipphy App" });
  const { loadingGifs, gifs, setPage } = useGifs({ keyword });
  return (
    <>
      {loadingGifs ? (
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
                ></Gif>
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
