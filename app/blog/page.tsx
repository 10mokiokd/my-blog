import Link from "next/link";
import { getAllPostsMeta } from "@/lib/mdx";

export const metadata = { title: "Blog" };

export default async function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map(({ slug, frontmatter, excerpt }) => (
          <li key={slug} className="border rounded-lg p-4">
            <Link href={`/blog/${slug}`} className="font-semibold hover:underline">
              {frontmatter.title ?? slug}
            </Link>
            {excerpt && <p className="text-sm opacity-70">{excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
