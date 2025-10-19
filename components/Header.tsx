import Link from "next/link";

import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="bg-[#0D0D0D] text-white p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <Logo className="text-white" />
        <div className="space-x-4">
          <Link
            href="/"
            className="text-white transition-colors duration-200 hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="/profile"
            className="text-white transition-colors duration-200 hover:text-gray-300"
          >
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
