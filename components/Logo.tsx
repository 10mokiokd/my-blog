import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

type LogoProps = {
  href?: string;
  className?: string;
  title?: string;
};

export default function Logo({
  href = "/",
  className = "",
  title = "Monoscape",
}: LogoProps) {
  const baseClassName = `${playfairDisplay.className} text-2xl tracking-wide`;
  const logoClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  if (!href) {
    return (
      <span className={logoClassName}>
        {title}
      </span>
    );
  }

  return (
    <Link href={href} className={logoClassName}>
      {title}
    </Link>
  );
}
