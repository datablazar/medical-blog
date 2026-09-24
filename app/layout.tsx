import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Mono, Lexend } from "next/font/google";
import "./tokens.css";
import "./globals.css";

// Lexend: designed for reading fluency, with wide spacing that reduces crowding.
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });
// Atkinson Hyperlegible Mono: maximally distinct characters (0/O, 1/l/I) for numbers and data.
const atkinsonMono = Atkinson_Hyperlegible_Mono({ subsets: ["latin"], variable: "--font-atkinson-mono" });

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
    <html lang="en-GB" className={`${lexend.variable} ${atkinsonMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
