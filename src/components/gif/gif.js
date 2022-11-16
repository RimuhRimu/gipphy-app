import { Link } from "wouter";
import "./gif.css";
const Gif = ({ url, name, id }) => {
  return (
    <div className="gifBox">
      <figure className="gif">
        <figcaption className="titleGif">
          <Link to={`/gif/${id}`} className="linkGif">
            {name}
          </Link>
        </figcaption>
        <Link to={`/gif/${id}`}>
          <img
            src={url}
            alt={name}
            className="gifPicture"
            loading="lazy"
            id={id}
          />
        </Link>
      </figure>
    </div>
  );
};
export default Gif;
