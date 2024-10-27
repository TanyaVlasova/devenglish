import cn from "classnames";

import styles from "./Menu.module.css";

import type { FC, HTMLAttributes } from "react";
import type { Word } from "@/app/types";

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  word: Word;
}

const Menu: FC<MenuProps> = (props) => {
  const { className, word, ...restProps } = props;

  return (
    <div className={cn(styles.menu, className)} {...restProps}>
      menu
    </div>
  );
};

export default Menu;
