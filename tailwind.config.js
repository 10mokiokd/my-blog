"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typography_1 = require("@tailwindcss/typography");
exports.default = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './contents/**/*.{md,mdx,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-noto-sans-jp)', 'sans-serif'],
            },
        },
    },
    plugins: [typography_1.default],
};
