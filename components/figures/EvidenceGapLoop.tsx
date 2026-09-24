import styles from "./EvidenceGapLoop.module.css";

const steps = [
  { title: "Little research funding", note: "Funding far below disease burden" },
  { title: "Few, small studies", note: "Mechanistic work in tens of people" },
  { title: "Low-certainty, contested findings", note: "Downgraded for imprecision; disputed" },
  { title: "“No good evidence”", note: "Read as absence, not as gap" },
];

/** Fig. 2: the self-reinforcing loop between underfunding and "no evidence". */
export function EvidenceGapLoop() {
  return (
    <div className={styles.loop}>
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.title}>{s.title}</span>
            <span className={styles.note}>{s.note}</span>
          </li>
        ))}
      </ol>
      <div className={styles.return} aria-hidden="true">
        <span className={styles.returnLine} />
        <span className={styles.returnLabel}>…which justifies little funding, and the loop repeats</span>
      </div>
    </div>
  );
}
