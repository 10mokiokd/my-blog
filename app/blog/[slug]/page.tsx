import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import MDXContent from "@/components/MDXContent";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";

const POSTS_DIR = path.join(process.cwd(), "contents", "posts");

async function getAllSlugs() {
  const files = await fs.readdir(POSTS_DIR);
  return files.filter(f => f.endsWith(".mdx")).map(f => f.replace(/\.mdx$/, ""));
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const filePath = path.join(POSTS_DIR, `${params.slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(raw);
    return (
      <main className="px-6 py-10">
        <Prose>
          <h1>{data.title ?? params.slug}</h1>
          {data.date && (
            <p className="mt-2 text-sm text-zinc-500">
              <time dateTime={data.date}>
                {new Date(data.date).toLocaleDateString()}
              </time>
            </p>
          )}
          <MDXContent source={content} />
        </Prose>
      </main>
    );
  } catch {
    notFound();
  }
}
