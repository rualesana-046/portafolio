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
        dark: {
          base: "#052A24",
          deep: "#031C18",
          surface: "#0A3A32",
          alga: "#14584C",
          champagne: "#C9AE7C",
          shine: "#E8D9B0",
          shade: "#8F7648",
          verdigris: "#4FA596",
          copper: "#B5704A",
          text: "#EEE7D3",
          muted: "#C3CCBD",
        },
        light: {
          base: "#EDE9D8",
          light: "#F3F0E2",
          sage: "#DDE0CB",
          surface: "#F6F3E7",
          ink: "#0B2B26",
          bronze: "#8A6F3E",
          engraving: "#6B5530",
          verdigris: "#1E5C50",
          copper: "#9A5530",
          muted: "#3A564E",
        },
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-strong": "rgb(var(--accent-strong) / <alpha-value>)",
        link: "rgb(var(--link) / <alpha-value>)",
        patina: "rgb(var(--patina) / <alpha-value>)",
        copper: "rgb(var(--copper) / <alpha-value>)",
        "button-from": "rgb(var(--button-from) / <alpha-value>)",
        "button-to": "rgb(var(--button-to) / <alpha-value>)",
        "on-button": "rgb(var(--on-button) / <alpha-value>)",
        "on-seal": "rgb(var(--on-seal) / <alpha-value>)",
        "on-wax": "rgb(var(--on-wax) / <alpha-value>)",
        "tree-far": "rgb(var(--tree-far) / <alpha-value>)",
        "tree-mid": "rgb(var(--tree-mid) / <alpha-value>)",
        "tree-near": "rgb(var(--tree-near) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        glow: "rgb(var(--glow) / <alpha-value>)",
      },
      fontFamily: {
        title: ["var(--font-grenze)", ...fontFamily.serif],
        body: ["var(--font-newsreader)", ...fontFamily.serif],
        monogram: ["var(--font-unifraktur)", ...fontFamily.serif],
      },
      boxShadow: {
        arcane: "0 0 24px -6px rgb(var(--glow) / 0.45)",
        parchment: "0 8px 24px -12px rgb(var(--ink) / 0.35)",
      },
      backdropBlur: {
        glass: "14px",
      },
      keyframes: {
        "ink-rise": {
          "0%": { opacity: "0", transform: "translateY(14px)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
      },
      animation: {
        "ink-rise": "ink-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
