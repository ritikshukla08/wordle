import React from "react";
import { useSelector } from "react-redux";
import classes from "./KeyBoard.module.css";

const Key = ({ keyVal, keyFun }) => {
  const colorObj = useSelector((state) => state.wordle.colorObj);
  const stopTyping = useSelector((state) => state.wordle.stopTyping);

  return (
    <button
      className={`color ${classes.btn} ${
        colorObj[keyVal] ? colorObj[keyVal] : ""
      }`}
      onClick={() => !stopTyping && keyFun(keyVal)}
      id={keyVal}
      tabIndex={-1}
    >
      {keyVal}
    </button>
  );
};

export default Key;
