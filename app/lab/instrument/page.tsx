import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { articleCount, conditions, countLabel, disclaimer, story } from "@/lib/site-content";
import s from "./instrument.module.css";

export const metadata: Metadata = { title: "Instrument · Design lab" };

const geist = Geist({ subsets: ["latin"], variable: "--in-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--in-mono" });

function Dial() {
  const cx = 260, cy = 260;
  const ticks = Array.from({ length: 120 }, (_, i) => {
    const a = (i / 120) * Math.PI * 2;
    const long = i % 10 === 0;
    const r1 = 238, r2 = long ? 222 : 230;
    return { x1: cx + Math.cos(a) * r1, y1: cy + Math.sin(a) * r1, x2: cx + Math.cos(a) * r2, y2: cy + Math.sin(a) * r2, long };
  });
  const seg = (Math.PI * 2) / conditions.length;
  const arc = (i: number, r: number) => {
    const a0 = -Math.PI / 2 + i * seg + 0.06, a1 = a0 + seg - 0.12;
    return `M${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r}`;
  };
  return (
    <svg viewBox="0 0 520 520" className={s.dial} role="img" aria-label="A dial divided into six conditions covered by the site">
      <g className={s.tickRing}>
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={t.long ? s.tickLong : s.tick} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="196" className={s.ring} />
      <circle cx={cx} cy={cy} r="120" className={s.ring} strokeDasharray="2 6" />
      {conditions.map((c, i) => {
        const mid = -Math.PI / 2 + (i + 0.5) * seg;
        return (
          <g key={c.slug}>
            <path d={arc(i, 172)} className={i === 0 ? s.arcActive : s.arc} />
            <text x={cx + Math.cos(mid) * 146} y={cy + Math.sin(mid) * 146 + 4} textAnchor="middle" className={s.dialLabel}>
              {c.name}
            </text>
          </g>
        );
      })}
      <line x1={cx} y1={cy} x2={cx} y2={cy - 110} className={s.needle} />
      <circle cx={cx} cy={cy} r="5" className={s.hub} />
      <text x={cx} y={cy + 40} textAnchor="middle" className={s.dialCaption}>6 conditions</text>
      <text x={cx} y={cy + 58} textAnchor="middle" className={s.dialCaption}>1 question: why?</text>
    </svg>
  );
}

