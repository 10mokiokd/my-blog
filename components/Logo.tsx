import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

type LogoVariant = "dark" | "light" | "auto";

type LogoProps = {
  href?: string;
  className?: string;
  title?: string;
  variant?: LogoVariant;
};

export default function Logo({
  href = "/",
  className = "",
  title = "MonoScape",
  variant = "dark",
}: LogoProps) {
  const baseClassName = `${playfairDisplay.className} logo group inline-flex text-2xl tracking-wide`;
  const logoClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;
  const primaryBaseColorClass =
    variant === "dark"
      ? "text-white"
      : variant === "light"
        ? "text-black"
        : "text-black dark:text-white";
  const primaryHoverClass =
    variant === "dark"
      ? "group-hover:text-[#E5E5E5]"
      : variant === "light"
        ? "group-hover:text-[#333333]"
        : "group-hover:text-[#333333] dark:group-hover:text-[#E5E5E5]";
  const accentColorClassName = "text-[#E60026]";
  const accentHoverClass =
    variant === "dark"
      ? "group-hover:text-[#CC0022]"
      : variant === "light"
        ? "group-hover:text-[#B2001C]"
        : "group-hover:text-[#B2001C] dark:group-hover:text-[#CC0022]";
  const hoverTransitionClass = "transition-colors duration-200";

  const accentIndex = title.toLowerCase().indexOf("scape");
  const primaryText =
    accentIndex > -1 ? title.slice(0, accentIndex) : title;
  const accentText = accentIndex > -1 ? title.slice(accentIndex) : "";
  const accentFirstChar = accentText ? accentText.charAt(0) : "";
  const accentRemainder = accentText ? accentText.slice(1) : "";

  const logoTextContent = (
    <>
      <span
        className={`${primaryBaseColorClass} ${hoverTransitionClass} ${primaryHoverClass}`}
      >
        {primaryText}
      </span>
      {accentText ? (
        <>
          <span
            className={`${accentColorClassName} ${hoverTransitionClass} ${accentHoverClass}`}
          >
            {accentFirstChar}
          </span>
          {accentRemainder ? (
            <span
              className={`${primaryBaseColorClass} ${hoverTransitionClass} ${primaryHoverClass}`}
            >
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
