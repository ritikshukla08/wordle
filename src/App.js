import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Input from "./components/Input/Input";
import KeyBoard from "./components/keyboard/KeyBoard";
import ConfettiAnimation from "./components/Modals/ConfettiAnimation";
import Stats from "./components/Modals/Stats";
import WordNotExist from "./components/Modals/WordNotExist";
import words from "./db/words.json";
import { wordleAction } from "./store/wordle-slice";
import ResetIcon from "./Icons/ResetIcon";
import LoginAndRegister from "./components/Modals/LoginAndRegister";
import AuthContext from "./Auth/AuthContext";

function App() {
  const data = useSelector((state) => state.wordle.answer);
  const reset = useSelector((state) => state.wordle.reset);
  const status = useSelector((state) => state.wordle.status);
  const winModal = useSelector((state) => state.wordle.winModal);
  const notAWord = useSelector((state) => state.wordle.notAWord);
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);

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
  const [signUp, setSignUp] = useState(null);

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
        <div className="header">
          <h1 className="heading">wordle</h1>
          {!authCtx.isLoggedIn && <span onClick={openSignup}>sign up</span>}
          {authCtx.isLoggedIn && <span onClick={logoutHandler}>log out</span>}
        </div>
        {notAWord && <WordNotExist />}
        {authCtx.isLoggedIn && <h4>{authCtx.userName}</h4>}
        <Input {...props} />
        <div>
          <span className="appBtn reset" onClick={regenerate}>
            <ResetIcon />
          </span>
          {status === "playing" && (
            <span className="appBtn giveup" onClick={openStats}>
              give
              <br />
              up
            </span>
          )}
        </div>
        <KeyBoard {...props} />
      </div>
    </>
  );
}

export default App;
