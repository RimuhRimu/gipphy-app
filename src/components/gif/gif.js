import { Link } from "wouter";
import "./gif.css";
const Gif = ({ url, name, id }) => {
  return (
    <div className="gifBox">
      <div className="copySVG" onClick={() => navigator.clipboard.writeText(url)}>
        <svg 
          width="25px" 
          height="25px" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg" 
        >
          <path d="M8.5 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 6.4V4.5a.5.5 0 01.5-.5c.276 0 .504-.224.552-.496C9.2 2.652 9.774 1 12 1s2.8 1.652 2.948 2.504c.048.272.276.496.552.496a.5.5 0 01.5.5v1.9a.6.6 0 01-.6.6H8.6a.6.6 0 01-.6-.6z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path>
        </svg>
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
