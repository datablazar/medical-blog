import styles from "./EvidenceGrid.module.css";

/**
 * Fig. 2: study designs (rows, strongest first) against translational stages
 * T0–T4 (columns). Built as a real table so text stays full size, reflows on
 * phones and is read correctly by screen readers. Schematic, not counts.
 */

const stages = [
  { id: "T0", name: "Basic science" },
  { id: "T1", name: "First in humans" },
  { id: "T2", name: "Efficacy" },
  { id: "T3", name: "Practice" },
  { id: "T4", name: "Population" },
];

type Mark = "main" | "also" | null;
type Zone = "clinical" | "theory" | null;

const rows: { name: string; level: string; kind: "corr" | "mech"; tag?: string; marks: Mark[] }[] = [
  { name: "Systematic reviews", level: "Oxford level 1", kind: "corr", marks: ["also", null, "main", "main", "also"] },
  { name: "Randomised trials", level: "Oxford level 2", kind: "corr", tag: "Gold standard", marks: [null, "also", "main", "main", "also"] },
  { name: "Cohort and case–control", level: "Oxford levels 3–4", kind: "corr", tag: "Real-world evidence", marks: [null, null, "also", "main", "main"] },
  { name: "Case series and reports", level: "Oxford level 4", kind: "corr", marks: [null, "main", null, "also", null] },
  { name: "Laboratory and animal studies", level: "Feeds level 5", kind: "mech", marks: ["main", "main", null, null, null] },
  { name: "Mechanism-based reasoning", level: "Oxford level 5", kind: "mech", marks: ["main", "also", null, "also", null] },
];

function zoneOf(row: number, col: number): Zone {
  if (row <= 3 && col >= 1) return "clinical";
  if (row >= 4 && col <= 1) return "theory";
  return null;
}

const markText: Record<string, string> = { main: "Mainly used", also: "Also used", none: "Rarely used" };

export function EvidenceGrid() {
  return (
    <div className={styles.wrap}>
      <div className={styles.route} aria-hidden="true">
        <span className={styles.routeLabel}>Translational medicine: from laboratory to population</span>
        <span className={styles.routeLine} />
      </div>

      <table className={styles.table}>
        <caption className={styles.srOnly}>
          Where each study design is used across the translational stages T0 to T4
        </caption>
        <thead>
          <tr>
            <th scope="col" className={styles.corner}>Study design</th>
            {stages.map((s) => (
              <th key={s.id} scope="col" className={styles.stage}>
                <span className={styles.stageId}>{s.id}</span>
                <span className={styles.stageName}>{s.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name}>
              <th scope="row" className={`${styles.rowHead} ${r.kind === "mech" ? styles.mech : styles.corr}`}>
                <span className={styles.rowName}>{r.name}</span>
                <span className={styles.rowLevel}>{r.level}</span>
                {r.tag && <span className={styles.tag}>{r.tag}</span>}
              </th>
              {r.marks.map((m, j) => {
                const zone = zoneOf(i, j);
                return (
                  <td
                    key={j}
                    className={[
                      styles.cell,
                      zone === "clinical" ? styles.zClinical : zone === "theory" ? styles.zTheory : "",
                    ].join(" ")}
                  >
                    <span className={m === "main" ? styles.main : m === "also" ? styles.also : styles.none} aria-hidden="true" />
                    <span className={styles.srOnly}>{markText[m ?? "none"]}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <p className={styles.stageKey}>
        {stages.map((s) => `${s.id} ${s.name.toLowerCase()}`).join(" · ")}
      </p>

      <ul className={styles.legend}>
        <li><span className={styles.main} aria-hidden="true" /> Mainly used</li>
        <li><span className={styles.also} aria-hidden="true" /> Also used</li>
        <li><span className={`${styles.swatch} ${styles.zClinical}`} aria-hidden="true" /> Clinical evidence (studies in people)</li>
        <li><span className={`${styles.swatch} ${styles.zTheory}`} aria-hidden="true" /> Theoretical medicine</li>
        <li><span className={`${styles.bar} ${styles.corrBar}`} aria-hidden="true" /> Evidence of correlation (EBM+)</li>
        <li><span className={`${styles.bar} ${styles.mechBar}`} aria-hidden="true" /> Evidence of mechanism (EBM+)</li>
      </ul>
    </div>
  );
}
