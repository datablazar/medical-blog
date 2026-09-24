import type { Metadata } from "next";
import { Callout } from "@/components/Callout";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="container">
      <div className="measure">
        <p className="t-kicker kicker-accent">About</p>
        <h1 className="t-h1" style={{ marginTop: "var(--space-2)" }}>
          Why we write Medically Explained
        </h1>

        <div className="stack section">
          <p>
            Many people live with symptoms that doctors struggle to explain. Conditions such as
            myalgic encephalomyelitis (ME/CFS), fibromyalgia and long COVID are real and can be
            disabling, yet the science behind them is still developing and is often hard to follow.
          </p>
          <p>
            We read the research so you can understand it. Our aim is to explain what is known,
            what is not yet known, and how scientists are trying to find out.
          </p>
        </div>

        <h2 className="t-h2 section">How we write</h2>
        <ul className="stack">
          <li>We base each article on published research and link to our sources.</li>
          <li>We explain medical terms the first time we use them.</li>
          <li>
            We say plainly when evidence is limited or disputed, using phrases such as
            &ldquo;research suggests&rdquo; rather than overstating findings.
          </li>
          <li>We do not recommend treatments or make promises about recovery.</li>
        </ul>

        <div className="section">
          <Callout variant="good-to-know" title="This is not medical advice">
            <p>
              This is general information, not a substitute for advice from your GP or pharmacist.
            </p>
          </Callout>
        </div>
      </div>
    </div>
  );
}
