import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: ({theme}) => ({
        DEFAULT: {
          css: {
            color: theme("colors.slate.800"),
            a: {
              color: theme("colors.indigo.600"),
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: "-0.02em",
              lineHeight: "1.15",
              marginBottom: "0.6em",
            },
            h2: {
              fontWeight: "700",
              letterSpacing: "-0.01em",
              marginTop: "2.5em",
              marginBottom: "0.6em",
            },
            h3: {
              fontWeight: "700",
              marginTop: "1.8em",
              marginBottom: "0.4em",
            },
            p: {
              marginTop: "1em",
              marginBottom: "1em",
            },
            code: {
              backgroundColor: theme("colors.slate.100"),
              padding: "0.15rem 0.35rem",
              borderRadius: "0.25rem",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            blockquote: {
              fontStyle: "normal",
              borderLeft: `4px solid ${theme("colors.slate.300")}`,
              color: theme("colors.slate.700"),
            },
            img: { borderRadius: "0.5rem" },
            table: { width: "100%" },
            "tbody tr": { borderBottomColor: theme("colors.slate.200") },
          },
        },
        // 画面が広いときの“読み物用”拡張
        lg: {
          css: {
            h1: { fontSize: "2.25rem" }, // ~text-3xl
            h2: { fontSize: "1.875rem" }, // ~text-2xl
            h3: { fontSize: "1.5rem" },   // ~text-xl
            p: { lineHeight: "1.9" },
          },
        },
      }),
      fontFamily: {
        // Tailwindの font-sans に Noto Sans JP を割り当て（任意）
        sans: ["var(--font-noto-sans-jp)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
}
export default config