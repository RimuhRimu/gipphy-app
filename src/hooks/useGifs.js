import {useEffect,useState} from 'react'
import getGifs from 'services/getGifs.js'

const INITIAL_PAGE = 0
const useGigfs = ({keyword}) => {
  const [ gifs,setGifs ] = useState([])
  const [ loadingGifs,setLoadingGifs] = useState(true)
  // const [ loadingNextPage,setLoadingNextPage ] = useState(false)
  const [ page,setPage ] = useState(INITIAL_PAGE)
  
  useEffect(() => {
    setLoadingGifs(true)
    getGifs({query: keyword})
    .then(gifs => setGifs(gifs))
    .then(_ => setLoadingGifs(false))
  },[keyword])

  useEffect(() => {
    if (page === INITIAL_PAGE) return
    getGifs({query: keyword, page})
    .then(nextGifs => {
      setGifs(prevGifs => prevGifs.concat(nextGifs))
    })
  },[page])
  
  return {loadingGifs,gifs,setPage}
}
export default useGigfs
