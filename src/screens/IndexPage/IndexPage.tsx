"use client";

import { useEffect, useState } from "react";
import styles from "./IndexPage.module.css";
import WordCard from "@/components/WordCard";
import { Result, Word } from "@/app/types";
import MainLayout from "@/layouts/MainLayout";

function getRandomInt(length: number, currentInt?: number) {
  const randomInt = Math.floor(Math.random() * length);
  if (randomInt === currentInt) return getRandomInt(length, currentInt);

  return randomInt;
}

const IndexPage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  const fetchData = async () => {
    const response: Response = await fetch("/api/dictionary");
    const result: Result<Word[]> = await response.json();

    if (result.ok) {
      setError("");
      setWords(result.data);
    } else {
      setError(result.message);
      console.error(result.message);
      console.error(result.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (words?.length) setCurrentWordIndex(0);
  }, [words]);

  const handleChangeWord = () => {
    const index = getRandomInt(words.length, currentWordIndex);
    setCurrentWordIndex(index);
  };

  return (
    <MainLayout>
      <div className={styles.white}>
        {!!error && <h3>{error}</h3>}

        {!!words[currentWordIndex] && (
          <WordCard
            className={styles.card}
            word={words[currentWordIndex]}
            onChangeWord={handleChangeWord}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default IndexPage;
