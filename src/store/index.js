import { configureStore } from "@reduxjs/toolkit";
import wordleSlice from "./wordle-slice";

const store = configureStore({
  reducer: { wordle: wordleSlice.reducer },
});

export default store;
