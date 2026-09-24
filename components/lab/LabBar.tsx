"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { directions } from "@/lib/lab";
import styles from "./LabBar.module.css";

export function LabBar() {
  const pathname = usePathname();
  const index = directions.findIndex((d) => pathname === `/lab/${d.slug}`);
  if (index === -1) return null;

  const prev = directions[(index - 1 + directions.length) % directions.length];
  const next = directions[(index + 1) % directions.length];

  return (
    <nav className={styles.bar} aria-label="Design lab">
      <Link href="/lab" className={styles.home}>Lab</Link>
      <Link href={`/lab/${prev.slug}`} aria-label={`Previous: ${prev.name}`} className={styles.arrow}>←</Link>
      <span className={styles.label}>
        <span className={styles.count}>{String(index + 1).padStart(2, "0")}/{String(directions.length).padStart(2, "0")}</span>
        {directions[index].name}
      </span>
      <Link href={`/lab/${next.slug}`} aria-label={`Next: ${next.name}`} className={styles.arrow}>→</Link>
    </nav>
  );
}
