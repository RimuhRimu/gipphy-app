import "./gif.css"
const Image = ({url,name}) => {
  return (
    <div className="gifBox">
      <figure className="gif">
        <figcaption className="titleGif"><a 
          href={url} 
          rel="noreferrer" 
          target="_blank" 
          className="linkGif">
          {name}</a></figcaption>
        <img src={url} alt={name} className="gifPicture" loading='lazy'/>
      </figure>
    </div>
  )
}
export default Image
