"use client";

import cn from "classnames";
import styles from "./WordCard.module.css";
import { useRef, useState, type FC, type HTMLAttributes } from "react";
import { Word } from "@/app/types";
import Button from "@/ui/Button";

interface WordCardProps extends HTMLAttributes<HTMLDivElement> {
  word: Word;
  onChangeWord?(): void;
}

const WordCard: FC<WordCardProps> = (props) => {
  const { className, word, onChangeWord, ...restProps } = props;
  const [turnOvered, setTurnOvered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTurnOver = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform = `rotateY(${turnOvered ? 360 : 180}deg)`;
    setTurnOvered((prev) => !prev);

    const timeout = setTimeout(() => {
      if (turnOvered && onChangeWord) onChangeWord();
    }, 200);

    return () => clearTimeout(timeout);
  };

  return (
    <div className={cn(styles.wrapper, className)} {...restProps}>
      <div className={styles.background} />
      <div className={styles.card} onClick={handleTurnOver} ref={cardRef}>
        <div className={styles.face}>
          <div className={styles.text}>{word.text}</div>
          <Button className={styles.button}>Перевернуть</Button>
        </div>
        <div className={styles.backface}>
          <div className={styles.text}>{word.text}</div>
          <div className={styles.translation}>
            {word.translation.split(",").map((translation) => (
              <div key={translation}>{translation}</div>
            ))}
          </div>

          <Button className={styles.button}>Далее</Button>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
