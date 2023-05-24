import { Link } from "wouter";
import { Copy, Heart } from "iconoir-react"

import useUser from "hooks/useUser";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "components/global";

import "./gif.css";

const Gif = ({ url, name, id, isFavInitial }) => {
  const { favHandle } = useUser()
  const { global } = useContext(GlobalContext)
  const { isAuth } = global

  const [isFav, setIsFav] = useState(isFavInitial)
  const heartRef = useRef(null)

  useEffect(() => {
    if (!isAuth) {
      setIsFav(false)
    }
    else {
      setIsFav(isFavInitial)
    }
  }, [isAuth])

  return (
    <div className="gifBox">
      <div className="SVG copy" onClick={() => navigator.clipboard.writeText(url)}>
        <Copy />
      </div>
      <div className="SVG heart">
        <button onClick={() => {
          if (isFav) {
            favHandle({ operation: "del", fav: id })
              .then(_ => setIsFav(false))
          }
          else {
            favHandle({ operation: "add", fav: id })
              .then(_ => setIsFav(true))
          }
        }} style={{
          background: "none",
          border: "none"
        }}>
          {
            isFav ? <Heart ref={heartRef} fill="#f0f" color="#f00" /> : <Heart ref={heartRef} color="#fff" />
          }
        </button>
      </div>
      <figure className="gif">
        <figcaption className="titleGif">
          <div className="titleGifBox">
            <Link to={`/gif/${id}`} className="linkGif">
              {name}
            </Link>
          </div>
        </figcaption>
        <Link to={`/gif/${id}`}>
          <picture>
            <source type="image/webp" srcSet={url}></source>
            <img
              loading="lazy"
              src={url}
              alt={name}
              className="gifPicture"
              id={id}
            />
          </picture>
        </Link>
      </figure>
    </div>
  );
};
export default Gif;
