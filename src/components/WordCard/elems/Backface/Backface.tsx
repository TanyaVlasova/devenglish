import cn from "classnames";

import Button from "@/ui/Button";
import Menu from "../Menu";
import styles from "./Backface.module.css";

import type { FC, HTMLAttributes } from "react";
import type { Word } from "@/app/types";

interface BackfaceProps extends HTMLAttributes<HTMLDivElement> {
  word: Word;
  onButtonClick?(): void;
  onDeleteWord?(): void;
}

const Backface: FC<BackfaceProps> = (props) => {
  const { className, word, onButtonClick, onDeleteWord, ...restProps } = props;

  return (
    <div className={cn(styles.backface, className)} {...restProps}>
      <div className={styles.container}>
        <Menu className={styles.menu} word={word} onDeleteWord={onDeleteWord} />
        <div className={styles.text}>{word.text}</div>
        <div className={styles.translation}>
          {word.translation.split(",").map((translation) => (
            <div key={translation}>{translation}</div>
          ))}
        </div>
        <Button className={styles.button} size="m" wide onClick={onButtonClick}>
          Далее
        </Button>
      </div>
    </div>
  );
};

export default Backface;
