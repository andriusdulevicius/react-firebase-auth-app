import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  loggedInData: '',
  login: (token, data) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem('token');
  const [token, setToken] = useState(existingToken || '');
  const [loggedInData, setLoggedInData] = useState('');

  // const isLoggedIn = token ? true : false; taspats butu apacioje tik kitu budu..
  const isLoggedIn = !!token;

  const loginHandler = (token, data) => {
    setToken(token);
    setLoggedInData(data);
    console.log('loged in..');
    localStorage.setItem('token', token);
  };
  const logoutHandler = () => {
    setLoggedInData('');
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue = { token, isLoggedIn, loggedInData, login: loginHandler, logout: logoutHandler };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
