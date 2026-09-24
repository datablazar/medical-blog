import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { EvidenceGapLoop } from "./figures/EvidenceGapLoop";
import { EvidenceLadder } from "./figures/EvidenceLadder";
import styles from "./ArticleBody.module.css";

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

const figures: Record<string, { n: number; render: () => ReactNode; caption: ReactNode }> = {
  ladder: {
    n: 1,
    render: () => <EvidenceLadder />,
    caption: (
      <>
        The conventional hierarchy of evidence, strongest at the top. Strength marks are illustrative, and GRADE can
        move any study up or down depending on its quality. Adapted from Murad et al. and Woolf.
      </>
    ),
  },
  loop: {
    n: 2,
    render: () => <EvidenceGapLoop />,
    caption: (
      <>
        Conceptual diagram, not data: how underfunding and the reading of weak evidence as &ldquo;no evidence&rdquo; can
        reinforce each other. Based on the funding and study-size evidence cited in the text.
      </>
    ),
  },
};

const components: Components = {
  h2: ({ children }) => {
    const text = textOf(children);
    const technical = text.startsWith("For clinicians");
    return (
      <h2 id={slugify(text)} className={styles.h2}>
        {technical && <span className={styles.techBadge}>Technical</span>}
        {children}
      </h2>
    );
  },
  h3: ({ children }) => <h3 id={slugify(textOf(children))} className={styles.h3}>{children}</h3>,
  p: ({ children }) => {
    const text = textOf(children).trim();
    const m = /^\{\{figure:([a-z]+)\}\}$/.exec(text);
    if (m && figures[m[1]]) {
      const f = figures[m[1]];
      return (
        <figure className={styles.figure}>
          {f.render()}
          <figcaption>
            <b>Fig. {f.n}</b> {f.caption}
          </figcaption>
        </figure>
      );
    }
    return <p>{children}</p>;
  },
  a: ({ href = "", children }) => {
    if (href.startsWith("#ref-")) {
      return (
        <sup className={styles.cite}>
          <a href={href} aria-label={`Reference ${textOf(children)}`}>{children}</a>
        </sup>
      );
    }
    return <a href={href} className={styles.link}>{children}</a>;
  },
};

export function ArticleBody({ markdown, className }: { markdown: string; className?: string }) {
  return (
    <div className={`${styles.body} ${className ?? ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
