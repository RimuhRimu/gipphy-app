import { Link } from "wouter";

import Categories from "components/categories/categories";
import Search from "components/search/search";
import {Login} from "components/login/login"

const Header = () => {
  return (
  <header className="App-header">
    <h1>Gipphy App</h1>
      <Login></Login>
      <div className="wrapperLogoSearch">
        <Link href="/">
            <img
              src={process.env.PUBLIC_URL + "logo.png"}
              srcSet="https://raw.githubusercontent.com/RimuhRimu/gipphy-app/main/public/logo.png"
              alt="giphy-app logo"
              className="logo"
            />
        </Link>
        <Search></Search>
      </div>
      <Categories></Categories>
    </header>
  )
}
export default Header
