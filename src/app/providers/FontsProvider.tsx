import localFont from "next/font/local";
import type { FC, PropsWithChildren } from "react";
import cn from "classnames";

const vetrino = localFont({
  src: "../../fonts/Vetrino.otf",
  variable: "--font-vetrino",
  weight: "400",
});

const involve = localFont({
  src: "../../fonts/Involve-Regular.ttf",
  variable: "--font-involve",
  weight: "400",
});

const FontsProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn(vetrino.variable, involve.variable, involve.className)}>
      {children}
    </div>
  );
};

export default FontsProvider;
