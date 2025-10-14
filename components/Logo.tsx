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
  title = "MonoScape",
}: LogoProps) {
  const baseClassName = `${playfairDisplay.className} logo group inline-flex text-2xl tracking-wide`;
  const logoClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;
  const accentColorClassName = "text-[#E60026]";
  const primaryHoverClass =
    "transition-colors duration-200 group-hover:text-[#E5E5E5]";
  const accentHoverClass =
    "transition-colors duration-200 group-hover:text-[#CC0022]";

  const accentIndex = title.toLowerCase().indexOf("scape");
  const primaryText =
    accentIndex > -1 ? title.slice(0, accentIndex) : title;
  const accentText = accentIndex > -1 ? title.slice(accentIndex) : "";
  const accentFirstChar = accentText ? accentText.charAt(0) : "";
  const accentRemainder = accentText ? accentText.slice(1) : "";

  const logoTextContent = (
    <>
      <span className={`text-white ${primaryHoverClass}`}>{primaryText}</span>
      {accentText ? (
        <>
          <span
            className={`${accentColorClassName} ${accentHoverClass}`}
          >
            {accentFirstChar}
          </span>
          {accentRemainder ? (
            <span className={`text-white ${primaryHoverClass}`}>
              {accentRemainder}
            </span>
          ) : null}
        </>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <span className={logoClassName}>
        {logoTextContent}
      </span>
    );
  }

  return (
    <Link href={href} className={logoClassName}>
      {logoTextContent}
    </Link>
  );
}
