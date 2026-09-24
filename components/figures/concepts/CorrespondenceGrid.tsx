import s from "./concepts.module.css";

/**
 * Concept A: study designs (rows, strongest first) against translational
 * stages (columns). A filled dot marks where a design mainly lives; a ring
 * marks where it also appears. Schematic, not a count of studies.
 */

const cols = [
  { id: "T0", name: "Basic science" },
  { id: "T1", name: "First in humans" },
  { id: "T2", name: "Efficacy" },
  { id: "T3", name: "Practice" },
  { id: "T4", name: "Population" },
];

type Mark = "main" | "also" | null;

const rows: { name: string; level: string; marks: Mark[] }[] = [
  { name: "Systematic reviews", level: "Oxford level 1", marks: ["also", null, "main", "main", "also"] },
  { name: "Randomised trials", level: "Oxford level 2", marks: [null, "also", "main", "main", "also"] },
  { name: "Cohort and case–control", level: "Oxford levels 3–4", marks: [null, null, "also", "main", "main"] },
  { name: "Case series and reports", level: "Oxford level 4", marks: [null, "main", null, "also", null] },
  { name: "Laboratory and animal studies", level: "Feeds level 5", marks: ["main", "main", null, null, null] },
  { name: "Mechanism-based reasoning", level: "Oxford level 5", marks: ["main", "also", null, "also", null] },
];

const X0 = 330; // first column's left edge
const CW = 128; // column width
const Y0 = 150; // first row's top edge
const RH = 64; // row height
const cx = (i: number) => X0 + CW * i + CW / 2;
const cy = (i: number) => Y0 + RH * i + RH / 2;

export function CorrespondenceGrid() {
  const right = X0 + CW * cols.length;
  const bottom = Y0 + RH * rows.length;
  return (
    <svg viewBox="0 0 1000 690" className={s.svg} role="img" aria-labelledby="cg-title">
      <title id="cg-title">
        Grid of study designs against translational stages T0 to T4, showing where each design is mainly used, which cells
        count as clinical evidence, and which as theoretical medicine
      </title>

      {/* Translational medicine: the axis itself */}
      <line x1={X0 + 12} y1="28" x2={right - 12} y2="28" className={`${s.coralStroke} ${s.w2}`} />
      <path d={`M${right - 20} 22 L${right - 10} 28 L${right - 20} 34`} className={`${s.coralStroke} ${s.w2}`} />
      <text x={(X0 + right) / 2} y="18" textAnchor="middle" className={`${s.t15} ${s.bold} ${s.coralText}`}>
        Translational medicine: the route from laboratory to population
      </text>

      {/* Column headers */}
      {cols.map((c, i) => (
        <g key={c.id}>
          <text x={cx(i)} y="74" textAnchor="middle" className={`${s.t16} ${s.mono} ${s.coralText}`}>{c.id}</text>
          <text x={cx(i)} y="98" textAnchor="middle" className={`${s.t15} ${s.ink}`}>{c.name}</text>
        </g>
      ))}
      <line x1="40" y1={Y0 - 22} x2={right} y2={Y0 - 22} className={`${s.inkStroke} ${s.w15}`} />

      {/* Rows */}
      {rows.map((r, i) => (
        <g key={r.name}>
          {i % 2 === 0 && <rect x="40" y={Y0 + RH * i} width={right - 40} height={RH} className={s.surface} />}
          <text x="64" y={cy(i) - 3} className={`${s.t16} ${s.bold} ${s.ink}`}>{r.name}</text>
          <text x="64" y={cy(i) + 18} className={`${s.t14} ${s.mono} ${s.muted}`}>{r.level}</text>
          {r.marks.map((m, j) =>
            m === "main" ? (
              <circle key={j} cx={cx(j)} cy={cy(i)} r="11" className={s.coralFill} />
            ) : m === "also" ? (
              <circle key={j} cx={cx(j)} cy={cy(i)} r="9" className={`${s.coralStroke} ${s.w25}`} />
            ) : (
              <circle key={j} cx={cx(j)} cy={cy(i)} r="2.5" className={s.lineStrong} fill="var(--line-strong)" />
            ),
          )}
        </g>
      ))}

      {/* Evidence-type bands (EBM+) on the left edge */}
      <rect x="40" y={Y0 + 6} width="6" height={RH * 4 - 12} rx="3" className={s.inkFill} />
      <rect x="40" y={Y0 + RH * 4 + 6} width="6" height={RH * 2 - 12} rx="3" className={s.coralFill} />

      {/* "Gold standard" tag on the RCT row */}
      <rect x="236" y={cy(1) - 14} width="124" height="28" rx="14" className={s.inkFill} />
      <text x="298" y={cy(1) + 5} textAnchor="middle" className={`${s.t14} ${s.onInk}`}>Gold standard</text>

      {/* Clinical evidence: human studies, T1–T4, rows 1–4 */}
      <rect
        x={X0 + CW + 4}
        y={Y0 + 4}
        width={CW * 4 - 8}
        height={RH * 4 - 8}
        rx="14"
        className={`${s.inkStroke} ${s.w2} ${s.dashed}`}
      />
      {/* Theoretical medicine: mechanism and reasoning rows */}
      <rect
        x="52"
        y={Y0 + RH * 4 + 4}
        width={X0 + CW * 2 - 56}
        height={RH * 2 - 8}
        rx="14"
        className={`${s.coralStroke} ${s.w2} ${s.dashed}`}
      />
      {/* Real-world evidence: observational studies in practice */}
      <rect x={X0 + CW * 3 + 14} y={cy(2) - 20} width={CW * 2 - 28} height="40" rx="20" className={`${s.inkStroke} ${s.w15}`} />

      {/* Legend */}
      <g transform={`translate(40 ${bottom + 44})`}>
        <circle cx="10" cy="0" r="10" className={s.coralFill} />
        <text x="30" y="5" className={`${s.t15} ${s.ink}`}>Mainly used here</text>
        <circle cx="200" cy="0" r="8" className={`${s.coralStroke} ${s.w25}`} />
        <text x="218" y="5" className={`${s.t15} ${s.ink}`}>Also used</text>
        <rect x="330" y="-12" width="44" height="24" rx="8" className={`${s.inkStroke} ${s.w2} ${s.dashed}`} />
        <text x="384" y="5" className={`${s.t15} ${s.ink}`}>Clinical evidence</text>
        <rect x="540" y="-12" width="44" height="24" rx="8" className={`${s.coralStroke} ${s.w2} ${s.dashed}`} />
        <text x="594" y="5" className={`${s.t15} ${s.ink}`}>Theoretical medicine</text>
        <rect x="778" y="-12" width="44" height="24" rx="12" className={`${s.inkStroke} ${s.w15}`} />
        <text x="832" y="5" className={`${s.t15} ${s.ink}`}>Real-world</text>
      </g>
      <g transform={`translate(40 ${bottom + 84})`}>
        <rect x="0" y="-11" width="6" height="22" rx="3" className={s.inkFill} />
        <text x="16" y="5" className={`${s.t15} ${s.ink}`}>Evidence of correlation (EBM+)</text>
        <rect x="300" y="-11" width="6" height="22" rx="3" className={s.coralFill} />
        <text x="316" y="5" className={`${s.t15} ${s.ink}`}>Evidence of mechanism (EBM+)</text>
      </g>
    </svg>
  );
}
