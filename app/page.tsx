import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tomoki Okada | Home",
  description: "岡田智樹のブログ。日々の学びや気づきを記録しています。",
};

export default function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <main className="mx-auto max-w-3xl space-y-12 px-4 py-12">
      <section className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-teal-500">
          Tomoki Okada
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          ソフトウェア開発や日常の学びを発信するブログ
        </h1>
        <p className="text-lg text-gray-600">
          キャリアで得た知見や試行錯誤の記録をまとめています。気になるテーマから読み進めてください。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="#posts"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
          >
            最新の記事を読む
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-black px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white"
          >
            プロフィールを見る
          </Link>
        </div>
      </section>

      <section id="posts" className="space-y-6">
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold">最新の記事</h2>
          <p className="text-sm text-gray-500">最近公開したブログ記事の一覧です。</p>
        </header>
        {posts.length === 0 ? (
          <p className="text-gray-500">
            まだ記事がありません。公開されるまで少しお待ちください。
          </p>
        ) : (
          <ul className="space-y-6">
            {posts.map(({ slug, frontmatter, excerpt }) => (
              <li key={slug} className="border-b pb-6 last:border-b-0">
                <Link
                  href={`/blog/${slug}`}
                  className="text-2xl font-semibold transition-colors duration-200 hover:text-teal-600"
                >
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
        )}
      </section>
    </main>
  );
}
