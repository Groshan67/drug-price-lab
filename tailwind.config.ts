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
          DEFAULT: "#1a6fd4",
          soft: "#EAF3FD",
          dark: "#15599f",
        },
        plum: {
          DEFAULT: "#7C3AED",
          soft: "#F4EEFE",
        },
        emerald: {
          DEFAULT: "#0f8a6a",
          soft: "#E6F5F1",
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
