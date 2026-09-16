import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F6F8FB",
        ink: {
          DEFAULT: "#16202A",
          soft: "#4A5568",
          faint: "#8A94A6",
        },
        line: "#E4E8F0",
        card: "#FFFFFF",
        brand: {
          DEFAULT: "#3552D6",
          soft: "#EEF1FD",
          dark: "#233A9E",
        },
        plum: {
          DEFAULT: "#7C3AED",
          soft: "#F4EEFE",
        },
        emerald: {
          DEFAULT: "#0F9D6D",
          soft: "#E9F8F1",
        },
        gold: {
          DEFAULT: "#B7860B",
          soft: "#FBF3DE",
        },
        rose: {
          DEFAULT: "#C2374F",
          soft: "#FBEBEE",
        },
      },
      fontFamily: {
        vazir: ["var(--font-vazir)", "Tahoma", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,32,42,0.04), 0 8px 24px -12px rgba(22,32,42,0.10)",
        cardHover: "0 4px 10px rgba(22,32,42,0.06), 0 16px 32px -14px rgba(22,32,42,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
