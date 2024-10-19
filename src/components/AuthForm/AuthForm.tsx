"use client";

import cn from "classnames";
import styles from "./AuthForm.module.css";
import { ChangeEvent, useState, type FC, type HTMLAttributes } from "react";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

type AuthFormProps = HTMLAttributes<HTMLDivElement>;

const AuthForm: FC<AuthFormProps> = (props) => {
  const { className, ...restProps } = props;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLogin(value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleClick = () => {
    if (login === "test" && password === "test") {
      window.localStorage.setItem("auth", "true");
      window.location.href = "/";
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...restProps}>
      <div className={styles.title}>Авторизация</div>
      <Input
        className={styles.login}
        value={login}
        onChange={handleChangeLogin}
        type="text"
        placeholder="Логин"
      />
      <Input
        className={styles.password}
        value={password}
        onChange={handleChangePassword}
        type="password"
        placeholder="Пароль"
      />
      <Button className={styles.button} size="m" onClick={handleClick}>
        Войти
      </Button>
    </div>
  );
};

export default AuthForm;
