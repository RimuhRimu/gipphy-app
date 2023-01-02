import { createContext, useRef, useState } from "react";

const initialVal = {keyword: "", rating: "g"}
export const GlobalContext = createContext(initialVal)

export function GlobalProvider({children}) {
  const inputRef = useRef(null)
  const [global,setGlobal] = useState({...initialVal,inputRef})
  return (
    <GlobalContext.Provider value={{global,setGlobal}}>
      {children}
    </GlobalContext.Provider>
  ) 
}
