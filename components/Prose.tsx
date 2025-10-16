import { ReactNode } from "react";

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <article
            className={[
                // ベース
                "prose prose-slate max-w-3xl mx-auto",
                // サイズ（モバイル/PC）
                "prose-base md:prose-lg",
                // 見出し
                "prose-headings:font-bold prose-headings:tracking-tight",
                "prose-h1:text-3xl prose-h1:leading-tight",
                "prose-h2:text-2xl md:prose-h2:text-3xl",
                "prose-h3:text-xl md:prose-h3:text-2xl",
                // 本文
                "prose-p:my-5 prose-p:leading-8",
                // リンク
                "prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2",
                // コード＆引用
                "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
                "prose-blockquote:border-l-4",
                // 画像＆表
                "prose-img:rounded-lg prose-figcaption:text-sm",
                // 余白
                "md:prose-h2:mt-12 md:prose-h2:mb-4 md:prose-h3:mt-8 md:prose-h3:mb-2",
                className,
            ].join(" ")}
        >
            {children}
        </article>
    );
}
