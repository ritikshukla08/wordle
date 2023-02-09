import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { wordleAction } from "../../store/wordle-slice";
import classes from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(null);
  const [isPasswordError, setIsPasswordError] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [togglePswd, setTogglePswd] = useState(false);

  const dispatch = useDispatch();

  const emailValue = (e) => {
    setEmail(e.target.value);
    setIsEmailError(false);
  };

  const userNameValue = (e) => {
    setUserName(e.target.value);
    setError(false);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
    setIsPasswordError(false);
  };

  const cnfPasswordValue = (e) => {
    setCnfPassword(e.target.value);
  };

  const seePassword = (e) => {
    setTogglePswd((prev) => !prev);
  };

  const emailHandler = () => {
    if (!email.length) {
      setIsEmailError(true);
      setEmailErrorMessage("email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setIsEmailError(true);
      setEmailErrorMessage("enter valid email");
    }
  };

  const cnfPasswordHandler = () => {
    if (password === cnfPassword) {
      setErrorMessage("");
      setError(false);
    }

    if (password !== cnfPassword) {
      setErrorMessage("password not Match");
      setError(true);
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

    if (!userName) {
      setError(true);
    }

    if (!password) {
      setIsPasswordError(true);
    }

    if (email && password) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, username: userName }),
        };

        const response = await fetch(
          "http://192.168.1.13:8080/user/sign-up",
          requestOptions
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          throw new Error(`${data.message}`);
        }

        console.log(data);
        dispatch(wordleAction.openlogin());
      } catch (err) {
        console.log(err);
        setError(true);
        setErrorMessage(err.message);
        console.log(err.message);
      }
    }
  };

  return (
    <>
      <form className={classes.signupForm} onSubmit={submitHandler}>
        <h2 className={classes.formHead}>Sign up</h2>
        {error && <p className={classes.errMsg}>{errorMessage}</p>}

        <div className={classes.insideForm}>
          <label>username</label>
          <input type="text" value={userName} onChange={userNameValue} />
        </div>
        <div
          className={`${classes.insideForm} ${
            isEmailError ? classes.error : ""
          }`}
        >
          <label>Email</label>
          <input
            type="email"
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
        <div className={classes.insideForm}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={cnfPassword}
            onChange={cnfPasswordValue}
            onBlur={cnfPasswordHandler}
          />
        </div>
        <p className={classes.switch}>
          already have an account{" "}
          <span onClick={() => dispatch(wordleAction.openlogin())}>log in</span>
          .
        </p>
        <button className={classes.formBtn}>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
