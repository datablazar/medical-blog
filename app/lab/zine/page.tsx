import type { Metadata } from "next";
import { Anton, Caveat, Courier_Prime } from "next/font/google";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import s from "./zine.module.css";

export const metadata: Metadata = { title: "Case Notes · Design lab" };

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--zn-display" });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--zn-type" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--zn-hand" });

const tilts = [-1.6, 1.2, -0.8, 1.8];

export default function Zine() {
  const posts = getAllPosts();

  return (
    <div className={`${s.page} ${anton.variable} ${courier.variable} ${caveat.variable}`}>
      <header className={s.masthead}>
        <p className={s.issue}>Issue 01 · Free · Please pass it on</p>
        <h1 className={s.logo}>
          <span className={s.pinkLayer} aria-hidden="true">Medically Explained</span>
          <span className={s.blueLayer}>Medically Explained</span>
        </h1>
        <p className={s.strap}>A zine about the science of the conditions tests can&rsquo;t find</p>
      </header>

      <section className={s.hero}>
        <div className={s.blob} aria-hidden="true" />
        <h2 className={s.shout}>
          Normal test results <span className={s.neq}>&ne;</span> nothing wrong
        </h2>
        <p className={s.scribble} aria-hidden="true">
          <svg viewBox="0 0 120 60"><path d="M110 10 C 80 5, 40 20, 20 48 M20 48 l2 -16 M20 48 l15 -6" /></svg>
          start here!
        </p>
        <div className={s.letter}>
          <p>Dear reader,</p>
          <p>
            If you&rsquo;ve been told &ldquo;your bloods are fine&rdquo; while you still feel
            unwell, this zine is for you. We read the research and write it up in plain words:
            what&rsquo;s known, what isn&rsquo;t yet, and how scientists are trying to find out.
          </p>
          <p className={s.sign}>&mdash; the editors</p>
        </div>
      </section>

      <section className={s.notes} aria-labelledby="inside">
        <h2 id="inside" className={s.inside}>
          <span>Inside this issue</span>
        </h2>
        <div className={s.board}>
          {posts.map((post, i) => (
            <article key={post.slug} className={s.note} style={{ rotate: `${tilts[i % tilts.length]}deg` }}>
              <span className={s.tape} aria-hidden="true" />
              <p className={s.pageNo}>p.{String(i * 4 + 3).padStart(2, "0")}</p>
              <p className={s.topic}>{post.topic}</p>
              <h3 className={s.noteTitle}>{post.title}</h3>
              <p className={s.summary}>{post.summary}</p>
              <p className={s.meta}>{formatDate(post.date)} / {post.readingTime} min read</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={s.footer}>
        <p className={s.stamp}>Not medical advice</p>
        <p>This is general information, not a substitute for advice from your GP or pharmacist.</p>
        <p className={s.colophon}>Printed in two inks: fluorescent pink and medium blue.</p>
      </footer>
    </div>
  );
}
