import localFont from "next/font/local";
import type { FC, PropsWithChildren } from "react";
import cn from "classnames";

const calypso = localFont({
  src: "../../fonts/Calypso.ttf",
  variable: "--font-calypso",
  weight: "400",
});

const unageo = localFont({
  src: "../../fonts/Unageo[wght].ttf",
  variable: "--font-unageo",
  weight: "100 900",
});

const FontsProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn(calypso.variable, unageo.variable, unageo.className)}>
      {children}
    </div>
  );
};

export default FontsProvider;
