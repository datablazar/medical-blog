import { seededRandom } from "@/lib/format";

type Seg = { x1: number; y1: number; x2: number; y2: number; w: number };

function grow() {
  const rand = seededRandom("atlas-plate-i");
  const segs: Seg[] = [];
  const nodes: { x: number; y: number; r: number }[] = [];

  function branch(x: number, y: number, angle: number, len: number, w: number, depth: number) {
    // Draw each branch as a few jittered steps so it reads as hand-engraved.
    let cx = x, cy = y, a = angle;
    const steps = 4;
    for (let i = 0; i < steps; i++) {
      a += (rand() - 0.5) * 0.35;
      const nx = cx + Math.cos(a) * (len / steps);
      const ny = cy + Math.sin(a) * (len / steps);
      segs.push({ x1: cx, y1: cy, x2: nx, y2: ny, w: w * (1 - i * 0.08) });
      cx = nx; cy = ny;
    }
    if (depth <= 0) return;
    if (depth === 3 || depth === 5) nodes.push({ x: cx, y: cy, r: w * 1.8 + 2 });
    const spread = 0.35 + rand() * 0.35;
    branch(cx, cy, a - spread, len * (0.68 + rand() * 0.12), w * 0.66, depth - 1);
    branch(cx, cy, a + spread, len * (0.68 + rand() * 0.12), w * 0.66, depth - 1);
    if (rand() > 0.72) branch(cx, cy, a + (rand() - 0.5) * 0.3, len * 0.5, w * 0.5, depth - 2);
  }

  branch(240, 590, -Math.PI / 2, 120, 9, 7);
  return { segs, nodes };
}

export function NervePlate({ className }: { className?: string }) {
  const { segs, nodes } = grow();

  return (
    <svg viewBox="0 0 480 620" className={className} role="img" aria-labelledby="plate-title">
      <title id="plate-title">An engraved illustration of branching nerve fibres, with three lettered labels</title>
      <defs>
        <pattern id="atlas-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <ellipse cx="240" cy="600" rx="120" ry="14" fill="url(#atlas-hatch)" opacity="0.6" />
      <g stroke="currentColor" strokeLinecap="round" fill="none">
        {segs.map((sg, i) => (
          <line key={i} x1={sg.x1} y1={sg.y1} x2={sg.x2} y2={sg.y2} strokeWidth={Math.max(0.5, sg.w)} />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#atlas-hatch)" stroke="currentColor" strokeWidth="0.8" />
          </g>
        ))}
      </g>
      <g className="callouts" fontFamily="var(--at-display), serif" fontSize="22" fontStyle="italic" fill="currentColor">
        {[
          { l: "A", x: 240, y: 520, tx: 400, ty: 540 },
          { l: "B", x: nodes[0]?.x ?? 200, y: nodes[0]?.y ?? 300, tx: 40, ty: 330 },
          { l: "C", x: nodes[nodes.length - 1]?.x ?? 300, y: nodes[nodes.length - 1]?.y ?? 120, tx: 440, ty: 90 },
        ].map((c) => (
          <g key={c.l}>
            <line x1={c.x} y1={c.y} x2={c.tx} y2={c.ty} stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <circle cx={c.tx} cy={c.ty} r="14" fill="var(--at-paper)" stroke="currentColor" strokeWidth="0.8" />
            <text x={c.tx} y={c.ty + 7} textAnchor="middle">{c.l}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
