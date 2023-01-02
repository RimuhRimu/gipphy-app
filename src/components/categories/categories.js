import { Suspense, useContext } from "react";
import { Link } from "wouter";
import {GlobalContext} from 'components/global/index'

const Categories = ({ categories }) => {
  const {setGlobal,global} = useContext(GlobalContext)
  const { inputRef } = global
  const handleClick = (evt) => {
    const categorieName = evt.target.innerText
    const input = inputRef.current
    input.value = categorieName
    setGlobal(prev => ({...prev,keyword: decodeURI(categorieName)}))
  }
  return (
    <div className="categoriesBox">
      <Suspense fallback={null}>
        {categories.map((categorie) => (
          <span className="categorie" key={categorie.name}>
            <Link to={`/search/${categorie.name}/g`} className="categorieLink" onClickCapture={handleClick}>
              {categorie.name}
            </Link>
          </span>
        ))}
      </Suspense>
    </div>
  );
};
export default Categories;
