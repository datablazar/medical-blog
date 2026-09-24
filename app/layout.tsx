import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./tokens.css";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Medically Explained",
    template: "%s · Medically Explained",
  },
  description:
    "Rigorous, readable science writing on ME/CFS, long COVID, fibromyalgia and related conditions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
