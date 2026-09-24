import s from "./concepts.module.css";

/**
 * Concept B: a two-axis map. Across: distance from the laboratory to the
 * population (translational stages T0–T4). Up: protection against bias
 * (the evidence hierarchy). Each study type is a region; the everyday terms
 * are outlines laid over the same space. Positions are schematic.
 */

const L = 150; // plot left
const R = 950; // plot right
const T = 60; // plot top
const B = 540; // plot bottom
const step = (R - L) / 5;
const xAt = (t: number) => L + step * t + step / 2; // centre of stage t

function Region({ x, y, w, h, label, sub, strong }: { x: number; y: number; w: number; h: number; label: string; sub?: string; strong?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2 > 22 ? 22 : h / 2} className={strong ? s.inkFill : s.white} stroke="var(--line-strong)" strokeWidth={strong ? 0 : 1.5} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 5} textAnchor="middle" className={`${s.t15} ${s.bold} ${strong ? s.onInk : s.ink}`}>{label}</text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 16} textAnchor="middle" className={`${s.t14} ${s.mono} ${strong ? s.onInk : s.muted}`}>{sub}</text>
      )}
    </g>
  );
}

export function EvidenceMap() {
  return (
    <svg viewBox="0 0 1000 640" className={s.svg} role="img" aria-labelledby="em-title">
      <title id="em-title">
        Map with translational stage across and protection against bias upwards. Laboratory work and mechanism-based
        reasoning sit bottom left; case series low; observational studies in the middle towards practice; randomised
        trials and systematic reviews high in the efficacy stage.
      </title>

      {/* Basic science band */}
      <rect x={L} y={T} width={step} height={B - T} className={s.surface} />
      <text x={xAt(0)} y={T + 24} textAnchor="middle" className={`${s.t15} ${s.bold} ${s.muted}`}>Basic science</text>

      {/* Axes */}
      <line x1={L} y1={B} x2={R} y2={B} className={`${s.inkStroke} ${s.w15}`} />
      <line x1={L} y1={B} x2={L} y2={T} className={`${s.inkStroke} ${s.w15}`} />
      <path d={`M${L - 6} ${T + 10} L${L} ${T} L${L + 6} ${T + 10}`} className={`${s.inkStroke} ${s.w15}`} />
      {["T0", "T1", "T2", "T3", "T4"].map((t, i) => (
        <g key={t}>
          <line x1={xAt(i)} y1={B} x2={xAt(i)} y2={B + 6} className={`${s.inkStroke} ${s.w15}`} />
          <text x={xAt(i)} y={B + 26} textAnchor="middle" className={`${s.t15} ${s.mono} ${s.coralText}`}>{t}</text>
        </g>
      ))}
      <text x={(L + R) / 2} y={B + 56} textAnchor="middle" className={`${s.t15} ${s.ink}`}>
        From laboratory to patient to population →
      </text>
      <text transform={`translate(${L - 30} ${(T + B) / 2}) rotate(-90)`} textAnchor="middle" className={`${s.t15} ${s.ink}`}>
        Protection against bias →
      </text>

      {/* Clinical evidence: everything in humans */}
      <rect x={xAt(1) - step / 2 + 6} y={T + 12} width={step * 4 - 12} height={B - T - 24} rx="22" className={`${s.inkStroke} ${s.w2} ${s.dashed}`} />
      <text x={R - 24} y={B - 26} textAnchor="end" className={`${s.t15} ${s.bold} ${s.ink}`}>Clinical evidence</text>

      {/* Theoretical medicine: reasoning from mechanism */}
      <rect x={L + 8} y={400} width={step * 2 - 16} height={126} rx="22" className={`${s.coralStroke} ${s.w2} ${s.dashed}`} />
      <text x={L + step * 2 + 4} y={500} className={`${s.t15} ${s.bold} ${s.coralText}`}>Theoretical</text>
      <text x={L + step * 2 + 4} y={518} className={`${s.t15} ${s.bold} ${s.coralText}`}>medicine</text>

      {/* Study types */}
      <Region x={xAt(2) - 130} y={82} w={330} h={50} label="Systematic reviews" sub="Oxford level 1" strong />
      <Region x={xAt(2) - 130} y={150} w={330} h={50} label="Randomised trials" sub="Oxford level 2 · gold standard" strong />
      <Region x={xAt(3) - 80} y={262} w={286} h={50} label="Cohort and case–control" sub="Oxford levels 3–4 · real-world" />
      <Region x={xAt(1) - 60} y={330} w={132} h={50} label="Case series" sub="Oxford level 4" />
      <Region x={xAt(0) - 64} y={414} w={128} h={50} label="Lab & animal" sub="Feeds level 5" />
      <Region x={xAt(0) - 64} y={470} w={step * 2 - 40} h={44} label="Mechanism-based reasoning" />

      {/* GRADE: quality moves a study up or down */}
      <line x1={880} y1={84} x2={880} y2={140} className={`${s.inkStroke} ${s.w15}`} />
      <path d="M874 92 L880 82 L886 92" className={`${s.inkStroke} ${s.w15}`} />
      <path d="M874 132 L880 142 L886 132" className={`${s.inkStroke} ${s.w15}`} />
      <text x={880} y={164} textAnchor="middle" className={`${s.t14} ${s.ink}`}>GRADE can</text>
      <text x={880} y={182} textAnchor="middle" className={`${s.t14} ${s.ink}`}>move any study</text>

      {/* Translational medicine: the path an idea takes */}
      <path d={`M${xAt(0) + 66} 436 C 440 436, 560 400, 580 212`} className={`${s.coralStroke} ${s.w25}`} />
      <path d="M572 222 L580 208 L588 222" className={`${s.coralStroke} ${s.w25}`} />
      <path d="M760 204 L760 254" className={`${s.coralStroke} ${s.w25}`} />
      <path d="M752 244 L760 258 L768 244" className={`${s.coralStroke} ${s.w25}`} />
      <text x={600} y={330} className={`${s.t15} ${s.bold} ${s.coralText}`}>Translational medicine:</text>
      <text x={600} y={348} className={`${s.t15} ${s.coralText}`}>an idea climbs, then spreads</text>

      <text x={L} y={626} className={`${s.t14} ${s.muted}`}>
        Schematic: positions show typical relationships, not measured values.
      </text>
    </svg>
  );
}
