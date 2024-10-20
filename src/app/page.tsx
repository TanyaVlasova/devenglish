"use client";

import AuthPage from "@/screens/AuthPage";
import IndexPage from "@/screens/IndexPage";
import { useEffect, useState } from "react";

const Page = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuth = !!window.localStorage.getItem("auth");
    setIsAuth(isAuth);
  }, []);

  if (isAuth === null) return null;

  if (!isAuth) return <AuthPage />;

  return <IndexPage />;
};
export default Page;
