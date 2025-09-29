import type { Metadata } from "next";
import { type FC, type ReactNode } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "@/config/styles/globals.css";
import RestApiProvider from "@/pkg/libraries/rest-api/rest-api.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Library - Digital Book Collection",
  description: "Discover your next great read from our extensive digital collection",
};

// interface
interface IProps {
  children: ReactNode;
}
// component
const RootLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props;
  // return
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RestApiProvider>
          {children}
        </RestApiProvider>
      </body>
    </html>
  );
}

export default RootLayout;
