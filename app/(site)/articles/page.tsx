import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";
import s from "./articles.module.css";

export const metadata: Metadata = {
  title: "Explainers",
  description: "Referenced explainers on the science of ME/CFS, long COVID, hEDS and related conditions.",
};

export default function Articles() {
  const posts = getAllPosts();
  const published = posts.filter((p) => !p.draft);
  const upcoming = posts.filter((p) => p.draft);

  return (
    <>
      <header className={`container ${s.header}`}>
        <p className="label"><span>§ 01</span> Explainers</p>
        <h1 className={s.title}>Every explainer, <em>fully referenced</em>.</h1>
        <p className={s.lede}>
          Each one starts in plain English and ends with a technical section for clinicians and
          researchers, with every claim numbered and linked to its source.
        </p>
      </header>

      <section className={`container rule-top ${s.section}`} aria-labelledby="published">
        <h2 id="published" className="label"><span>{String(published.length).padStart(2, "0")}</span> Published</h2>
        <ul className={s.list}>
          {published.map((p) => (
            <li key={p.slug}>
              <Link href={`/articles/${p.slug}`} className={s.card}>
                <span className={s.topic}>{p.topic}</span>
                <span className={s.cardTitle}>{p.title}</span>
                <span className={s.summary}>{p.summary}</span>
                <span className={s.meta}>
                  {formatDate(p.date)} · {p.readingTime} min read <span className={s.arrow}>Read →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {upcoming.length > 0 && (
        <section className={`container ${s.section}`} aria-labelledby="upcoming">
          <h2 id="upcoming" className="label"><span>{String(upcoming.length).padStart(2, "0")}</span> In preparation</h2>
          <ul className={s.rows}>
            {upcoming.map((p) => (
              <li key={p.slug} className={s.row}>
                <span className={s.rowTitle}>{p.title}</span>
                <span className={s.rowTopic}>{p.topic.replace(/^Draft · /, "")}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
