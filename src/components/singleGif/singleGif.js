import Gif from "components/gif/gif";
import Spinner from "components/spinner/spinner";
import useSEO from "hooks/useSEO";
import useSingleGif from "hooks/useSingleGif";

const SingleGif = ({ params }) => {
  const { id } = params;
  const { singleGif: gif, loadingGif } = useSingleGif({ id });
  useSEO(loadingGif ? {title: "Cargando..."} : {title: gif.title,description:gif.title})
  return (
    <>
      {loadingGif ? (
        <Spinner></Spinner>
      ) : (
        <Gif url={gif.images.original.url} name={gif.title} id={gif.id}></Gif>
      )}
    </>
  );
};
export default SingleGif;
