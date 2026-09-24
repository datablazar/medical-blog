import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  date: string;
  readingTime: number;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title),
        summary: String(data.summary),
        topic: String(data.topic),
        date: new Date(data.date).toISOString().slice(0, 10),
        readingTime: Number(data.readingTime),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
