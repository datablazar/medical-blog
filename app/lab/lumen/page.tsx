import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { LowEnergyToggle } from "@/components/lab/LowEnergyToggle";
import { Torch } from "@/components/lab/Torch";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import s from "./lumen.module.css";

export const metadata: Metadata = { title: "Lumen · Design lab" };

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--lm-display" });
const body = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--lm-body" });

const hidden = [
  "fatigue", "pain", "brain fog", "dizziness", "unrefreshing sleep", "light sensitivity",
  "breathlessness", "palpitations", "headaches", "muscle weakness", "noise sensitivity",
  "joint pain", "nausea", "memory lapses", "crashes after exertion", "tingling",
];

const principles = [
  { title: "Plain words", text: "We explain every medical term the first time we use it, and prefer everyday language to jargon." },
  { title: "Honest about uncertainty", text: "We say clearly what research shows, what it only suggests, and what nobody knows yet." },
  { title: "Kind to tired minds", text: "Every article shows its energy cost and opens with a short version you can stop after." },
];

function Energy({ minutes }: { minutes: number }) {
  const cost = Math.min(5, Math.max(1, Math.ceil(minutes / 2)));
  return (
    <span className={s.energy} aria-label={`Energy cost ${cost} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < cost ? s.on : undefined} />
      ))}
    </span>
  );
}

export default function Lumen() {
  const posts = getAllPosts();
  const words = Array.from({ length: 14 }, () => hidden).flat();

  return (
    <LowEnergyToggle className={`${s.page} ${display.variable} ${body.variable}`} buttonClassName={s.toggle}>
      <header className={s.header}>
        <span className={s.logo}>Medically Explained</span>
        <nav className={s.nav} aria-label="Main">
          <a href="#articles">Articles</a>
          <a href="#approach">Our approach</a>
          <a href="/about">About</a>
        </nav>
      </header>

      <Torch className={s.hero}>
        <div className={s.lens} aria-hidden="true" />
        <p className={s.words} aria-hidden="true">
          {words.map((w, i) => <span key={i}>{w}</span>)}
        </p>
        <div className={s.heroInner}>
          <p className={s.kicker}>The science of unexplained illness</p>
          <h1 className={s.title}>
            When the tests say <span className={s.mark}>nothing</span>, we look <span className={s.mark}>closer</span>.
          </h1>
          <p className={s.lede}>
            Clear, careful explanations of what research tells us about conditions like ME/CFS,
            long COVID and fibromyalgia. Written in plain words, and honest about what isn&rsquo;t
            known yet.
          </p>
          <div className={s.actions}>
            <a href="#articles" className={s.primary}>Start reading</a>
            <span className={s.hint}>Move your cursor to look closer</span>
          </div>
        </div>
      </Torch>

      <section id="approach" className={s.principles} aria-label="Our approach">
        {principles.map((p, i) => (
          <div key={p.title} className={s.principle}>
            <span className={s.pnum}>0{i + 1}</span>
            <h2 className={s.ptitle}>{p.title}</h2>
            <p>{p.text}</p>
          </div>
        ))}
      </section>

      <section id="articles" className={s.articles} aria-labelledby="latest">
        <div className={s.sectionHead}>
          <h2 id="latest" className={s.sectionTitle}>Latest articles</h2>
          <p className={s.legend}>
            <Energy minutes={2} />
            <span><strong>Energy cost:</strong> one bar is a light read, five is a long one.</span>
          </p>
        </div>

        <div className={s.cards}>
          {posts.map((post) => (
            <article key={post.slug} className={s.card}>
              <div className={s.cardTop}>
                <span className={s.topic}>{post.topic}</span>
                <Energy minutes={post.readingTime} />
              </div>
              <h3 className={s.cardTitle}>{post.title}</h3>
              <div className={s.short}>
                <span>The short version</span>
                <p>{post.summary}</p>
              </div>
              <p className={s.meta}>{formatDate(post.date)} · {post.readingTime} min read</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <span className={s.logo}>Medically Explained</span>
          <p>This is general information, not a substitute for advice from your GP or pharmacist.</p>
        </div>
      </footer>
    </LowEnergyToggle>
  );
}
