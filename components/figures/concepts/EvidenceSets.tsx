import s from "./concepts.module.css";

/**
 * Concept C: three overlapping sets. Evidence of mechanism, evidence of
 * correlation (difference-making), and studies in humans. The conventional
 * hierarchy ranks mainly correlation-in-humans; EBM+ argues causal claims
 * are strongest where all three meet.
 */

const M = { x: 380, y: 370, r: 200 }; // mechanism
const C = { x: 620, y: 370, r: 200 }; // correlation
const H = { x: 500, y: 200, r: 200 }; // humans

function Lines({ x, y, lines, className }: { x: number; y: number; lines: string[]; className: string }) {
  return (
    <text x={x} y={y - ((lines.length - 1) * 19) / 2} textAnchor="middle" className={className}>
      {lines.map((l, i) => (
        <tspan key={l} x={x} dy={i === 0 ? 0 : 19}>{l}</tspan>
      ))}
    </text>
  );
}

export function EvidenceSets() {
  const item = `${s.t15} ${s.ink}`;
  return (
    <svg viewBox="0 0 1000 660" className={s.svg} role="img" aria-labelledby="es-title">
      <title id="es-title">
        Three overlapping circles: evidence of mechanism, evidence of correlation, and studies in humans. Trials and
        observational studies sit where correlation meets humans, the area the conventional hierarchy ranks. Trials that
        also measure mechanism sit in the centre, where EBM+ says causal claims are strongest.
      </title>
      <defs>
        <clipPath id="es-h"><circle cx={H.x} cy={H.y} r={H.r} /></clipPath>
        <clipPath id="es-c"><circle cx={C.x} cy={C.y} r={C.r} /></clipPath>
      </defs>

      {/* Base circles */}
      <circle cx={M.x} cy={M.y} r={M.r} className={s.white} />
      <circle cx={C.x} cy={C.y} r={C.r} className={s.white} />
      <circle cx={H.x} cy={H.y} r={H.r} className={s.white} />

      {/* Humans ∩ correlation: what the conventional hierarchy ranks */}
      <g clipPath="url(#es-h)">
        <circle cx={C.x} cy={C.y} r={C.r} className={s.surface} />
      </g>
      {/* Centre: all three, the EBM+ target */}
      <g clipPath="url(#es-h)">
        <g clipPath="url(#es-c)">
          <circle cx={M.x} cy={M.y} r={M.r} className={s.tint} />
        </g>
      </g>

      {/* Outlines */}
      <circle cx={M.x} cy={M.y} r={M.r} className={`${s.coralStroke} ${s.w25}`} />
      <circle cx={C.x} cy={C.y} r={C.r} className={`${s.inkStroke} ${s.w25}`} />
      <circle cx={H.x} cy={H.y} r={H.r} className={`${s.lineStrong} ${s.w25}`} stroke="var(--ink-muted)" />

      {/* Set names, outside the circles */}
      <text x={M.x} y={M.y + M.r + 30} textAnchor="middle" className={`${s.t16} ${s.bold} ${s.coralText}`}>Evidence of mechanism</text>
      <text x={C.x} y={C.y + C.r + 30} textAnchor="middle" className={`${s.t16} ${s.bold} ${s.ink}`}>Evidence of correlation</text>
      <text x={H.x} y={H.y - H.r - 12} textAnchor="middle" className={`${s.t16} ${s.bold} ${s.ink}`}>Studies in humans = clinical evidence</text>

      {/* Regions */}
      <Lines x={500} y={92} lines={["Clinical observation", "and case reports"]} className={item} />
      <Lines x={262} y={430} lines={["Cell and animal", "studies; theory"]} className={item} />
      <Lines x={738} y={430} lines={["Animal treatment", "experiments"]} className={item} />
      <Lines x={398} y={262} lines={["Human", "mechanistic", "studies"]} className={item} />
      <Lines x={602} y={262} lines={["Trials and", "observational", "studies"]} className={`${s.t15} ${s.bold} ${s.ink}`} />
      <Lines x={500} y={340} lines={["Trials that", "also measure", "mechanism"]} className={`${s.t15} ${s.bold} ${s.coralText}`} />
      <Lines x={500} y={442} lines={["Animal studies", "of both"]} className={item} />

      {/* Annotations */}
      <line x1={660} y1={250} x2={800} y2={176} className={`${s.inkStroke} ${s.w15}`} />
      <Lines x={872} y={140} lines={["The conventional", "hierarchy ranks", "mostly this area"]} className={`${s.t14} ${s.muted}`} />
      <line x1={558} y1={336} x2={804} y2={318} className={`${s.coralStroke} ${s.w15}`} />
      <Lines x={890} y={318} lines={["EBM+: causal claims", "are strongest where", "all three meet"]} className={`${s.t14} ${s.coralText}`} />

      {/* Translational medicine: moving ideas inwards */}
      <path d="M300 404 L436 350" className={`${s.coralStroke} ${s.w25}`} fill="none" />
      <path d="M422 348 L438 349 L428 361" className={`${s.coralStroke} ${s.w25}`} fill="none" />
      <text x="40" y="640" className={`${s.t15} ${s.coralText}`}>
        <tspan className={s.bold}>Translational medicine</tspan> moves ideas inwards: from the laboratory towards trials in people.
      </text>
    </svg>
  );
}
