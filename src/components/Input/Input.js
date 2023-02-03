import React from "react";
import classes from "./Input.module.css";
import InputArea from "./InputArea/InputArea";

const Input = ({ letters, setLetters, colorMatrix }) => {
  const props = { letters, setLetters, colorMatrix };
  return (
    <div className={classes.inputSection}>
      <div className={classes.round}>
        {new Array(5).fill(0).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(5).fill(1).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(5).fill(2).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(5).fill(3).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(5).fill(4).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
      <div className={classes.round}>
        {new Array(5).fill(5).map((n, i) => (
          <InputArea key={i} round={n} curValue={i} {...props} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Input);
