"use client";

import AuthPage from "@/screens/AuthPage";
import IndexPage from "@/screens/IndexPage";

const Page = () => {
  const isAuth = window.localStorage.getItem("auth");

  if (!isAuth) return <AuthPage />;

  return <IndexPage />;
};
export default Page;
