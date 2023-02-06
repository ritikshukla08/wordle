import React from "react";
import classes from "./InputArea.module.css";

const InputArea = ({ round, curValue, letters, colorMatrix }) => {
  return (
    <div
      className={`${classes.box}   ${
        classes[colorMatrix[round][curValue]]
          ? classes[colorMatrix[round][curValue]]
          : ""
      }`}
    >
      {letters[round][curValue]}
    </div>
  );
};

export default InputArea;
