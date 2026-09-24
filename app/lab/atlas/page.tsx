import type { Metadata } from "next";
import { EB_Garamond, IM_Fell_English, IM_Fell_English_SC } from "next/font/google";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { NervePlate } from "./NervePlate";
import s from "./atlas.module.css";

export const metadata: Metadata = { title: "Atlas · Design lab" };

const fell = IM_Fell_English({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--at-display" });
const fellSC = IM_Fell_English_SC({ subsets: ["latin"], weight: "400", variable: "--at-caps" });
const garamond = EB_Garamond({ subsets: ["latin"], style: ["normal", "italic"], variable: "--at-body" });

const roman = ["II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function Atlas() {
  const posts = getAllPosts();

  return (
    <div className={`${s.page} ${fell.variable} ${fellSC.variable} ${garamond.variable}`}>
      <div className={s.frame}>
        <header className={s.head}>
          <p className={s.small}>Being a Guide to the Science of</p>
          <h1 className={s.title}>Medically <em>Explained</em></h1>
          <p className={s.small}>Conditions not yet fully charted by Medicine</p>
          <p className={s.fleuron} aria-hidden="true">❧</p>
        </header>

        <section className={s.plateRow}>
          <figure className={s.plate}>
            <NervePlate className={s.plateArt} />
            <figcaption>
              <span className={s.plateNo}>Plate I.</span> The nervous system, which remains
              in parts uncharted.
            </figcaption>
          </figure>

          <div className={s.preface}>
            <h2 className={s.h2}>Preface</h2>
            <p className={s.dropcap}>
              There are illnesses with real and often disabling symptoms for which the standard
              tests find no single clear cause. They are not imagined; they are, as yet,
              incompletely mapped.
            </p>
            <p>
              In these pages we set down what research currently suggests, mark plainly where the
              evidence is thin, and cite our sources, so that you may read the map as it stands.
            </p>

            <dl className={s.key}>
              <dt>A.</dt><dd>What is known.</dd>
              <dt>B.</dt><dd>What is suspected, and under study.</dd>
              <dt>C.</dt><dd>What remains unexplained.</dd>
            </dl>
          </div>
        </section>

        <section aria-labelledby="plates">
          <h2 id="plates" className={s.listTitle}>
            <span>List of Plates</span>
          </h2>
          <ol className={s.list}>
            {posts.map((post, i) => (
              <li key={post.slug} className={s.item}>
                <span className={s.num}>Plate {roman[i]}.</span>
                <div className={s.itemBody}>
                  <p className={s.topic}>{post.topic}</p>
                  <h3 className={s.itemTitle}>{post.title}</h3>
                  <p className={s.summary}>{post.summary}</p>
                </div>
                <span className={s.leader} aria-hidden="true" />
                <span className={s.date}>{formatDate(post.date, { day: "numeric", month: "short", year: "numeric" })}</span>
              </li>
            ))}
          </ol>
        </section>

        <footer className={s.foot}>
          <p className={s.fleuron} aria-hidden="true">⁂</p>
          <p>This is general information, not a substitute for advice from your GP or pharmacist.</p>
        </footer>
      </div>
    </div>
  );
}
