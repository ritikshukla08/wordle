import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Input from "./components/Input/Input";
import KeyBoard from "./components/keyboard/KeyBoard";
import ConfettiAnimation from "./components/Modals/ConfettiAnimation";
import Stats from "./components/Modals/Stats";
import WordNotExist from "./components/Modals/WordNotExist";
import words from "./db/words.json";
import { wordleAction } from "./store/wordle-slice";

function App() {
  const data = useSelector((state) => state.wordle.answer);
  const reset = useSelector((state) => state.wordle.reset);
  const status = useSelector((state) => state.wordle.status);
  const winModal = useSelector((state) => state.wordle.winModal);
  const notAWord = useSelector((state) => state.wordle.notAWord);
  const dispatch = useDispatch();

  const [letters, setLetters] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [colorMatrix, setColorMatrix] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [giveUp, setGiveUp] = useState(null);

  useEffect(() => {
    const randomNo = Math.floor(Math.random() * 5758);

    const wordArr = [];

    for (let value of Object.values(words)) {
      wordArr.push(value);
    }

    dispatch(wordleAction.setWords(wordArr));
    dispatch(wordleAction.setAnswer(wordArr[randomNo]));
  }, [dispatch, reset]);

  console.log("answer is :-", data);
  const regenerate = () => {
    dispatch(wordleAction.onReset());

    setGiveUp(false);

    dispatch(wordleAction.closeWinModal());
    setLetters([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setColorMatrix([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
  };

  const openStats = () => {
    setGiveUp(true);
    dispatch(wordleAction.stopTyping());
  };

  const closeStats = () => {
    setGiveUp(false);
  };

  const props = { letters, setLetters, colorMatrix, setColorMatrix };

  return (
    <div className="App">
      <h1 className="heading">wordle</h1>
      {notAWord && <WordNotExist />}
      {winModal && <Stats regenerate={regenerate} />}
      {winModal && <ConfettiAnimation />}
      {giveUp && <Stats regenerate={regenerate} closeStats={closeStats} />}
      {status === "lose" && <Stats regenerate={regenerate} />}
      <Input {...props} />
      <div>
        <span className="appBtn reset" onClick={regenerate}>
          reset
        </span>
        {status === "playing" && (
          <span className="appBtn giveup" onClick={openStats}>
            giveup
          </span>
        )}
      </div>
      <KeyBoard {...props} />
    </div>
  );
}

export default App;
