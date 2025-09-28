import Image from "next/image";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Hello Blog 🚀</h1>
      <p className="mt-3">最初のページが動いてます。</p>
      <div className="mt-6 rounded-lg border p-4">Tailwindも効いてる？</div>
    </main>
  );
}
