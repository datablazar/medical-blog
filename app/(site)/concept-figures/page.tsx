import type { Metadata } from "next";
import { CorrespondenceGrid } from "@/components/figures/concepts/CorrespondenceGrid";
import { EvidenceMap } from "@/components/figures/concepts/EvidenceMap";
import { EvidenceSets } from "@/components/figures/concepts/EvidenceSets";
import { TermTranslator } from "@/components/figures/concepts/TermTranslator";

export const metadata: Metadata = { title: "Concept figures (preview)", robots: { index: false } };

const figs = [
  { id: "grid", title: "A. Correspondence grid", el: <CorrespondenceGrid /> },
  { id: "map", title: "B. Two-axis map", el: <EvidenceMap /> },
  { id: "sets", title: "C. Evidence sets", el: <EvidenceSets /> },
  { id: "translator", title: "D. Term translator", el: <TermTranslator /> },
];

export default function ConceptFigures() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 96 }}>
      {figs.map((f) => (
        <figure
          key={f.id}
          id={f.id}
          style={{ margin: "0 0 64px", padding: 32, background: "var(--white)", border: "1px solid var(--line)", borderRadius: 16, maxWidth: 1080 }}
        >
          <p className="label" style={{ marginBottom: 20 }}>{f.title}</p>
          {f.el}
        </figure>
      ))}
    </div>
  );
}
