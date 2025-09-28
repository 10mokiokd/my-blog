import Image from "next/image";

export default function Home() {
  return (
    <article className="prose prose-lg mx-auto">
      <h1>Tailwind Typography 導入テスト</h1>
      <p>
        これはテスト用の段落です。Typographyプラグインを導入すると、
        段落や見出し、リスト、リンクが自動的に読みやすく整形されます。
      </p>
      <ul>
        <li>リスト1</li>
        <li>リスト2</li>
      </ul>
      <a href="#">リンクの見え方</a>
    </article>
  );
}
