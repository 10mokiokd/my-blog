// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="mb-6">お探しのページは存在しないか、削除された可能性があります。</p>
      <Link href="/" className="text-blue-600 underline">
        ホームに戻る
      </Link>
    </div>
  );
}
