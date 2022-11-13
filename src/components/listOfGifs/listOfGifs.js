import Gif from 'components/gif/gif.js'
import Categories from 'components/categories/categories.js'
import useGifs from 'hooks/useGifs'
import Search from 'components/search/search.js'
import VisorPagination from 'components/visorPagination/index'
import Spinner from 'components/spinner/spinner'
import "./listOfGifs.css"
import 'components/spinner/spinner.css'
import { Link } from 'wouter'
// import debounce from 'just-debounce-it'
// import { useCallback, useEffect } from 'react'

const ListOfgifs = ({params}) => {
  const { keyword } = params 
  const { loadingGifs,gifs,setPage } = useGifs({keyword})
  return (
    <>
    {
      loadingGifs ? <Spinner></Spinner> :
    <>
      <header className="App-header">
        <h1>Gipphy App</h1>
        <div className='wrapperLogoSearch'>
          <Link href='/'>
            <a><img src={process.env.PUBLIC_URL+'logo.png'} srcSet="https://raw.githubusercontent.com/RimuhRimu/gipphy-app/main/public/logo.png" alt="giphy-app logo" className='logo'/></a>
          </Link>
          <Search></Search>
        </div>
        <Categories></Categories>
      </header>
        <div className="wrapper">
          <div className="listOfGifs">
          {
            gifs.map(gif => <Gif 
              url={gif.images.downsized_medium.url} 
              name={gif.title} 
              key={gif.id}></Gif>)
          }
          </div> 
          <VisorPagination setPage={setPage}></VisorPagination>
        </div>
    </>
    }
  </>
  )
}

export default ListOfgifs
