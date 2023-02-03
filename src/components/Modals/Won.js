import React from "react";
import { useDispatch } from "react-redux";
import { wordleAction } from "../../store/wordle-slice";
import classes from "./Won.module.css";

const Won = ({ regenerate }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.modal}>
      <div className={classes.insideModal}>
        <span onClick={() => dispatch(wordleAction.closeWinModal())}>x</span>
        <h2>Congratulations, You win🏆</h2>
        <button onClick={regenerate}>Play Again</button>
      </div>
    </div>
  );
};

export default Won;
