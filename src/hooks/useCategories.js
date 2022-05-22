const { useState, useEffect } = require("react")
const { default: getCategories } = require("services/getCategories")

const useCategories = () => {
  const [ categories,setCategories ] = useState([])
  const [ loadingCategories,setLoadingCategories ] = useState(true)
  useEffect(() => {
    setLoadingCategories(true)
    if(!categories.length) getCategories()
    .then(categories => setCategories(categories))
    .then(_ => setLoadingCategories(false))
  })
  return {categories,loadingCategories}
}
export default useCategories
