// components/Balloon.tsx
import clsx from "clsx";

type Props = {
    /** 吹き出しの名前（例: "Tomoki"） */
    name?: string;
    /** アイコン画像のパス（例: "/images/icon.png"） */
    icon?: string;        // /public 配下
    /** 吹き出しの方向（left または right） */
    side?: "left" | "right";
    /** 吹き出し内に表示する本文 */
    children: React.ReactNode;
    /** 追加のクラス名 */
    className?: string;
};

// ※表示だけなら Server Component でOK（"use client" は不要）
// クリック等のイベントを入れるなら冒頭に "use client" を付ける
export default function Balloon({
    name,
    icon,
    side = "left",
    children,
    className,
}: Props) {
    const isLeft = side === "left";
    return (
        <div
            className={clsx(
                "my-4 flex items-start gap-3",
                isLeft ? "flex-row" : "flex-row-reverse"
            )}
        >
            {icon ? (
                // 画像はそのまま <img> でOK（最小実装）
                <img
                    src={icon}
                    alt={name ?? "avatar"}
                    className="size-10 rounded-full object-cover"
                />
            ) : (
                <div className="size-10 rounded-full bg-gray-300 dark:bg-gray-700" />
            )}
            <div className={clsx("max-w-[75%]", className)}>
                {name && (
                    <div
                        className={clsx(
                            "mb-1 text-xs font-medium text-gray-500 dark:text-gray-400",
                            isLeft ? "text-left" : "text-right"
                        )}
                    >
                        {name}
                    </div>
                )}
                <div
                    className={clsx(
                        "relative rounded-2xl px-4 py-3",
                        "bg-white text-gray-900 shadow ring-1 ring-gray-200",
                        "dark:bg-zinc-800 dark:text-gray-100 dark:ring-zinc-700"
                    )}
                >
                    {/* 吹き出しの三角 */}
                    <span
                        className={clsx(
                            "absolute top-3 size-3 rotate-45",
                            "bg-white ring-1 ring-gray-200",
                            "dark:bg-zinc-800 dark:ring-zinc-700",
                            isLeft ? "-left-1" : "-right-1"
                        )}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
}
