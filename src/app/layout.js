import "./globals.css";
import { Inter } from "next/font/google";
import mongoose from "mongoose";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Open Hand Server",
  description:
    "A simple board for displaying numbers of ready orders for the open hand food pantry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
