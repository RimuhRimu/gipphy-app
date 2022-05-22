import Spinner from 'components/spinner/spinner';
import { Suspense, lazy } from 'react';

const ListCategories = lazy(() => import("./listCategories"))

const Categories = () => {
  return (
    <div className="categoriesBox">
      <Suspense fallback={<Spinner></Spinner>}>
           <ListCategories></ListCategories>
      </Suspense>
    </div>
  )
}
export default Categories
