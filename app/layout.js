import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SubStop — all-in-one subscriptions manager",
  description:
    "Track all your subscriptions in one place and get smart reminders before any payment. Take control of your subscriptions today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`scroll-smooth`}>
      <head>

        {/* Twitter Card */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="SubStop" />
        <meta
          property="og:description"
          content="all-in-one subscriptions manager"
        />
        <meta property="og:url" content="https://substop.cc/" />
        <meta property="og:image" content="/images/meta-image.jpg" />
      </head>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
