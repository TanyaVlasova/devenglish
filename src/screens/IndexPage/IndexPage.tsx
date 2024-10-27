"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAllWords, setCurrentWord, setNextWord } from "@/store/words";
import { getRandomNumber } from "@/utils/getRandomNumber";
import WordCard from "@/components/WordCard";
import MainLayout from "@/layouts/MainLayout";
import styles from "./IndexPage.module.css";

import type { Result, Word } from "@/app/types";

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.words);
  const { allWords, currentWord, nextWord } = data;
  const [error, setError] = useState("");

  const [animation, setAnimation] = useState(false);
  const nextCardRef = useRef<HTMLDivElement>(null);
  const initial = useRef(false);

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

  const handleChangeCard = () => {
    setAnimation(true);

    setTimeout(() => {
      setAnimation(false);
      dispatch(setCurrentWord(nextWord));

      const current = allWords.findIndex((word) => word.id === nextWord?.id);
      const next = getRandomNumber(allWords.length, current);
      dispatch(setNextWord(allWords[next]));

      if (!nextCardRef.current) return;
      nextCardRef.current.style.visibility = "hidden";
    }, 500);
  };

  const handleTurnOver = () => {
    setTimeout(() => {
      if (!nextCardRef.current) return;
      nextCardRef.current.style.visibility = "visible";
    }, 500);
  };

  useEffect(() => {
    if (initial.current) return;
    fetchData();
    initial.current = true;
  }, [fetchData]);

  if (!currentWord || !nextWord) return;

  return (
    <MainLayout>
      <div className={styles.page}>
        {error && <h3>{error}</h3>}

        <div
          className={cn(styles.cards, {
            [styles.animation]: animation,
          })}
        >
          <WordCard
            className={cn(styles.card, styles.currentCard)}
            word={currentWord}
            onTurnOver={handleTurnOver}
            onChangeCard={handleChangeCard}
          />
          <WordCard
            className={cn(styles.card, styles.nextCard)}
            ref={nextCardRef}
            word={nextWord}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default IndexPage;
