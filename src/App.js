import { Route } from "wouter";

import ListOfGifs from "components/listOfGifs/listOfGifs.js";
import SingleGif from "components/singleGif/singleGif";
import Header from "components/header/header";
import { LoginForm } from "components/login/login";

import { GlobalProvider } from "components/global";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Header ></Header>
        <LoginForm></LoginForm>
        <Route path="/" component={ListOfGifs}></Route>
        <Route path="/search/:keyword/:rating?" component={ListOfGifs}></Route>
        <Route path="/gif/:id" component={SingleGif}></Route>
      </GlobalProvider>
    </div>
  );
}
