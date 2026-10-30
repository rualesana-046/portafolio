import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nox: {
          base: "#0B110E",
          surface: "#101A15",
          brass: "#A68B3C",
          gold: "#D4AF37",
          emerald: "#10B981",
          text: "#E8E2D0",
          muted: "#9CA89F",
        },
        lumos: {
          base: "#F5EFEB",
          alt: "#EDE4D8",
          surface: "#FAF7F2",
          leather: "#D1C2A5",
          ink: "#241D17",
          bronze: "#9B7A2F",
          engraving: "#765C22",
          muted: "#6B5E50",
        },
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-strong": "rgb(var(--accent-strong) / <alpha-value>)",
        glow: "rgb(var(--glow) / <alpha-value>)",
      },
      fontFamily: {
        title: ["var(--font-cinzel)", ...fontFamily.serif],
        body: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains)", ...fontFamily.mono],
      },
      boxShadow: {
        arcane: "0 0 24px -6px rgb(var(--glow) / 0.45)",
        parchment: "0 8px 24px -12px rgb(36 29 23 / 0.35)",
      },
      backdropBlur: {
        glass: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
