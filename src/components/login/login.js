import { GlobalContext } from "components/global"
import useUser from "hooks/useUser"
import { useContext, useRef } from "react"
import "./login.css"


const LoginForm = () => {
  const [usernameRef, passwordRef, resUserRef, resPassRef] = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const { global, setGlobal } = useContext(GlobalContext)
  const { loginActive, registerActive } = global
  const { register, login, loading, error } = useUser()


  const closeIcon = <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  //TODO: improve the error handling, not only bad credentials, 25 lines below
  return (
    <>
      {
        loginActive ?
          (
            <>
              <div className="loginFormBackground" onClick={() => setGlobal(prev => ({ ...prev, loginActive: false }))} />
              <div className="loginForm" id="loginForm">
                <form className="formField" id="formField">
                  <fieldset form="formField">
                    <legend>Login</legend>
                    <div className="closeIcon" onClick={() => setGlobal(prev => ({ ...prev, loginActive: false }))}>{closeIcon}</div>
                    <p>
                      <label htmlFor="username">
                        <b>Username</b>
                        <input type="text" name="username" id="username" placeholder="username" ref={usernameRef} />
                      </label>
                    </p>
                    <p>
                      <label htmlFor="password">
                        <b>Password</b>
                        <input type="password" name="password" id="password" placeholder="password" ref={passwordRef} />
                      </label>
                      {loading && <strong>Loading...</strong>}
                    </p>
                    <button onClick={(ev) => {
                      ev.preventDefault()
                      login({ username: usernameRef.current.value, password: passwordRef.current.value })
                    }} >Login</button>
                    {error && <strong>Error in credentials</strong>}
                  </fieldset>
                </form>
              </div>
            </>
          ) : null
      }

      {
        registerActive ?
          (
            <>
              <div className="loginFormBackground" onClick={() => setGlobal(prev => ({ ...prev, registerActive: false }))} />
              <div className="loginForm" id="loginForm">
                <form className="formField" id="formField">
                  <fieldset form="formField">
                    <legend>Register</legend>
                    <div className="closeIcon" onClick={() => setGlobal(prev => ({ ...prev, registerActive: false }))}>{closeIcon}</div>
                    <p>
                      <label htmlFor="username">
                        <b>Username</b>
                        <input type="text" name="username" id="username" placeholder="username" ref={resUserRef} />
                      </label>
                    </p>
                    <p>
                      <label htmlFor="password">
                        <b>Password</b>
                        <input type="password" name="password" id="password" placeholder="password" ref={resPassRef} />
                      </label>
                      {loading && <strong>Loading...</strong>}
                    </p>
                    <button onClick={(ev) => {
                      ev.preventDefault()
                      register({ username: resUserRef.current.value, password: resPassRef.current.value })
                    }} >Login</button>
                    {error && <strong>Error in credentials</strong>}
                  </fieldset>
                </form>
              </div>
            </>
          ) : null
      }
    </>
  )
}

const Login = () => {
  const { setGlobal, global } = useContext(GlobalContext)
  const { isAuth } = global
  const { logout } = useUser()
  return (
    <div className="loginHeader" >
      {
        isAuth ?

          <button className="loginButton" onClick={logout}>{
            "Log out"
          }</button> :

          <>
            <button className="loginButton" onClick={() => setGlobal(prev => ({ ...prev, loginActive: true }))}>{
              "Login"
            }</button>
            <button className="loginButton" style={{ marginRight: "15px" }} onClick={() => setGlobal(prev => ({ ...prev, registerActive: true }))}>{
              "Register"
            }</button>
          </>
      }
    </div>
  )
}

export { Login, LoginForm }
