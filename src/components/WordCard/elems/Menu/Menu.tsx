import { useState } from "react";
import cn from "classnames";

import useOnClickOutside from "@/hooks/useOnClickOutside";
import Button from "@/ui/Button";
import styles from "./Menu.module.css";

import type { FC, HTMLAttributes } from "react";
import type { Word } from "@/app/types";

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  word: Word;
  cnBurger?: string;
  cnDropDown?: string;
  onDeleteWord?(): void;
}

/**
 * Поместите компонент в relative контейнер, в пределах которого будет раскрываться меню
 */
const Menu: FC<MenuProps> = (props) => {
  const { className, cnDropDown, cnBurger, word, onDeleteWord, ...restProps } =
    props;
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => setOpened((prev) => !prev);
  const closeMenu = () => setOpened(false);

  const ref = useOnClickOutside<HTMLDivElement>(closeMenu);

  const handleDeleteWord = async () => {
    const body = { id: word.id };
    const result = await fetch("/api/dictionary", {
      method: "DELETE",
      body: JSON.stringify(body),
    });

    if (result.ok) {
      // Как-то отследить, чтобы чтобы это слово больше не повторялось до повторного получения данных
      closeMenu();

      setTimeout(() => {
        if (onDeleteWord) onDeleteWord();
      }, 300);
    }
  };

  return (
    <div
      className={cn(styles.wrapper, className, { [styles.opened]: opened })}
      ref={ref}
      {...restProps}
    >
      <div className={cn(styles.burger, cnBurger)} onClick={toggleMenu}>
        <div className={styles.line} />
      </div>
      <div className={cn(styles.menu, cnDropDown)}>
        <div className={styles.list}>
          <Button className={styles.item} onClick={handleDeleteWord}>
            Удалить из словаря
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
