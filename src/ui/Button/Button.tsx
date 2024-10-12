import cn from "classnames";
import styles from "./Button.module.css";
import type { FC, HTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  view?: "primary" | "secondary";
  size?: "s" | "m";
  wide?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    view = "primary",
    size = "s",
    wide,
    children,
    ...restProps
  } = props;

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: view === "primary",
        [styles.secondary]: view === "secondary",
        [styles.sizeS]: size === "s",
        [styles.sizeM]: size === "m",
        [styles.wide]: wide,
      })}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
