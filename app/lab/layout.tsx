import type { Metadata } from "next";
import { LabBar } from "@/components/lab/LabBar";

export const metadata: Metadata = {
  title: "Design lab",
  robots: { index: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LabBar />
    </>
  );
}
