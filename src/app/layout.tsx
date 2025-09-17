"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Navbar from "@/components/Navbar";
import AuthInitializer from "@/components/AuthInitializer";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  const isDashboardPage = pathname?.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && !isDashboardPage && <Navbar />}
      <main>{children}</main>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Provider store={store}>
          <ToastProvider>
            <AuthInitializer>
              <LayoutContent>{children}</LayoutContent>
            </AuthInitializer>
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
