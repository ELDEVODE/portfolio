import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class", '[data-theme="night"]'],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Palatino", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Palatino", "serif"],
      },
      /* Channel triplets plus <alpha-value> so that the /opacity
         modifiers (border-gold/30, bg-wash/70 …) actually resolve.
         A bare var() breaks them silently. */
      colors: {
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink-rgb) / <alpha-value>)",
          soft: "rgb(var(--ink-soft-rgb) / <alpha-value>)",
        },
        gold: "rgb(var(--gold-rgb) / <alpha-value>)",
        wash: "rgb(var(--wash-rgb) / <alpha-value>)",
        rule: "rgb(var(--rule-rgb) / <alpha-value>)",
        meta: "rgb(var(--meta-rgb) / <alpha-value>)",
        sinopia: "rgb(var(--sinopia-rgb) / <alpha-value>)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "18%": { opacity: "0.94" },
          "34%": { opacity: "1" },
          "52%": { opacity: "0.9" },
          "61%": { opacity: "0.98" },
          "79%": { opacity: "0.93" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1.5deg) scaleY(1)" },
          "50%": { transform: "rotate(1.5deg) scaleY(1.06)" },
        },
        turn: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(.22,1,.36,1) both",
        flicker: "flicker 4.2s ease-in-out infinite",
        sway: "sway 2.6s ease-in-out infinite",
        turn: "turn 240s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
