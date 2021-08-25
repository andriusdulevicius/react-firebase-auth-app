import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState('');

  // const isLoggedIn = token ? true : false; taspats butu apacioje tik kitu budu..
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    console.log('loged in..');
  };
  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = { token, isLoggedIn, login: loginHandler, logout: logoutHandler };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
