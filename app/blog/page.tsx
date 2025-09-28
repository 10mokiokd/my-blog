import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";

type PostMeta = {
  slug: string;
  title?: string;
  summary?: string;
  date?: string;
};

const POSTS_DIR = path.join(process.cwd(), "contents", "posts");

export const metadata = { title: "Blog" };

export default async function BlogIndex() {
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));
  const posts: PostMeta[] = await Promise.all(
    files.map(async (f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(POSTS_DIR, f), "utf8");
      const { data } = matter(raw);
      const meta = data as Record<string, unknown>;
      return {
        slug,
        title: typeof meta.title === "string" ? meta.title : undefined,
        summary: typeof meta.summary === "string" ? meta.summary : undefined,
        date: typeof meta.date === "string" ? meta.date : undefined,
      } satisfies PostMeta;
    })
  );

  posts.sort((a, b) => +new Date(b.date ?? 0) - +new Date(a.date ?? 0));

  return (
    <main className="max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="border rounded-lg p-4">
            <Link href={`/blog/${p.slug}`} className="font-semibold hover:underline">
              {p.title ?? p.slug}
            </Link>
            {p.summary && <p className="text-sm opacity-70">{p.summary}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
