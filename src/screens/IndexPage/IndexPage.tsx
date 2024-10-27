"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./IndexPage.module.css";
import WordCard from "@/components/WordCard";
import { Result, Word } from "@/app/types";
import MainLayout from "@/layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAllWords, setCurrentWord, setNextWord } from "@/store/words";
import { getRandomNumber } from "@/utils/getRandomNumber";

const IndexPage = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const initial = useRef(false);
  const { currentWord, nextWord, allWords } = useAppSelector(
    (state) => state.words
  );

  const fetchData = useCallback(async () => {
    const response: Response = await fetch("/api/dictionary");
    const result: Result<Word[]> = await response.json();

    if (result.ok) {
      setError("");
      const newWords = result.data;

      if (newWords.length > 0) {
        const index = getRandomNumber(newWords.length);
        const nextIndex = getRandomNumber(newWords.length, index);
        dispatch(setAllWords(newWords));
        dispatch(setCurrentWord(newWords[index]));
        dispatch(setNextWord(newWords[nextIndex]));
      }
    } else {
      setError(result.message);
      console.error(result.message);
      console.error(result.error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (initial.current) return;
    fetchData();
    initial.current = true;
  }, [fetchData]);

  const handleChangeWord = () => {
    const index = getRandomNumber(allWords.length);
    dispatch(setCurrentWord(allWords[index]));
  };

  if (!currentWord || !nextWord) return;

  return (
    <MainLayout>
      <div className={styles.white}>
        {error && <h3>{error}</h3>}

        {currentWord && (
          <WordCard
            className={styles.card}
            word={currentWord}
            onChangeWord={handleChangeWord}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default IndexPage;
