import { GlobalContext } from "components/global";
import { useCallback, useContext, useState } from "react";

import loginService from "services/login";
import registerService from "services/register";
import favService from "services/updateFavs";

const useUser = () => {
  const [loadingState, setLoading] = useState({ loading: true, error: false })
  const [loadingFavsState, setLoadingFavs] = useState({ loading: true, error: false })
  const [favs, setFavs] = useState([])
  const { setGlobal } = useContext(GlobalContext)

  const login = useCallback(({ username, password }) => {
    loginService({ username, password })
      .then(JWT => {
        localStorage.setItem("jwt", JWT)
        setLoading(v => ({ ...v, loading: false }))
        setGlobal(v => ({ ...v, loginActive: false, isAuth: true }))
      })
      .catch(err => {
        setLoading(v => ({ ...v, error: true, loading: false }))
        setGlobal(v => ({ ...v, loginActive: false, isAuth: false }))
        console.error(err)
      })
  }, [null])

  const register = useCallback(({ username, password }) => {
    registerService({ username, password })
      .then(JWT => {
        localStorage.setItem("jwt", JWT)
        setLoading(v => ({ ...v, loading: false }))
        setGlobal(v => ({ ...v, registerActive: false, isAuth: true }))
      })
      .catch(err => {
        setLoading(v => ({ ...v, error: true, loading: false }))
        setGlobal(v => ({ ...v, registerActive: false, isAuth: false }))
        console.error(err)
      })
  }, [null])

  const favHandle = useCallback(async ({ operation, fav }) => {
    return favService({ operation, ID: fav, jwt: localStorage.getItem('jwt') })
      .then(({ favs }) => {
        setFavs(favs)
        setLoadingFavs({ loading: false, error: false })
      })
      .catch(err => {
        console.error(err)
        setLoadingFavs({ loading: false, error: true })
      })
  }, [null])

  const logout = useCallback(() => {
    localStorage.removeItem("jwt")
    setGlobal(v => ({ ...v, isAuth: false }))
  }, [null])

  return {
    error: loadingState.error,
    loading: loadingState.loading,
    loadingFavs: loadingFavsState.loading,
    login,
    register,
    favHandle,
    logout,
    favs
  }
}

export default useUser
