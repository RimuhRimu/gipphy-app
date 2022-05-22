import {Link} from 'wouter'
import useCategories from "hooks/useCategories";

const ListCategories = ({}) => {
  const { categories } = useCategories()
  return (
    <>
    {
      categories.map(categorie => 
            <span className="categorie" key={categorie.name}> 
              <Link to={`/search/${categorie.name}`} className="categorieLink">{categorie.name}</Link> 
            </span>)
    }
    </>
  )
}
export default ListCategories
