import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
