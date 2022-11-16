import { Suspense } from "react";
import { Link } from "wouter";

const Categories = ({ categories }) => {
  return (
    <div className="categoriesBox">
      <Suspense fallback={null}>
        {categories.map((categorie) => (
          <span className="categorie" key={categorie.name}>
            <Link to={`/search/${categorie.name}`} className="categorieLink">
              {categorie.name}
            </Link>
          </span>
        ))}
      </Suspense>
    </div>
  );
};
export default Categories;
