import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { getAllPosts } from "@/lib/posts";
import { formatDate, seededRandom } from "@/lib/format";
import s from "./specimen.module.css";

export const metadata: Metadata = { title: "Specimen · Design lab" };

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--sp-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--sp-mono" });

function symptomPath() {
  const rand = seededRandom("reported-symptoms");
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const x = 40 + i * 19.6;
    const y = 70 + Math.sin(i / 3.1) * 34 + (rand() - 0.5) * 60;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function Specimen() {
  const posts = getAllPosts();
  const updated = posts[0] ? formatDate(posts[0].date, { day: "2-digit", month: "short", year: "numeric" }) : "";

  return (
    <div className={`${s.page} ${archivo.variable} ${mono.variable}`}>
      <div className={s.grid} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>

      <div className={s.wrap}>
        <header className={s.topbar}>
          <span>Medically Explained — Index of the unexplained</span>
          <span>Vol. 01 / {String(posts.length).padStart(3, "0")} entries / Updated {updated}</span>
        </header>

        <h1 className={s.masthead}>
          <span>Medically</span>
          <span>Explained<i>.</i></span>
        </h1>

        <section className={s.intro}>
          <div className={s.statement}>
            <h2>Normal results.<br />Real symptoms.</h2>
            <p>
              We document what research currently tells us about medically unexplained conditions:
              illnesses with real, often disabling symptoms but no single clear cause that standard
              tests can find.
            </p>
          </div>
          <aside className={s.abstract}>
            <h3>Abstract</h3>
            <p>
              Each entry summarises the evidence on one condition or question, states its
              uncertainty plainly, and cites its sources. Nothing here is medical advice.
            </p>
            <dl>
              <dt>Method</dt><dd>Evidence review</dd>
              <dt>Register</dt><dd>Plain English</dd>
              <dt>Status</dt><dd>Drafting</dd>
            </dl>
          </aside>
        </section>

        <figure className={s.figure}>
          <svg viewBox="0 0 1000 220" role="img" aria-labelledby="fig1">
            <title id="fig1">Schematic: test results stay within the normal range while symptoms fluctuate</title>
            <defs>
              <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" className={s.hatch} />
              </pattern>
            </defs>
            <rect x="40" y="150" width="940" height="44" fill="url(#hatch)" />
            <text x="48" y="186" className={s.svgLabel}>Normal range</text>
            <path d="M40 172 H980" className={s.flat} />
            <text x="980" y="164" textAnchor="end" className={s.svgLabel}>Standard test results</text>
            <path d={symptomPath()} className={s.jagged} />
            <text x="980" y="22" textAnchor="end" className={`${s.svgLabel} ${s.svgSignal}`}>Reported symptoms</text>
            <path d="M40 10 V200 H990" className={s.axis} />
            <text x="990" y="216" textAnchor="end" className={s.svgLabel}>Time →</text>
          </svg>
          <figcaption>
            <b>Fig. 01</b> Schematic illustration, not real data. Many people have results
            within the normal range while their symptoms fluctuate.
          </figcaption>
        </figure>

        <section aria-labelledby="index">
          <h2 id="index" className={s.indexTitle}>Index</h2>
          <div className={s.table} role="table">
            <div className={`${s.row} ${s.head}`} role="row">
              <span role="columnheader">No.</span>
              <span role="columnheader">Topic</span>
              <span role="columnheader">Entry</span>
              <span role="columnheader">Date</span>
              <span role="columnheader">Read</span>
            </div>
            {posts.map((post, i) => (
              <div className={s.row} role="row" key={post.slug}>
                <span role="cell" className={s.no}>{String(i + 1).padStart(3, "0")}</span>
                <span role="cell" className={s.topic}>{post.topic}</span>
                <span role="cell" className={s.entry}>
                  <strong>{post.title}</strong>
                  <em>{post.summary}</em>
                </span>
                <span role="cell" className={s.mono}>{formatDate(post.date, { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
                <span role="cell" className={s.mono}>{post.readingTime} min</span>
              </div>
            ))}
          </div>
        </section>

        <footer className={s.footer}>
          <p>This is general information, not a substitute for advice from your GP or pharmacist.</p>
          <p className={s.end}>End of index</p>
        </footer>
      </div>
    </div>
  );
}
