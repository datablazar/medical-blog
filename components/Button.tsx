import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

export function Button({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={styles.button}>
      {children}
    </Link>
  );
}
