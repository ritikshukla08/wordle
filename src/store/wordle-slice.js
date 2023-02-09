import { createSlice } from "@reduxjs/toolkit";

const wordleSlice = createSlice({
  name: "wordle",
  initialState: {
    wordsArr: [],
    curPosition: { curRound: 0, curBox: 0 },
    stopTyping: false,
    colorObj: {},
    notAWord: false,
    winModal: false,
    signup: true,
    login: false,
    answer: "",
    reset: 0,
    status: "playing",
  },
  reducers: {
    setWords(state, action) {
      state.wordsArr = [...action.payload];
    },
    setAnswer(state, action) {
      state.answer = action.payload;
    },
    enterClick(state) {
      state.curPosition = {
        curRound: state.curPosition.curRound + 1,
        curBox: 0,
      };
    },
    deleteClick(state) {
      state.curPosition = {
        ...state.curPosition,
        curBox: state.curPosition.curBox - 1,
      };
    },
    onLetterClick(state) {
      state.curPosition = {
        curRound: state.curPosition.curRound,
        curBox: state.curPosition.curBox + 1,
      };
    },
    onReset(state) {
      state.reset = ++state.reset;
      state.status = "playing";
      state.stopTyping = false;
      state.colorObj = {};
      state.notAWord = false;
      state.curPosition = { curRound: 0, curBox: 0 };
    },
    onWin(state) {
      state.status = "won";
      state.stopTyping = true;
    },
    gameOver(state) {
      state.stopTyping = true;
      state.status = "lose";
    },
    openWinModal(state) {
      state.winModal = true;
    },
    closeWinModal(state) {
      state.winModal = false;
    },
    openNotAWord(state) {
      state.notAWord = true;
    },
    closeNotAWord(state) {
      state.notAWord = false;
    },
    setColorObj(state, action) {
      state.colorObj = action.payload;
    },
    stopTyping(state) {
      state.stopTyping = true;
    },
    openSignup(state) {
      state.signup = true;
      state.login = false;
    },
    openlogin(state) {
      state.signup = false;
      state.login = true;
    },
  },
});

export const wordleAction = wordleSlice.actions;
export default wordleSlice;
