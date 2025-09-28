This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Blog Site

> Live (Vercel): **[https://my-blog-beta-ebon-77.vercel.app/](https://my-blog-beta-ebon-77.vercel.app/)**  
> Replace `<your-vercel-app>` with your actual Vercel project URL.

## Deployment
- Hosted on **Vercel**. Every push to `main` triggers an auto-deploy.
- To deploy manually from CLI: `vercel --prod` (optional if Git integration is on)

---

## 作業の始め方
1.	クローンする
cd ~/Development/Github
git clone https://github.com/<ユーザー名>/<リポジトリ名>.git
cd <リポジトリ名>
npm install

2.	VSCodeで開く

code .

•	code . は「このディレクトリをVSCodeで開く」コマンド
•	まだ使えなければ、VSCodeで Command Palette → “Shell Command: Install ‘code’ command in PATH” を実行して有効化できる

3.	開発サーバーを起動

npm run dev
→ http://localhost:3000 で動作確認しながら編集できる

💡 よく使うパターン
	•	毎回の開始手順（チートシート）
cd ~/Development/Github/myblog
git pull --rebase
code .
npm run dev

•	編集はVSCodeで、動作確認はブラウザ（+ターミナルでログ確認）
