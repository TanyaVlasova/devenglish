"use client";

import { forwardRef, useRef } from "react";
import cn from "classnames";

import Face from "./elems/Face";
import Backface from "./elems/Backface";
import styles from "./WordCard.module.css";

import type { HTMLAttributes } from "react";
import type { Word } from "@/app/types";

interface WordCardProps extends HTMLAttributes<HTMLDivElement> {
  word: Word;
  onTurnOver?(): void;
  onChangeCard?(): void;
  onChangeUnturnedCard?(): void;
}

const WordCard = forwardRef<HTMLDivElement, WordCardProps>((props, ref) => {
  const {
    className,
    word,
    onChangeCard,
    onTurnOver,
    onChangeUnturnedCard,
    ...restProps
  } = props;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTurnOver = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transition = "transform 500ms ease-in-out";
    cardRef.current.style.transform = "rotateY(-180deg)";

    if (onTurnOver) onTurnOver();
  };

  const handleChangeCard = () => {
    if (!onChangeCard) return;

    onChangeCard();

    const timer = setTimeout(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transition = "none";
      cardRef.current.style.transform = "rotateY(0)";
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <div className={cn(styles.wrapper, className)} ref={ref} {...restProps}>
      <div className={styles.card} ref={cardRef}>
        <Face
          className={styles.face}
          word={word}
          onButtonClick={handleTurnOver}
          onDeleteWord={onChangeUnturnedCard}
        />
        <Backface
          className={styles.backface}
          word={word}
          onButtonClick={handleChangeCard}
          onDeleteWord={handleChangeCard}
        />
      </div>
    </div>
  );
});

WordCard.displayName = "WordCard";

export default WordCard;
