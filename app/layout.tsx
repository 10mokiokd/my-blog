import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Noto_Sans_JP } from 'next/font/google'

import Header from "@/components/Header";
import Footer from "@/components/Footer";


const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'], // 日本語の場合 'latin' でOK
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'], // 必要な太さを指定
  display: 'swap',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monoscape",
  description: "Training for Next.js",
  openGraph: {
    title: "Monoscape",
    description: "Training for Next.js",
    url: "https://my-blog.com",
    siteName: "Monoscape",
    images: [
      {
        url: "/og-image.png", // シェア時に表示される画像
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJp.className}>
      <body className="min-h-screen flex flex-col">
        <Header />

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-6">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
