import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordleAction } from "../../store/wordle-slice";
import Key from "./Key";
import classes from "./KeyBoard.module.css";

const KeyBoard = ({
  letters,
  setLetters,
  colorMatrix,
  setColorMatrix,
  signUp,
}) => {
  const props = { letters, setLetters, colorMatrix, setColorMatrix };
  const dispatch = useDispatch();

  const NUMBER_OF_ROWS = useSelector((state) => state.wordle.NUMBER_OF_ROWS);
  const status = useSelector((state) => state.wordle.status);
  const curPosition = useSelector((state) => state.wordle.curPosition);
  const wordsArr = useSelector((state) => state.wordle.wordsArr);
  const answer = useSelector((state) => state.wordle.answer);
  const colorObj = useSelector((state) => state.wordle.colorObj);
  const stopTyping = useSelector((state) => state.wordle.stopTyping);

  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setValueHandler = useCallback((keyVal) => {
    const key = keyVal?.key?.toUpperCase() || keyVal;

    if (key === "ENTER") {
      const arrInString = letters[curPosition.curRound].join("").toLowerCase();
      if (curPosition.curBox !== NUMBER_OF_ROWS) return;

      let color = [...colorMatrix];
      let newObj = { ...colorObj };

      const checkWord = letters[curPosition.curRound].join("").toLowerCase();

      let wrongWord = {};

      if (wordsArr.includes(checkWord)) {
        letters[curPosition.curRound].forEach((letter, i) => {
          if (answer[i] === letter.toLowerCase()) {
            color[curPosition.curRound][i] = "green";
            newObj[letter] = "green";
            wrongWord[letter.toLowerCase()] = "done";
          } else {
            newObj[letter] = "grey";
            color[curPosition.curRound][i] = "grey";
            wrongWord[letter.toLowerCase()] = "wrong";
          }
        });
        letters[curPosition.curRound].forEach((letter, i) => {
          if (wrongWord[letter.toLowerCase()] === "wrong") {
            if (answer.includes(letter.toLowerCase())) {
              if (newObj[letter] === "green") {
                color[curPosition.curRound][i] = "yellow";
                wrongWord[letter.toLowerCase()] = "done";
              } else {
                newObj[letter] = "yellow";
                color[curPosition.curRound][i] = "yellow";
                wrongWord[letter.toLowerCase()] = "done";
              }
            } else {
              newObj[letter] = "grey";
              color[curPosition.curRound][i] = "grey";
              wrongWord[letter.toLowerCase()] = "done";
            }
          }
        });
      }

      dispatch(wordleAction.setColorObj(newObj));
      setColorMatrix(color);
      if (!wordsArr.includes(arrInString)) {
        dispatch(wordleAction.openNotAWord());
        return;
      }

      if (arrInString === answer) {
        dispatch(wordleAction.openWinModal());
        dispatch(wordleAction.onWin());
      }

      if (
        curPosition.curRound === 5 &&
        letters[5].join("").toLowerCase() !== answer
      ) {
        dispatch(wordleAction.gameOver());
      }

      dispatch(wordleAction.enterClick());
    } else if (key === "DELETE" || key === "BACKSPACE") {
      if (curPosition.curBox === 0) return;
      dispatch(wordleAction.closeNotAWord());
      const newRound = [...letters];
      newRound[curPosition.curRound][curPosition.curBox - 1] = "";
      setLetters(newRound);
      dispatch(wordleAction.deleteClick());
    } else {
      if (curPosition.curBox > NUMBER_OF_ROWS - 1) return;

      if (
        (keyVal?.keyCode >= 65 && keyVal?.keyCode <= 90) ||
        typeof keyVal === "string"
      ) {
        const newRound = [...letters];

        newRound[curPosition.curRound][curPosition.curBox] = key;
        setLetters(newRound);
        dispatch(wordleAction.onLetterClick());
      }
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", setValueHandler);

    if (stopTyping || signUp) {
      window.removeEventListener("keydown", setValueHandler);
    }

    return () => window.removeEventListener("keydown", setValueHandler);
  }, [
    stopTyping,
    signUp,
    curPosition.curBox,
    curPosition.curRound,
    setValueHandler,
  ]);

  return (
    <div className={classes.keyBoardSection}>
      <div className={classes.keyBoard}>
        <div className={`${classes.row} ${classes.row1}`}>
          {row1.map((key) => (
            <Key
              key={key}
              keyFun={setValueHandler}
              keyVal={key}
              {...props}
              status={status}
            />
          ))}
        </div>
        <div className={classes.row}>
          {row2.map((key) => (
            <Key
              key={key}
              keyFun={setValueHandler}
              keyVal={key}
              {...props}
              status={status}
            />
          ))}
        </div>
        <div className={`${classes.row} ${classes.row3}`}>
          {row3.map((key) => (
            <Key
              key={key}
              keyFun={setValueHandler}
              keyVal={key}
              {...props}
              status={status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyBoard;
