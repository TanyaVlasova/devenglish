import { configureStore } from "@reduxjs/toolkit";
import WordsReducer from "./words";

export const store = configureStore({
  reducer: {
    words: WordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
