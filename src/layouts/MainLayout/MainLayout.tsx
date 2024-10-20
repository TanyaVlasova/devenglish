import styles from "./MainLayout.module.css";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default MainLayout;
