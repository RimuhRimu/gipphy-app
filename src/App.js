/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { Link, Route } from "wouter";
import Categories from "components/categories/categories";
import ListOfGifs from "components/listOfGifs/listOfGifs.js";
import Search from "components/search/search.js";
import useCategories from "hooks/useCategories";
import SingleGif from "components/singleGif/singleGif";
import { GlobalProvider } from "components/global";

export default function App() {
  const { categories } = useCategories();
  return (
    <div className="App">
      <GlobalProvider>
        <header className="App-header">
          <h1>Gipphy App</h1>
          <div className="wrapperLogoSearch">
            <Link href="/">
              <a>
                <img
                  src={process.env.PUBLIC_URL + "logo.png"}
                  srcSet="https://raw.githubusercontent.com/RimuhRimu/gipphy-app/main/public/logo.png"
                  alt="giphy-app logo"
                  className="logo"
                />
              </a>
            </Link>
            <Search></Search>
          </div>
          <Categories categories={categories}></Categories>
        </header>
        <Route path="/" component={ListOfGifs}></Route>
        <Route path="/search/:keyword/:rating?" component={ListOfGifs}></Route>
        <Route path="/gif/:id" component={SingleGif}></Route>
      </GlobalProvider>
    </div>
  );
}
