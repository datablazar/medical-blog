import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Reference = { text: string; url?: string };

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  date: string;
  readingTime: number;
  draft: boolean;
};

export type Post = PostMeta & { content: string; references: Reference[] };

const postsDir = path.join(process.cwd(), "content", "posts");

function read(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    summary: String(data.summary),
    topic: String(data.topic),
    date: new Date(data.date).toISOString().slice(0, 10),
    readingTime: Number(data.readingTime),
    draft: Boolean(data.draft),
    references: Array.isArray(data.references) ? data.references : [],
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, references, ...meta } = read(file);
      return meta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.md`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(postsDir, file))) return undefined;
  return read(file);
}

/** Posts that are live on the site. Drafts stay in the repo but are never listed or routed. */
export function getPublishedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => !p.draft);
}

/** The article's section headings (its "## " lines, in order). */
export function getSections(content: string): string[] {
  return [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
}

/** Number of figures embedded with {{figure:name}}. */
export function countFigures(content: string): number {
  return (content.match(/\{\{figure:[a-z]+\}\}/g) ?? []).length;
}
