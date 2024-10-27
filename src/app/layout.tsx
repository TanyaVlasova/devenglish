import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FC, PropsWithChildren } from "react";
import QueryClientProvider from "./providers/QueryClientProvider";
import FontsProvider from "./providers/FontsProvider";
import StoreProvider from "./providers/StoreProvider";

export const metadata: Metadata = {
  title: "Dev english",
  appleWebApp: true,
};

export const viewport: Viewport = {
  themeColor: "#f0e8e6",
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
          <FontsProvider>
            <StoreProvider>{children}</StoreProvider>
          </FontsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
