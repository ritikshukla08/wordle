import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./InputArea.module.css";

const InputArea = ({ round, curValue, letters, colorMatrix }) => {
  // const checkAnswer =
  //   answer[curValue] === letters[round][curValue].toLowerCase() &&
  //   answer.includes(letters[round][curValue].toLowerCase())
  //     ? classes.correct
  //     : answer.includes(letters[round][curValue].toLowerCase()) &&
  //       letters[round][curValue] !== ""
  //     ? classes.someWhere
  //     : classes.notInside;

  return (
    <div className={`${classes.box} ${classes[colorMatrix[round][curValue]]}`}>
      {letters[round][curValue]}
    </div>
  );
};

export default InputArea;
