import cn from "classnames";
import styles from "./Button.module.css";
import type { FC, HTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const Button: FC<ButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <button className={cn(styles.button, className)} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
