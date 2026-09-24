import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { Torch } from "@/components/lab/Torch";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import s from "./ultraviolet.module.css";

export const metadata: Metadata = { title: "Ultraviolet · Design lab" };

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--uv-display" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--uv-mono" });

const hidden = [
  "fatigue", "pain", "brain fog", "dizziness", "unrefreshing sleep", "light sensitivity",
  "breathlessness", "palpitations", "headache", "muscle weakness", "noise sensitivity",
  "joint pain", "nausea", "memory lapses", "crashes after exertion", "tingling",
];

export default function Ultraviolet() {
  const posts = getAllPosts();
  const words = Array.from({ length: 5 }, () => hidden).flat();

  return (
    <div className={`${s.page} ${display.variable} ${mono.variable}`}>
      <header className={s.top}>
        <span className={s.logo}>Medically<br />Explained</span>
        <nav className={s.nav}><a href="#articles">Articles</a><a href="/about">About</a></nav>
      </header>

      <Torch className={s.hero}>
        <p className={s.words} aria-hidden="true">
          {words.map((w, i) => <span key={i}>{w}</span>)}
        </p>
        <div className={s.heroText}>
          <p className={s.kicker}>Invisible illness</p>
          <h1 className={s.title}>
            Some things only show under the <mark>right light</mark>.
          </h1>
          <p className={s.lede}>
            Blood tests, scans and X-rays can come back clear while symptoms stay very real. We
            explain what science can and can&rsquo;t yet see in medically unexplained conditions.
          </p>
          <p className={s.hint}>Move your cursor over the dark to use the torch.</p>
        </div>
      </Torch>

      <section id="articles" className={s.articles} aria-labelledby="latest">
        <h2 id="latest" className={s.sectionTitle}>
          <span>Latest</span> articles
        </h2>
        <div className={s.cards}>
          {posts.map((post, i) => (
            <article key={post.slug} className={s.card}>
              <span className={s.index}>{String(i + 1).padStart(2, "0")}</span>
              <p className={s.topic}>{post.topic}</p>
              <h3 className={s.cardTitle}>{post.title}</h3>
              <p className={s.summary}>{post.summary}</p>
              <p className={s.meta}>{formatDate(post.date)} · {post.readingTime} min</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={s.footer}>
        <p>This is general information, not a substitute for advice from your GP or pharmacist.</p>
      </footer>
    </div>
  );
}