function PemChart() {
  // x: 0–120 hours mapped to 60–700; y: severity mapped to 250 (low) – 50 (high).
  const X = (h: number) => 60 + (h / 120) * 640;
  const pts: [number, number][] = [[0, 0.1], [6, 0.1], [12, 0.18], [20, 0.45], [30, 0.78], [38, 0.85], [48, 0.74], [64, 0.5], [84, 0.28], [104, 0.15], [120, 0.12]];
  const Y = (v: number) => 250 - v * 200;
  const d = pts.map(([h, v], i) => `${i ? "L" : "M"}${X(h).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 720 300" className={s.chart} role="img" aria-labelledby="pem-t">
      <title id="pem-t">Illustration: after an activity, symptoms begin to rise around 12 hours later, peak within about two days, and ease over several more days</title>
      <rect x={X(12)} y="40" width={X(48) - X(12)} height="210" className={s.window} />
      <text x={X(12) + 8} y="236" className={s.chartLabel}>Typical onset window, 12–48 h</text>
      {[0, 24, 48, 72, 96, 120].map((h) => (
        <g key={h}>
          <line x1={X(h)} y1="250" x2={X(h)} y2="256" className={s.axis} />
          <text x={X(h)} y="274" textAnchor="middle" className={s.chartLabel}>{h === 0 ? "0 h" : `${h / 24} d`}</text>
        </g>
      ))}
      <line x1="60" y1="250" x2="700" y2="250" className={s.axis} />
      <rect x={X(0) - 4} y="170" width="14" height="80" rx="3" className={s.activity} />
      <text x={X(0) + 18} y="186" className={s.chartLabelStrong}>Activity</text>
      <path d={d} className={s.curve} pathLength={1} />
      <circle cx={X(38)} cy={Y(0.85)} r="4" className={s.peak} />
      <text x={X(38) + 12} y={Y(0.85) - 8} className={s.chartLabelStrong}>Symptoms peak</text>
    </svg>
  );
}

export default function Instrument() {
  const posts = getAllPosts();

  return (
    <div className={`${s.page} ${geist.variable} ${mono.variable}`}>
      <header className={s.header}>
        <span className={s.logo}><span className={s.logoMark} aria-hidden="true" />Medically Explained</span>
        <nav className={s.nav} aria-label="Main">
          <a href="#conditions">Conditions</a>
          <a href="#explainer">Explainers</a>
          <a href="#story">My story</a>
          <a href="#latest" className={s.navCta}>Latest articles</a>
        </nav>
      </header>

      <section className={s.hero}>
        <div className={s.heroText}>
          <p className={s.eyebrow}><span>§ 00</span> Independent science writing</p>
          <h1 className={s.title}>The science of the illnesses medicine <em>struggles to explain</em>.</h1>
          <p className={s.lede}>
            Rigorous, readable explainers on ME/CFS, long COVID, fibromyalgia and related
            conditions. Written for patients, the curious and clinicians alike, with every claim
            sourced and every uncertainty stated plainly.
          </p>
          <div className={s.actions}>
            <a href="#explainer" className={s.primary}>Read the featured explainer</a>
            <a href="#conditions" className={s.secondary}>Browse conditions</a>
          </div>
        </div>
        <div className={s.heroArt}>
          <span className={`${s.cross} ${s.tl}`} aria-hidden="true" />
          <span className={`${s.cross} ${s.br}`} aria-hidden="true" />
          <Dial />
        </div>
      </section>

      <div className={s.ruler} aria-hidden="true" />

      <section id="story" className={s.story}>
        <p className={s.sectionLabel}><span>§ 01</span> Why this exists</p>
        <blockquote className={s.quote}>&ldquo;{story.quote}&rdquo;</blockquote>
        <div className={s.storyBody}>
          {story.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          <p className={s.signoff}>Former medical student · Writer and researcher</p>
        </div>
      </section>

      <section id="explainer" className={s.featured}>
        <div className={s.featuredHead}>
          <p className={s.sectionLabel}><span>§ 02</span> Featured explainer</p>
          <span className={s.badge}>ME/CFS · Draft</span>
        </div>
        <div className={s.featuredGrid}>
          <div>
            <h2 className={s.h2}>Why a good day can cause a bad week</h2>
            <p className={s.body}>
              Post-exertional malaise is the worsening of symptoms after physical, mental or
              emotional effort. What makes it distinctive is the delay: the crash often arrives
              a day or two later, which makes cause and effect easy to miss.
            </p>
            <dl className={s.facts}>
              <div><dt>Onset</dt><dd>Usually 12–48 hours after</dd></div>
              <div><dt>Duration</dt><dd>Days, sometimes weeks</dd></div>
              <div><dt>Source</dt><dd>US CDC, ME/CFS guidance</dd></div>
            </dl>
          </div>
          <figure className={s.figure}>
            <PemChart />
            <figcaption><b>Fig. 1</b> Illustrative, not patient data. Timing and severity vary from person to person.</figcaption>
          </figure>
        </div>
      </section>

      <section id="conditions" className={s.explorer}>
        <div className={s.explorerHead}>
          <p className={s.sectionLabel}><span>§ 03</span> Condition explorer</p>
          <h2 className={s.h2}>Start with a condition</h2>
        </div>
        <div className={s.bento}>
          {conditions.map((c, i) => {
            const n = articleCount(c);
            return (
              <a key={c.slug} href="#" className={`${s.tile} ${i === 0 ? s.tileWide : ""} ${i === conditions.length - 1 ? s.tileHalf : ""}`}>
                <span className={s.tileIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.tileName}>{c.name}</span>
                <span className={s.tileFull}>{c.full}</span>
                <span className={s.tileSummary}>{c.summary}</span>
                <span className={s.tileFoot}>
                  <span className={s.systems}>{c.systems.map((x) => <span key={x}>{x}</span>)}</span>
                  <span className={n ? s.count : s.soon}>{countLabel(n)} →</span>
                </span>
              </a>
            );
          })}
          <a href="#latest" className={`${s.tile} ${s.tileBasics}`}>
            <span className={s.tileIndex}>Not sure where to start?</span>
            <span className={s.tileName}>Begin with the basics</span>
            <span className={s.tileSummary}>What &ldquo;medically unexplained&rdquo; really means, and why it never means imagined.</span>
            <span className={s.tileFoot}><span className={s.count}>Read the introduction →</span></span>
          </a>
        </div>
      </section>

      <section id="latest" className={s.latest}>
        <p className={s.sectionLabel}><span>§ 04</span> Latest</p>
        <ul className={s.rows}>
          {posts.map((p) => (
            <li key={p.slug} className={s.row}>
              <span className={s.rowDate}>{formatDate(p.date, { day: "2-digit", month: "short", year: "numeric" })}</span>
              <span className={s.rowTitle}>{p.title}</span>
              <span className={s.rowTopic}>{p.topic}</span>
              <span className={s.rowTime}>{p.readingTime} min</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className={s.footer}>
        <span className={s.logo}><span className={s.logoMark} aria-hidden="true" />Medically Explained</span>
        <p>{disclaimer}</p>
      </footer>
    </div>
  );
}
