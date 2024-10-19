import cn from "classnames";
import styles from "./Input.module.css";
import type { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <input
      type="text"
      className={cn(styles.input, className)}
      autoComplete="off"
      {...restProps}
    />
  );
};

export default Input;
