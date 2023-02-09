import React from "react";
import { useSelector } from "react-redux";
import classes from "./Input.module.css";
import InputArea from "./InputArea/InputArea";

const Input = ({ letters, setLetters, colorMatrix }) => {
  const props = { letters, setLetters, colorMatrix };
  const NUMBER_OF_ROWS = useSelector((state) => state.wordle.NUMBER_OF_ROWS);

  return (
    <div className={classes.inputSection}>
      <div className={classes.round}>
        {new Array(NUMBER_OF_ROWS).fill(0).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(NUMBER_OF_ROWS).fill(1).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(NUMBER_OF_ROWS).fill(2).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(NUMBER_OF_ROWS).fill(3).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(NUMBER_OF_ROWS).fill(4).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(NUMBER_OF_ROWS).fill(5).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Input);
