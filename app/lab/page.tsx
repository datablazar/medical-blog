import Link from "next/link";
import { directions } from "@/lib/lab";
import styles from "./lab.module.css";

export default function LabIndex() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Medically Explained · Design lab</p>
        <h1 className={styles.title}>Five directions</h1>
        <p className={styles.lede}>
          Each is a complete homepage with its own palette, type, layout and signature interaction.
          They all use the same articles, so you can compare like for like. Pick one, or mix parts
          of several, and it becomes the new design system.
        </p>
      </header>

      <ol className={styles.grid}>
        {directions.map((d, i) => (
          <li key={d.slug}>
            <Link
              href={`/lab/${d.slug}`}
              className={styles.tile}
              style={{ background: d.palette.bg, color: d.palette.ink }}
            >
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.name}>{d.name}</span>
              <span className={styles.swatches} aria-hidden="true">
                {d.palette.swatches.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </span>
              <span className={styles.idea}>{d.idea}</span>
              <span className={styles.meta}>
                <strong>Signature</strong> {d.signature}
              </span>
              <span className={styles.meta}>
                <strong>Type</strong> {d.fonts}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className={styles.back}>
        <Link href="/">← Back to the current site</Link>
      </p>
    </div>
  );
}
