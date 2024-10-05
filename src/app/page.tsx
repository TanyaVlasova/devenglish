"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Word = {
  id: number;
  word: string;
  translation: string;
};

type SuccessResult = {
  ok: true;
  data: Word[];
};

type ErrorResult = {
  ok: false;
  error: object;
  message: string;
};

type Result = SuccessResult | ErrorResult;

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const response: Response = await fetch("/api/dictionary");
    const result: Result = await response.json();

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

  return (
    <div className={styles.page}>
      {!!error && <h3>{error}</h3>}

      {words.map((word) => (
        <div key={word.id}>
          <h1>{word.word}</h1>
          <h2>{word.translation}</h2>
        </div>
      ))}
    </div>
  );
}
