import { Dial } from "@/components/Dial";
import { PemChart } from "@/components/PemChart";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";
import { articleCount, conditions, countLabel, story } from "@/lib/site-content";
import s from "./home.module.css";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <section className={`container ${s.hero}`}>
        <div>
          <p className="label"><span>§ 00</span> Independent science writing</p>
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

      <div className="container" aria-hidden="true">
        <div className={s.ruler} />
      </div>

      <section id="story" className={`container ${s.story}`} aria-labelledby="story-label">
        <p id="story-label" className="label"><span>§ 01</span> Why this exists</p>
        <blockquote className={s.quote}>&ldquo;{story.quote}&rdquo;</blockquote>
        <div className={s.storyBody}>
          {story.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <p className={s.signoff}>Former medical student · Writer and researcher</p>
        </div>
      </section>

      <section id="explainer" className={`container ${s.featured}`} aria-labelledby="explainer-title">
        <div className={s.featuredHead}>
          <p className="label"><span>§ 02</span> Featured explainer</p>
          <span className={s.badge}>ME/CFS · Draft</span>
        </div>
        <div className={s.featuredGrid}>
          <div>
            <h2 id="explainer-title" className={s.h2}>Why a good day can cause a bad week</h2>
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
            <figcaption>
              <b>Fig. 1</b> Illustrative, not patient data. Timing and severity vary from person to person.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="conditions" className={`container rule-top ${s.explorer}`} aria-labelledby="conditions-title">
        <div className={s.explorerHead}>
          <p className="label"><span>§ 03</span> Condition explorer</p>
          <h2 id="conditions-title" className={s.h2}>Start with a condition</h2>
        </div>
        <div className={s.bento}>
          {conditions.map((c, i) => {
            const n = articleCount(c);
            const size = i === 0 ? s.tileWide : i === conditions.length - 1 ? s.tileHalf : "";
            return (
              <article key={c.slug} className={`${s.tile} ${size}`}>
                <span className={s.tileIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.tileName}>{c.name}</h3>
                <span className={s.tileFull}>{c.full}</span>
                <p className={s.tileSummary}>{c.summary}</p>
                <div className={s.tileFoot}>
                  <span className={s.systems}>
                    {c.systems.map((x) => <span key={x}>{x}</span>)}
                  </span>
                  <span className={n ? s.count : s.soon}>{countLabel(n)}</span>
                </div>
              </article>
            );
          })}
          <a href="#latest" className={`${s.tile} ${s.tileBasics}`}>
            <span className={s.tileIndex}>Not sure where to start?</span>
            <span className={s.tileName}>Begin with the basics</span>
            <span className={s.tileSummary}>
              What &ldquo;medically unexplained&rdquo; really means, and why it never means imagined.
            </span>
            <span className={s.tileFoot}><span className={s.count}>Read the introduction →</span></span>
          </a>
        </div>
      </section>

      <section id="latest" className={`container ${s.latest}`} aria-labelledby="latest-label">
        <p id="latest-label" className="label"><span>§ 04</span> Latest</p>
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
    </>
  );
}
