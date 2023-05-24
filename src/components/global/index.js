import { createContext, useEffect, useRef, useState } from "react";
import auth from "services/auth";

const initialVal = { keyword: "", rating: "g", loginActive: false, registerActive: false, isAuth: false }
export const GlobalContext = createContext(initialVal)

export function GlobalProvider({ children }) {
  const inputRef = useRef(null)
  const loginRef = useRef(null)
  const [global, setGlobal] = useState({ ...initialVal, inputRef, loginRef })
  useEffect(async () => {
    const localJWT = localStorage.getItem("jwt")
    const dbAuth = await auth({ localJWT })
    if (localJWT && dbAuth) {
      setGlobal(v => ({ ...v, isAuth: true }))
    }
  }, [])

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  )
}
