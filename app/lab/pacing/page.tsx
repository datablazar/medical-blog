import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Fraunces } from "next/font/google";
import { LowEnergyToggle } from "@/components/lab/LowEnergyToggle";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import s from "./pacing.module.css";

export const metadata: Metadata = { title: "Pacing · Design lab" };

const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"], variable: "--pc-display" });
const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--pc-body" });

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

export default function Pacing() {
  const posts = getAllPosts();

  return (
    <LowEnergyToggle className={`${s.page} ${fraunces.variable} ${atkinson.variable}`} buttonClassName={s.toggle}>
      <header className={s.top}>
        <span className={s.logo}>Medically Explained</span>
      </header>

      <section className={s.hero}>
        <div className={s.heroText}>
          <p className={s.kicker}>Read at your own pace</p>
          <h1 className={s.title}>
            Science explained <em>gently</em>, for bodies that need rest.
          </h1>
          <p className={s.lede}>
            Many of our readers live with fatigue or brain fog. So every article tells you up front
            how much energy it takes, starts with a short summary, and is safe to stop halfway.
          </p>
        </div>

        <div className={s.art} aria-hidden="true">
          <span className={s.sun} />
          <span className={`${s.pill} ${s.p1}`} />
          <span className={`${s.pill} ${s.p2}`} />
          <span className={`${s.pill} ${s.p3}`} />
          <span className={s.hill} />
        </div>
      </section>

      <section className={s.legend} aria-label="How to read the energy scale">
        <Energy minutes={2} />
        <p>
          <strong>Energy cost.</strong> One pill is a short, light read. Five pills is a long,
          detailed one. Save the heavier ones for a good day.
        </p>
      </section>

      <section className={s.list} aria-labelledby="latest">
        <h2 id="latest" className={s.sectionTitle}>This week&rsquo;s reading</h2>
        {posts.map((post) => (
          <article key={post.slug} className={s.card}>
            <div className={s.cardHead}>
              <p className={s.topic}>{post.topic}</p>
              <Energy minutes={post.readingTime} />
            </div>
            <h3 className={s.cardTitle}>{post.title}</h3>
            <p className={s.summary}>
              <span className={s.summaryLabel}>The short version</span>
              {post.summary}
            </p>
            <p className={s.meta}>
              {formatDate(post.date)} · {post.readingTime} minutes · You can stop at any heading
            </p>
          </article>
        ))}
      </section>

      <footer className={s.footer}>
        <p>This is general information, not a substitute for advice from your GP or pharmacist.</p>
        <p className={s.rest}>Take a rest. We&rsquo;ll be here.</p>
      </footer>
    </LowEnergyToggle>
  );
}
