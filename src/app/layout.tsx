import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import QueryClientProvider from "./providers/QueryClientProvider";
import FontsProvider from "./providers/FontsProvider";

export const metadata: Metadata = {
  title: "Dev english",
};

export const viewport: Viewport = {
  themeColor: "#ffded2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
