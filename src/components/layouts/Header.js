import React, { useContext } from "react";
import "../../App.css";
import AuthContext from "../../Auth/AuthContext";
import ResetIcon from "../../Icons/ResetIcon";

const Header = ({
  regenerate,
  status,
  openStats,
  openSignup,
  logoutHandler,
}) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="header">
      <h1 className="heading">wordle</h1>
      <div className="rightSide">
        {/* <span className="appBtn reset" onClick={regenerate}>
          <ResetIcon />
        </span>
        {status === "playing" && (
          <span className="appBtn giveup" onClick={openStats}>
            give
            <br />
            up
          </span>
        )} */}
        {!authCtx.isLoggedIn && <span onClick={openSignup}>sign up</span>}
        {authCtx.isLoggedIn && <span onClick={logoutHandler}>log out</span>}
      </div>
    </div>
  );
};

export default Header;
