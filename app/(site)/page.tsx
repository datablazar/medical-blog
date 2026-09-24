import Link from "next/link";
import { EvidenceLadder } from "@/components/figures/EvidenceLadder";
import { formatDate } from "@/lib/format";
import { countFigures, getPost, getPublishedPosts, getSections } from "@/lib/posts";
import { story } from "@/lib/site-content";
import s from "./home.module.css";

export default function Home() {
  // The lead feature is the newest published explainer.
  const latest = getPublishedPosts()[0];
  const post = latest ? getPost(latest.slug) : undefined;
  const href = post ? `/articles/${post.slug}` : "/articles";
  const sections = post ? getSections(post.content) : [];

  return (
    <>
      <section className={`container ${s.hero}`}>
        <div>
          <p className="label"><span>§ 00</span> Independent science writing</p>
          <h1 className={s.title}>The science of the illnesses medicine <em>struggles to explain</em>.</h1>
          <p className={s.lede}>
            Rigorous, readable explainers on ME/CFS, long COVID, hypermobile EDS and related
            conditions. Written for patients, the curious and clinicians alike, with every claim
            sourced and every uncertainty stated plainly.
          </p>
          <div className={s.actions}>
            <Link href={href} className={s.primary}>Read the first explainer</Link>
            <a href="#story" className={s.secondary}>Why I write this</a>
          </div>
        </div>
        <Link href={href} className={s.heroArt} aria-label="The evidence ladder, from the first explainer">
          <span className={`${s.cross} ${s.tl}`} aria-hidden="true" />
          <span className={`${s.cross} ${s.br}`} aria-hidden="true" />
          <EvidenceLadder />
          <span className={s.heroCaption}>
            <b>Fig. 1</b> The ladder of evidence, from the first explainer
          </span>
        </Link>
      </section>

      <div className="container" aria-hidden="true">
        <div className={s.ruler} />
      </div>

      {post && (
        <section className={`container ${s.feature}`} aria-labelledby="feature-title">
          <p className="label"><span>§ 01</span> Start here</p>
          <article className={s.card}>
            <div className={s.cardMain}>
              <p className={s.topic}>Explainer · {post.topic}</p>
              <h2 id="feature-title" className={s.cardTitle}>
                <Link href={href}>{post.title}</Link>
              </h2>
              <p className={s.summary}>{post.summary}</p>
              <dl className={s.facts}>
                <div><dt>Reading time</dt><dd>{post.readingTime} min</dd></div>
                <div><dt>Sources</dt><dd>{post.references.length} references</dd></div>
                <div><dt>Figures</dt><dd>{countFigures(post.content)}</dd></div>
                <div><dt>Published</dt><dd>{formatDate(post.date)}</dd></div>
              </dl>
              <Link href={href} className={s.primary}>Read the explainer</Link>
            </div>
            <div className={s.cardSide}>
              <p className={s.sideTitle}>Inside this explainer</p>
              <ol className={s.sections}>
                <li><span>00</span>From the author</li>
                {sections.map((h, i) => (
                  <li key={h}><span>{String(i + 1).padStart(2, "0")}</span>{h}</li>
                ))}
              </ol>
            </div>
          </article>
        </section>
      )}

      <section id="story" className={`container rule-top ${s.story}`} aria-labelledby="story-label">
        <p id="story-label" className="label"><span>§ 02</span> Why this exists</p>
        <blockquote className={s.quote}>&ldquo;{story.quote}&rdquo;</blockquote>
        <div className={s.storyBody}>
          {story.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <p className={s.signoff}>Former medical student · Writer and researcher</p>
          <Link href="/about" className={s.textLink}>Read my full story →</Link>
        </div>
      </section>
    </>
  );
}
