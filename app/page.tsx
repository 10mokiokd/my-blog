import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
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
        <h1 className="inline-block">
          <Logo variant="auto" className="text-4xl sm:text-5xl" />
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          キャリアで得た知見や試行錯誤の記録をまとめています。気になるテーマから読み進めてください。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="#posts"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            最新の記事を読む
          </Link>
          <Link
            href="/profile"
            className="rounded-md border border-black px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            プロフィールを見る
          </Link>
        </div>
      </section>

      <section id="posts" className="space-y-6">
        <header className="space-y-2">
          <h2 className="bg-[#FDEBEC] border-l-[5px] border-[#F05A6B] px-4 py-3 text-xl font-bold text-[#3D3D3D] dark:bg-[#3B1B1E] dark:text-[#FCE7E8]">
            最新の記事
          </h2>
        </header>
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            まだ記事がありません。公開されるまで少しお待ちください。
          </p>
        ) : (
          <ul className="space-y-4">
            {posts.map(({ slug, frontmatter, excerpt }) => (
              <li key={slug} className="border-b pb-6 last:border-b-0">
                <Link
                  href={`/blog/${slug}`}
                  className="group block rounded-lg py-4 pl-0 pr-4 transition-colors duration-200 hover:bg-[#F4F4F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:hover:bg-[#1F1F1F]"
                >
                  <h3 className="text-lg font-semibold transition-colors duration-200">
                    {frontmatter.title ?? slug}
                  </h3>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={frontmatter.date}>{frontmatter.date}</time>
                    {frontmatter.tags?.length ? (
                      <span> ・ {frontmatter.tags.join(", ")}</span>
                    ) : null}
                  </div>
                  {excerpt && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {excerpt}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-gray-600 transition-colors duration-200 group-hover:underline dark:text-gray-300">
                    続きを読む
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
