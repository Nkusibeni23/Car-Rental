"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Provider store={store}>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
