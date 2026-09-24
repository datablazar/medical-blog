import type { PostMeta } from "@/lib/posts";
import styles from "./PostCard.module.css";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className={styles.card}>
      <p className="t-kicker kicker-accent">{post.topic}</p>
      <h3 className={`t-h3 ${styles.title}`}>{post.title}</h3>
      <p className={styles.summary}>{post.summary}</p>
      <p className="t-small muted">
        <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
        {" · "}
        {post.readingTime} min read
      </p>
    </article>
  );
}
