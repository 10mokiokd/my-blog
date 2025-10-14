import Link from "next/link";

import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Logo className="text-white hover:text-gray-200 transition-colors" />
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
    </header>
  );
}
