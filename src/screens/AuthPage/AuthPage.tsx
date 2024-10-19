import MainLayout from "@/layouts/MainLayout";
import styles from "./AuthPage.module.css";
import type { FC } from "react";
import AuthForm from "@/components/AuthForm";

const AuthPage: FC = () => {
  return (
    <MainLayout>
      <div className={styles.page}>
        <AuthForm />
      </div>
    </MainLayout>
  );
};

export default AuthPage;
