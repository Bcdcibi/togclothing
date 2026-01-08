import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To G Clothing",
  description: "Your Store Description here",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  other: {
    // Instagram in-app browser compatibility
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    // Prevent auto-formatting of phone numbers and addresses
    "format-detection": "telephone=no, address=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WixClientContextProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
