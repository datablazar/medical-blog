import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./tokens.css";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-newsreader",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: {
    default: "Medically Explained",
    template: "%s · Medically Explained",
  },
  description:
    "Clear, honest explanations of the science behind medically unexplained conditions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${newsreader.variable} ${figtree.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
