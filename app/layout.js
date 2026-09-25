import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SubStop — all-in-one subscriptions manager",
  description:
    "Track all your subscriptions in one place and get smart reminders before any payment. Take control of your subscriptions today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`scroll-smooth`}>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
