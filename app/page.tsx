// app/blog/page.tsx
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "最新記事一覧",
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      <ul className="space-y-6">
        {posts.map(({ slug, frontmatter, excerpt }) => (
          <li key={slug} className="border-b pb-6">
            <Link href={`/blog/${slug}`} className="text-2xl font-semibold">
              {frontmatter.title ?? slug}
            </Link>
            <div className="mt-1 text-sm text-gray-500">
              <time dateTime={frontmatter.date}>{frontmatter.date}</time>
              {frontmatter.tags?.length ? (
                <span> ・ {frontmatter.tags.join(", ")}</span>
              ) : null}
            </div>
            {excerpt && <p className="mt-2 text-gray-700">{excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
