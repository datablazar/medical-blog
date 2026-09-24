import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody, slugify } from "@/components/ArticleBody";
import { formatDate } from "@/lib/format";
import { getPost, getPublishedPosts, getSections } from "@/lib/posts";
import s from "./article.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post || post.draft) notFound();

  // The author's first-person opening is everything before the first section heading.
  const split = post.content.indexOf("\n## ");
  const intro = split === -1 ? "" : post.content.slice(0, split);
  const body = split === -1 ? post.content : post.content.slice(split);
  const toc = getSections(body);

  return (
    <article className={s.article}>
      <header className={`container ${s.header}`}>
        <p className="label"><span>§ Explainer</span> {post.topic}</p>
        <h1 className={s.title}>{post.title}</h1>
        <p className={s.lede}>{post.summary}</p>
        <dl className={s.meta}>
          <div><dt>Published</dt><dd>{formatDate(post.date)}</dd></div>
          <div><dt>Reading time</dt><dd>{post.readingTime} min</dd></div>
          <div><dt>Sources</dt><dd>{post.references.length} references</dd></div>
          <div><dt>Layers</dt><dd>Plain English, then technical</dd></div>
        </dl>
      </header>

      <div className={`container rule-top ${s.layout}`}>
        <aside className={s.rail} aria-label="Contents">
          <p className="label">Contents</p>
          <ol className={s.toc}>
            {toc.map((h, i) => (
              <li key={h}>
                <a href={`#${slugify(h)}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {h}
                </a>
              </li>
            ))}
            <li><a href="#references"><span>{String(toc.length + 1).padStart(2, "0")}</span>References</a></li>
          </ol>
        </aside>

        <div className={s.main}>
          {intro && (
            <section className={s.intro} aria-label="From the author">
              <p className="label"><span>●</span> From the author</p>
              <ArticleBody markdown={intro} className={s.introBody} />
            </section>
          )}

          <ArticleBody markdown={body} />

          <section id="references" className={s.references} aria-labelledby="references-title">
            <h2 id="references-title" className={s.refTitle}>References</h2>
            <ol className={s.refList}>
              {post.references.map((r, i) => (
                <li key={r.text} id={`ref-${i + 1}`}>
                  <span className={s.refNum}>{i + 1}</span>
                  <span>
                    {r.text}{" "}
                    {r.url && (
                      <a href={r.url} className={s.refLink} rel="noopener noreferrer">
                        {r.url.replace(/^https?:\/\/(dx\.)?/, "")}
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <p className={s.back}><Link href="/articles">← All explainers</Link></p>
        </div>
      </div>
    </article>
  );
}
