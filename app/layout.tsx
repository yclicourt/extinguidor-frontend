import type { Metadata } from "next";
import "./ui/globals.css";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Extinguidor App",
  description: "Extinguidor App",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" sizes="any" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
