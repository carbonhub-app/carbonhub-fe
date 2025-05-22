import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Ensures marquee.tsx is included
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        cursor: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0%)" },
        },
      },
      animation: {
        blink: "blink 0.7s steps(2, jump-none) infinite",
        cursor: "cursor 1s step-end infinite",
        marquee: "marquee var(--duration, 30s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--duration, 30s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
