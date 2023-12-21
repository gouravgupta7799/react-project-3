import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/store/auth-context'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLogedInfo = localStorage.getItem('loggedIn');
    if (userLogedInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password, collegeName) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('loggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('loggedIn')
    setIsLoggedIn(false);
  };

  return (
    //<React.Fragment>
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
    //</React.Fragment>
  );
}

export default App;
