// components/ArticleLayout.tsx
import Image from "next/image";
import type { PostFrontmatter } from "@/lib/mdx";

type Props = {
    frontmatter: PostFrontmatter;
    children: React.ReactNode;
};

export default function ArticleLayout({ frontmatter, children }: Props) {
    const { title, date, updated, tags, thumbnail } = frontmatter;

    return (
        <article className="prose mx-auto max-w-3xl">
            <header className="not-prose mb-6">
                {tags?.length ? (
                    <ul className="mb-2 flex flex-wrap gap-2 text-sm text-gray-500">
                        {tags.map((t) => (
                            <li key={t} className="rounded bg-gray-100 px-2 py-0.5">
                                #{t}
                            </li>
                        ))}
                    </ul>
                ) : null}

                <h1 className="text-3xl font-bold leading-tight mt-4 mb-6">{title}</h1>

                <div className="mt-2 text-sm text-gray-500">
                    <time dateTime={date}>公開: {date}</time>
                    {updated && (
                        <>
                            {" "}
                            / <time dateTime={updated}>更新: {updated}</time>
                        </>
                    )}
                </div>

                {thumbnail ? (
                    <div className="mt-4">
                        <Image
                            src={thumbnail}
                            alt={title}
                            width={1200}
                            height={630}
                            priority
                            className="h-auto w-full rounded"
                        />
                    </div>
                ) : null}
            </header>

            <div className="prose">{children}</div>
        </article>
    );
}
