import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Coach P Factory — Strength, Conditioning & Performance Coaching",
  description:
    "Coach P Factory — performance coaching built on 20+ years of experience, technique and discipline. Strength, conditioning and competition prep for athletes and individuals ready to put in the work.",
  openGraph: {
    title: "Coach P Factory — Built in the Factory",
    description:
      "Performance coaching where disciplined, technical work is turned into real results. Strength, conditioning, agility and stage prep with Coach P.",
    siteName: "Coach P Factory",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
