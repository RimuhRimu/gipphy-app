import Gif from 'components/gif/gif.js'
import Categories from 'components/categories/categories.js'
import useGifs from 'hooks/useGifs'
import Search from 'components/search/search.js'
import VisorPagination from 'components/visorPagination/index'
import Spinner from 'components/spinner/spinner'
import "./listOfGifs.css"
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
        <Search></Search>
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
