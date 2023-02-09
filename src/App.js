import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Input from "./components/Input/Input";
import KeyBoard from "./components/keyboard/KeyBoard";
import ConfettiAnimation from "./components/Modals/ConfettiAnimation";
import Stats from "./components/Modals/Stats";
import WordNotExist from "./components/Modals/WordNotExist";
import dict_words from "./db/dict_words.json";
import { wordleAction } from "./store/wordle-slice";
import LoginAndRegister from "./components/Modals/LoginAndRegister";
import AuthContext from "./Auth/AuthContext";
import Header from "./components/layouts/Header";
import Modes from "./components/layouts/Modes";

function App() {
  const data = useSelector((state) => state.wordle.answer);
  const reset = useSelector((state) => state.wordle.reset);
  const status = useSelector((state) => state.wordle.status);
  const winModal = useSelector((state) => state.wordle.winModal);
  const notAWord = useSelector((state) => state.wordle.notAWord);
  const NUMBER_OF_ROWS = useSelector((state) => state.wordle.NUMBER_OF_ROWS);
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);

  const [letters, setLetters] = useState([
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
  ]);

  const [colorMatrix, setColorMatrix] = useState([
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
    new Array(NUMBER_OF_ROWS).fill(""),
  ]);

  const [giveUp, setGiveUp] = useState(null);
  const [signUp, setSignUp] = useState(null);

  useEffect(() => {
    const randomNo = Math.floor(
      Math.random() * dict_words[NUMBER_OF_ROWS].length
    );

    const wordArr = dict_words[NUMBER_OF_ROWS].map((word) => word);

    dispatch(wordleAction.setWords(wordArr));
    dispatch(wordleAction.setAnswer(wordArr[randomNo]));
  }, [dispatch, reset, NUMBER_OF_ROWS]);

  console.log("answer is :-", data);
  const regenerate = () => {
    dispatch(wordleAction.onReset());

    setGiveUp(false);

    dispatch(wordleAction.closeWinModal());
    setLetters([
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
    ]);
    setColorMatrix([
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
      new Array(NUMBER_OF_ROWS).fill(""),
    ]);
  };

  const openStats = () => {
    setGiveUp(true);
    dispatch(wordleAction.stopTyping());
  };

  const closeStats = () => {
    setGiveUp(false);
  };

  const openSignup = () => {
    setSignUp(true);
  };

  const closeSignup = () => {
    setSignUp(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  const props = { letters, setLetters, colorMatrix, setColorMatrix, signUp };

  return (
    <>
      {winModal && <ConfettiAnimation />}
      {winModal && (
        <Stats
          regenerate={regenerate}
          close={() => dispatch(wordleAction.closeWinModal())}
        />
      )}
      {giveUp && <Stats regenerate={regenerate} close={closeStats} />}
      {status === "lose" && <Stats regenerate={regenerate} />}
      {signUp && <LoginAndRegister close={closeSignup} />}
      <div className="App">
        <Header
          regenerate={regenerate}
          status={status}
          openStats={openStats}
          openSignup={openSignup}
          logoutHandler={logoutHandler}
        />
        <Modes regenerate={regenerate} />
        {notAWord && <WordNotExist />}
        {/* {authCtx.isLoggedIn && <h4>{authCtx.userName}</h4>} */}
        <Input {...props} />
        <KeyBoard {...props} />
      </div>
    </>
  );
}

export default App;
