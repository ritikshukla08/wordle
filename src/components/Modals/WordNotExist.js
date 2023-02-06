import React from "react";
import classes from "./Stats.module.css";

const WordNotExist = () => {
  return (
    <div className={classes.modal}>
      <h2>Word not found!</h2>
    </div>
  );
};

export default WordNotExist;
