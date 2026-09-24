import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <section className={`measure ${styles.hero}`}>
        <p className="t-kicker kicker-accent">The science, explained</p>
        <h1 className="t-display">When tests come back normal but you still feel unwell</h1>
        <p>
          We explain what research currently tells us about medically unexplained conditions
          (illnesses with real symptoms but no single clear cause that standard tests can find),
          in plain words and without false promises.
        </p>
        <div>
          <Button href="/about">About this blog</Button>
        </div>
      </section>

      <div className={`section measure`}>
        <Callout variant="in-short">
          <p>
            Each article sums up the evidence on one condition or question, says plainly where the
            science is uncertain, and lists its sources.
          </p>
        </Callout>
      </div>

      <section className="section" aria-labelledby="latest">
        <h2 id="latest" className="t-h2">Latest articles</h2>
        <div className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
