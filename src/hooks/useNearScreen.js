import { useEffect, useRef, useState } from "react";

const useNearScreen = ({distance = '200px', externalRef = null, once = true}) => {
  const [ isNearScreen,setShow ] = useState(false)
  const fromRef = useRef()

  useEffect(() => {
    const elem = externalRef ? externalRef.current : fromRef.current
    const onChange = (entries, observer) => {
      const [ categorieTarget ] = entries
      if (categorieTarget.isIntersecting) {
        setShow(true)
        once && observer.disconnect()
      }
      else !once && setShow(false)
    }
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })
      observer.observe(elem)
    }
  })
  
  return externalRef ? {isNearScreen} : {isNearScreen,fromRef}
}
export default useNearScreen
