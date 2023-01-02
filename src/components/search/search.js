import { GlobalContext } from "components/global";
import { useContext, useReducer } from "react";
import { useLocation } from "wouter";
import "./search.css";

const ratings = {
  g: "g",
  pg: "pg",
  pg13: "pg13",
  r: "r",
}

const actions = {
  CHANGE_KEYWORD: "change_keyword",
  CHANGE_RATING: "change_ rating",
}

const ACTIONS_REDUCER = {
  [actions.CHANGE_KEYWORD]: (state,action) => ({
    ...state,
    keyword: action.payload
  }),
  [actions.CHANGE_RATING]: (state,action) => ({
    ...state,
    rating: action.payload
  })
}

const reducer = (state,action) => {
  const actionReducer = ACTIONS_REDUCER[action.type]
  return actionReducer ? actionReducer(state,action) : state
}

const Search = () => {

  const {global,setGlobal} = useContext(GlobalContext)

  const {inputRef} = global

  const [{keyword,rating},dispatch] = useReducer(reducer,global)

  const [_,setPath] = useLocation()

  const handleSubmit = (elem) => {
    elem.preventDefault();
    setPath(`/search/${keyword}/${rating}`);
    setGlobal(prev => ({...prev,keyword,rating}))
  };

  const handleWordChange = (elem) => {
    dispatch({type: actions.CHANGE_KEYWORD, payload: elem.target.value})
  };

  const handleRating = (elem) => {
    dispatch({type: actions.CHANGE_RATING, payload: elem.target.value})
    setGlobal(prev => ({...prev, rating: elem.target.value}))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="search"
          className="search"
          id="search"
          placeholder="Type here!"
          onChange={handleWordChange}
          ref={inputRef}
        />
        <button className="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 612 612"
            className="searchIcon"
          >
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </svg>
        </button>
      <select id="rating" name="rating" className="rating" onChange={handleRating} value={rating}>
        <option disabled>Rating:</option>
        {
          Object.keys(ratings).map(rating => <option value={rating} key={rating}>{rating}</option>)
        }
      </select>
      </form>
    </>
  );
};

export default Search;
