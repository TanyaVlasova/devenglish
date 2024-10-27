import cn from "classnames";

import Button from "@/ui/Button";
import Menu from "../Menu";
import styles from "./Face.module.css";

import type { FC, HTMLAttributes } from "react";
import type { Word } from "@/app/types";

interface FaceProps extends HTMLAttributes<HTMLDivElement> {
  word: Word;
  onButtonClick?(): void;
}

const Face: FC<FaceProps> = (props) => {
  const { className, word, onButtonClick, ...restProps } = props;

  return (
    <div className={cn(styles.face, className)} {...restProps}>
      <Menu className={styles.menu} word={word} />
      <div className={styles.text}>{word.text}</div>
      <Button className={styles.button} size="m" wide onClick={onButtonClick}>
        Перевернуть
      </Button>
    </div>
  );
};

export default Face;
