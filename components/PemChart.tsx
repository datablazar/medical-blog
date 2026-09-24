import styles from "./PemChart.module.css";

// x: 0–120 hours → 60–700; y: severity 0–1 → 250–50.
const X = (h: number) => 60 + (h / 120) * 640;
const Y = (v: number) => 250 - v * 200;

const points: [number, number][] = [
  [0, 0.1], [6, 0.1], [12, 0.18], [20, 0.45], [30, 0.78], [38, 0.85],
  [48, 0.74], [64, 0.5], [84, 0.28], [104, 0.15], [120, 0.12],
];

const curve = points.map(([h, v], i) => `${i ? "L" : "M"}${X(h).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");

/** Illustrative timing of post-exertional malaise (onset window per US CDC guidance). */
export function PemChart() {
  return (
    <svg viewBox="0 0 720 300" className={styles.chart} role="img" aria-labelledby="pem-title">
      <title id="pem-title">
        Illustration: after an activity, symptoms begin to rise around 12 hours later, peak within about two days, and ease over several more days
      </title>
      <rect x={X(12)} y="40" width={X(48) - X(12)} height="210" className={styles.window} />
      {[0, 24, 48, 72, 96, 120].map((h) => (
        <g key={h}>
          <line x1={X(h)} y1="250" x2={X(h)} y2="256" className={styles.axis} />
          <text x={X(h)} y="274" textAnchor="middle" className={styles.label}>{h === 0 ? "0 h" : `${h / 24} d`}</text>
        </g>
      ))}
      <line x1="60" y1="250" x2="700" y2="250" className={styles.axis} />
      <rect x={X(0) - 4} y="170" width="14" height="80" rx="3" className={styles.activity} />
      <text x={X(0) - 4} y="158" className={styles.strong}>Activity</text>
      <text x={X(12) + 8} y="236" className={styles.label}>Typical onset window, 12–48 h</text>
      <path d={curve} className={styles.curve} pathLength={1} />
      <circle cx={X(38)} cy={Y(0.85)} r="4" className={styles.peak} />
      <text x={X(38) + 12} y={Y(0.85) - 8} className={styles.strong}>Symptoms peak</text>
    </svg>
  );
}
