import type { ReactNode } from "react";
import styles from "./Callout.module.css";

type Variant = "in-short" | "good-to-know" | "urgent";

const defaultTitles: Record<Variant, string> = {
  "in-short": "In short",
  "good-to-know": "Good to know",
  urgent: "Seek urgent help",
};

export function Callout({
  variant,
  title,
  children,
}: {
  variant: Variant;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={`${styles.callout} ${styles[variant]}`}>
      <h2 className={`t-h3 ${styles.title}`}>{title ?? defaultTitles[variant]}</h2>
      <div className="stack">{children}</div>
    </aside>
  );
}
