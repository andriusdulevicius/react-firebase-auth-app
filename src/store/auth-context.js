import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  loggedInEmail: '',
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');

  // const isLoggedIn = token ? true : false; taspats butu apacioje tik kitu budu..
  const isLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setLoggedInEmail(email);
    console.log('loged in..');
  };
  const logoutHandler = () => {
    setLoggedInEmail('');
    setToken(null);
  };

  const contextValue = { token, isLoggedIn, loggedInEmail, login: loginHandler, logout: logoutHandler };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
