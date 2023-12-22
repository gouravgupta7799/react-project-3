import React, { useState, useEffect } from "react"

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLoggIn: (email, password) => { }
})


export const AuthContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState()

  useEffect(() => {
    const userLogedInfo = localStorage.getItem('loggedIn');
    if (userLogedInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const logInHandler = () => {
    localStorage.setItem('loggedIn', '1')
    setIsLoggedIn(true)
  }
  const logoutHandler = () => {
    localStorage.removeItem('loggedIn')
    setIsLoggedIn(false)
  }

  return (<AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLoggIn: logInHandler,
    onLogout: logoutHandler
  }}
  >{props.children}
  </AuthContext.Provider>
  )
}

export default AuthContext