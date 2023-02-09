import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userName: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [name, setName] = useState(localStorage.getItem("user"));

  const loginHandler = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.username);
    setUserIsLoggedIn(true);
    setName(data.username);
  };

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserIsLoggedIn(false);
  }, []);

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    userName: name,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
