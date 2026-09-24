import type { Metadata } from "next";
import { disclaimer, story } from "@/lib/site-content";
import s from "./about.module.css";

export const metadata: Metadata = { title: "My story" };

const principles = [
  { term: "Sourced", text: "Every factual claim links to its evidence, and I prefer systematic reviews and large studies to single small ones." },
  { term: "Plain", text: "I explain every medical term the first time I use it, so nobody needs a medical degree to follow along." },
  { term: "Honest", text: "I say clearly what research shows, what it only suggests, and what nobody knows yet, and I use the best evidence available rather than waiting for perfect evidence." },
  { term: "Careful", text: "I don't recommend treatments or promise recovery. Diagrams that aren't real data say so." },
];

export default function About() {
  return (
    <>
      <section className={`container ${s.intro}`}>
        <p className="label"><span>§ 01</span> My story</p>
        <h1 className={s.title}>From medical student to patient, <em>and back to the science</em>.</h1>
      </section>

      <section className={`container rule-top ${s.story}`} aria-label="My story">
        <blockquote className={s.quote}>&ldquo;{story.quote}&rdquo;</blockquote>
        <div className={s.body}>
          {story.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </section>

      <section className={`container ${s.how}`} aria-labelledby="how-title">
        <p className="label"><span>§ 02</span> How I write</p>
        <h2 id="how-title" className={s.h2}>Four rules for every article</h2>
        <dl className={s.rules}>
          {principles.map((p, i) => (
            <div key={p.term} className={s.rule}>
              <dt>
                <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                {p.term}
              </dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`container ${s.notice}`} aria-labelledby="notice-title">
        <div className={s.noticeCard}>
          <p className="label"><span>§ 03</span> Please note</p>
          <h2 id="notice-title" className={s.noticeTitle}>This is not medical advice</h2>
          <p>{disclaimer} If your symptoms change suddenly or you feel very unwell, contact NHS 111, or 999 in an emergency.</p>
        </div>
      </section>
    </>
  );
}
