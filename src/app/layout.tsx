import type { Metadata } from "next";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import QueryClientProvider from "./providers/QueryClientProvider";
import FontsProvider from "./providers/FontsProvider";

export const metadata: Metadata = {
  title: "Dev english",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <FontsProvider>{children}</FontsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
