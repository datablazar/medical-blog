import styles from "./EvidenceLadder.module.css";

const rungs = [
  { name: "Systematic reviews and meta-analyses", can: "Pool every good study on a question", strength: 6 },
  { name: "Randomised controlled trials", can: "Show whether a treatment causes an effect", strength: 5 },
  { name: "Observational studies", can: "Show that two things are linked", strength: 4 },
  { name: "Case series and case reports", can: "Flag something new or unexpected", strength: 3 },
  { name: "Mechanistic and laboratory research", can: "Explain how an illness or treatment might work", strength: 2 },
  { name: "Expert opinion and theory", can: "Generate ideas worth testing", strength: 1 },
];

/** Fig. 1: the conventional hierarchy of evidence, with translation as the route between rungs. */
export function EvidenceLadder() {
  return (
    <div className={styles.wrap}>
      <div className={styles.scale} aria-hidden="true">
        <span>Stronger</span>
        <span className={styles.scaleLine} />
        <span>Weaker</span>
      </div>
      <ol className={styles.rungs}>
        {rungs.map((r, i) => (
          <li key={r.name} className={styles.rung}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.body}>
              <span className={styles.name}>{r.name}</span>
              <span className={styles.can}>{r.can}</span>
            </span>
            <span className={styles.meter} aria-label={`Strength ${r.strength} of 6`}>
              {Array.from({ length: 6 }, (_, j) => (
                <span key={j} className={j < r.strength ? styles.on : undefined} />
              ))}
            </span>
          </li>
        ))}
      </ol>
      <div className={styles.translation} aria-label="Translational medicine carries ideas from mechanistic research up to trials and into practice">
        <span className={styles.bracket} aria-hidden="true" />
        <span className={styles.tLabel}>Translational medicine: from laboratory to trial to practice</span>
      </div>
    </div>
  );
}
