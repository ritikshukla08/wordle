import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Input from "./components/Input/Input";
import KeyBoard from "./components/keyboard/KeyBoard";
import ConfettiAnimation from "./components/Modals/ConfettiAnimation";
import Won from "./components/Modals/Won";
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

  useEffect(() => {
    const randomNo = Math.floor(Math.random() * 5758);

    const wordArr = [];

    for (let value of Object.values(words)) {
      wordArr.push(value);
    }

    dispatch(wordleAction.setWords(wordArr));

    dispatch(wordleAction.setAnswer(words[randomNo]));
  }, [dispatch, reset]);

  console.log("answer is :-", data);

  const regenerate = () => {
    dispatch(wordleAction.onReset());

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

  const props = { letters, setLetters, colorMatrix, setColorMatrix };

  return (
    <div className="App">
      <h1 className="heading">wordle</h1>
      {notAWord && <WordNotExist />}
      {winModal && <Won regenerate={regenerate} />}
      {winModal && <ConfettiAnimation />}
      {status === "lose" && <h2>game over</h2>}
      <Input {...props} />
      <KeyBoard {...props} />
    </div>
  );
}

export default App;
