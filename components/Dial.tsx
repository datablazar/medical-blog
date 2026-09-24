import { conditions } from "@/lib/site-content";
import styles from "./Dial.module.css";

const cx = 260;
const cy = 260;
const seg = (Math.PI * 2) / conditions.length;

const ticks = Array.from({ length: 120 }, (_, i) => {
  const a = (i / 120) * Math.PI * 2;
  const long = i % 10 === 0;
  const r1 = 238;
  const r2 = long ? 222 : 230;
  return { x1: cx + Math.cos(a) * r1, y1: cy + Math.sin(a) * r1, x2: cx + Math.cos(a) * r2, y2: cy + Math.sin(a) * r2, long };
});

function arc(i: number, r: number) {
  const a0 = -Math.PI / 2 + i * seg + 0.06;
  const a1 = a0 + seg - 0.12;
  return `M${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r}`;
}

/** The brand's calibrated dial: one arc per condition, the first one active. */
export function Dial() {
  return (
    <svg viewBox="0 0 520 520" className={styles.dial} role="img" aria-label="A dial divided into the six conditions this site covers">
      <g className={styles.tickRing}>
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={t.long ? styles.tickLong : styles.tick} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="196" className={styles.ring} />
      <circle cx={cx} cy={cy} r="120" className={styles.ring} strokeDasharray="2 6" />
      {conditions.map((c, i) => {
        const mid = -Math.PI / 2 + (i + 0.5) * seg;
        return (
          <g key={c.slug}>
            <path d={arc(i, 172)} className={i === 0 ? styles.arcActive : styles.arc} />
            <text x={cx + Math.cos(mid) * 146} y={cy + Math.sin(mid) * 146 + 4} textAnchor="middle" className={styles.label}>
              {c.name}
            </text>
          </g>
        );
      })}
      <line x1={cx} y1={cy} x2={cx} y2={cy - 110} className={styles.needle} />
      <circle cx={cx} cy={cy} r="5" className={styles.hub} />
      <text x={cx} y={cy + 40} textAnchor="middle" className={styles.caption}>{conditions.length} conditions</text>
      <text x={cx} y={cy + 58} textAnchor="middle" className={styles.caption}>1 question: why?</text>
    </svg>
  );
}
