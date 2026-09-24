import s from "./concepts.module.css";

/**
 * Concept D: a translator from everyday terms to formal study designs, to
 * Oxford 2011 levels (treatment benefits), to the EBM+ type of evidence.
 * Coral links carry mechanism; ink links carry correlation; dashed links
 * lead to something that is a process, not a level.
 */

type Node = { id: string; label: string; y: number };

const COL = [30, 280, 562, 736]; // x of each column's left edge
const W = [220, 244, 124, 234]; // node widths per column
const NH = 40; // node height

const everyday: Node[] = [
  { id: "gold", label: "Gold standard", y: 110 },
  { id: "clinical", label: "Clinical evidence", y: 190 },
  { id: "rwe", label: "Real-world evidence", y: 290 },
  { id: "basic", label: "Basic science", y: 390 },
  { id: "theory", label: "Theoretical medicine", y: 460 },
  { id: "trans", label: "Translational medicine", y: 550 },
];

const formal: Node[] = [
  { id: "sr", label: "Systematic review of RCTs", y: 80 },
  { id: "rct", label: "Randomised controlled trial", y: 140 },
  { id: "obs", label: "Cohort, case–control", y: 230 },
  { id: "cs", label: "Case series", y: 300 },
  { id: "pre", label: "Laboratory, animal study", y: 390 },
  { id: "mbr", label: "Mechanism-based reasoning", y: 460 },
  { id: "pipe", label: "T0–T4 research pipeline", y: 550 },
];

const oxford: Node[] = [
  { id: "l1", label: "Level 1", y: 80 },
  { id: "l2", label: "Level 2", y: 140 },
  { id: "l3", label: "Level 3", y: 200 },
  { id: "l4", label: "Level 4", y: 270 },
  { id: "l5", label: "Level 5", y: 430 },
  { id: "none", label: "Not a level", y: 550 },
];

const ebm: Node[] = [
  { id: "corr", label: "Evidence of correlation", y: 175 },
  { id: "mech", label: "Evidence of mechanism", y: 430 },
  { id: "proc", label: "A process, not evidence", y: 550 },
];

type Kind = "corr" | "mech" | "proc";
const links: [number, string, string, Kind][] = [
  [0, "gold", "rct", "corr"],
  [0, "gold", "sr", "corr"],
  [0, "clinical", "sr", "corr"],
  [0, "clinical", "rct", "corr"],
  [0, "clinical", "obs", "corr"],
  [0, "clinical", "cs", "corr"],
  [0, "rwe", "obs", "corr"],
  [0, "basic", "pre", "mech"],
  [0, "theory", "mbr", "mech"],
  [0, "trans", "pipe", "proc"],
  [1, "sr", "l1", "corr"],
  [1, "rct", "l2", "corr"],
  [1, "obs", "l3", "corr"],
  [1, "obs", "l4", "corr"],
  [1, "cs", "l4", "corr"],
  [1, "pre", "l5", "mech"],
  [1, "mbr", "l5", "mech"],
  [1, "pipe", "none", "proc"],
  [2, "l1", "corr", "corr"],
  [2, "l2", "corr", "corr"],
  [2, "l3", "corr", "corr"],
  [2, "l4", "corr", "corr"],
  [2, "l5", "mech", "mech"],
  [2, "none", "proc", "proc"],
];

const columns = [everyday, formal, oxford, ebm];
const find = (col: number, id: string) => columns[col].find((n) => n.id === id)!;

export function TermTranslator() {
  const heads = ["Everyday term", "Formal term", "Oxford level", "EBM+ evidence type"];
  return (
    <svg viewBox="0 0 1000 640" className={s.svg} role="img" aria-labelledby="tt-title">
      <title id="tt-title">
        Linked columns translating everyday terms into formal study designs, their Oxford 2011 levels for treatment
        benefits, and the EBM+ type of evidence they provide
      </title>

      {heads.map((h, i) => (
        <text key={h} x={COL[i]} y="34" className={`${s.t15} ${s.mono} ${s.coralText}`}>{h}</text>
      ))}
      <line x1="30" y1="48" x2="970" y2="48" className={`${s.inkStroke} ${s.w15}`} />

      {/* Links first, so nodes sit on top */}
      {links.map(([c, from, to, kind]) => {
        const a = find(c, from);
        const b = find(c + 1, to);
        const x1 = COL[c] + W[c];
        const x2 = COL[c + 1];
        const y1 = a.y + NH / 2;
        const y2 = b.y + NH / 2;
        const mid = (x1 + x2) / 2;
        const cls =
          kind === "mech"
            ? `${s.coralStroke} ${s.w2}`
            : kind === "proc"
              ? `${s.lineStrong} ${s.w2} ${s.dashed}`
              : `${s.inkStroke} ${s.w15}`;
        return <path key={`${c}${from}${to}`} d={`M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`} className={cls} />;
      })}

      {columns.map((col, c) =>
        col.map((n) => {
          const isMech = ["basic", "theory", "pre", "mbr", "l5", "mech"].includes(n.id);
          const isProc = ["trans", "pipe", "none", "proc"].includes(n.id);
          const fill = c === 3 ? (isMech ? s.tint : isProc ? s.white : s.surface) : s.white;
          const stroke = isMech ? "var(--coral)" : isProc ? "var(--line-strong)" : "var(--ink)";
          return (
            <g key={n.id}>
              <rect x={COL[c]} y={n.y} width={W[c]} height={NH} rx="10" className={fill} stroke={stroke} strokeWidth={c === 0 ? 2 : 1.5} />
              <text x={COL[c] + 14} y={n.y + 26} className={`${s.t15} ${c === 0 || c === 3 ? s.bold : ""} ${s.ink}`}>
                {n.label}
              </text>
            </g>
          );
        }),
      )}

      <text x="30" y="626" className={`${s.t14} ${s.muted}`}>
        Oxford levels are the 2011 OCEBM levels for questions about treatment benefits.
      </text>
    </svg>
  );
}
