import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ResetIcon from "../../Icons/ResetIcon";
import { wordleAction } from "../../store/wordle-slice";
import classes from "./Stats.module.css";

const Stats = (props) => {
  const answer = useSelector((state) => state.wordle.answer);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(wordleAction.closeWinModal());
  };

  return (
    <>
      <div
        onClick={props?.closeStats || closeModal}
        className={classes.overlay}
      ></div>
      <div className={classes.modal}>
        <div className={classes.insideModal}>
          <span
            className={classes.close}
            onClick={props?.closeStats || closeModal}
          >
            x
          </span>
          <h2>Statistics</h2>
          <div className={classes.shareAndPlay}>
            <div className={classes.next}>
              <span>next word:</span>
              <button className={classes.resetIcon} onClick={props.regenerate}>
                <ResetIcon />
              </button>
            </div>
            <div className={classes.share}>
              <button>share</button>
            </div>
          </div>
          <div className={classes.answer}>
            <h3>
              {answer}
              <i>(noun)</i>
            </h3>
            <p>here is the meaning of the word.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
