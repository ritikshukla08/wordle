import React from "react";
import { useSelector } from "react-redux";
import ModalLayout from "../layouts/ModalLayout";
import Login from "./Login";
import Signup from "./Signup";

const LoginAndRegister = (props) => {
  const signup = useSelector((state) => state.wordle.signup);
  const login = useSelector((state) => state.wordle.login);

  return (
    <ModalLayout close={props.close}>
      {login && <Login close={props.close} />}
      {signup && <Signup />}
    </ModalLayout>
  );
};

export default LoginAndRegister;
