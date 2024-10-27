import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Word } from "@/app/types";

type Words = {
  allWords: Word[];
  currentWord: Word | null;
  nextWord: Word | null;
};

const initialState: Words = {
  allWords: [],
  currentWord: null,
  nextWord: null,
};

export const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setAllWords: (state, action: PayloadAction<Word[]>) => {
      state.allWords = action.payload;
    },
    setCurrentWord: (state, action: PayloadAction<Word | null>) => {
      state.currentWord = action.payload;
    },
    setNextWord: (state, action: PayloadAction<Word | null>) => {
      state.nextWord = action.payload;
    },
  },
});

export const { setAllWords, setCurrentWord, setNextWord } = wordsSlice.actions;

export default wordsSlice.reducer;
