import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import AuthContext from "../../Auth/AuthContext";
import { wordleAction } from "../../store/wordle-slice";
import classes from "./Signup.module.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(null);
  const [isPasswordError, setIsPasswordError] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [togglePswd, setTogglePswd] = useState(false);

  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  const emailValue = (e) => {
    setEmail(e.target.value);
    setIsEmailError(false);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
    setIsPasswordError(false);
  };

  const seePassword = (e) => {
    setTogglePswd((prev) => !prev);
  };

  const emailHandler = () => {
    if (!email.length) {
      setIsEmailError(true);
      setEmailErrorMessage("email is required");
    }
  };

  const passwordHandler = () => {
    let strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!password) {
      setIsPasswordError(true);
    }

    if (password && !strongRegex.test(password)) {
      setError(true);
      setErrorMessage(
        "Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"
      );
    }
    if (strongRegex.test(password)) {
      setError(false);
      setErrorMessage("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      setIsEmailError(true);
      setEmailErrorMessage("email is required");
    }

    if (!password) {
      setIsPasswordError(true);
    }

    if (email && password) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        };

        const response = await fetch(
          "http://192.168.1.13:8080/user/login",
          requestOptions
        );
        console.log(response);
        const data = await response.json();

        if (!response.ok) {
          console.log(response);
          throw new Error(`${data.message}`);
        }

        authCtx.login(data);

        props.close();
        console.log(data);
      } catch (err) {
        setError(true);
        setErrorMessage(err.message);
        console.log(err.message);
      }
    }
  };

  return (
    <>
      <form className={classes.signupForm} onSubmit={submitHandler}>
        <h2 className={classes.formHead}>Log In</h2>
        {error && <p className={classes.errMsg}>{errorMessage}</p>}
        <div
          className={`${classes.insideForm} ${
            isEmailError ? classes.error : ""
          }`}
        >
          <label> Username or Email</label>
          <input
            type="text"
            value={email}
            onChange={emailValue}
            onBlur={emailHandler}
          />
          {isEmailError && (
            <span className={classes.err}>{emailErrorMessage}</span>
          )}
        </div>

        <div
          className={`${classes.insideForm}   ${
            isPasswordError ? classes.error : ""
          }`}
        >
          <label>Password</label>
          <div className={classes.pswdField}>
            <input
              type={togglePswd ? "text" : "password"}
              value={password}
              onChange={passwordValue}
              onBlur={passwordHandler}
            />
            <span onClick={seePassword} className={classes.showHide}>
              {togglePswd ? "hide" : "show"}
            </span>
          </div>
          {isPasswordError && (
            <span className={classes.err}>password is required</span>
          )}
        </div>
        <p className={classes.switch}>
          create an account{" "}
          <span onClick={() => dispatch(wordleAction.openSignup())}>
            Sign up
          </span>
          .
        </p>
        <button className={classes.formBtn}>Login</button>
      </form>
    </>
  );
};

export default Login;
