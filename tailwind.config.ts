import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#8cff00",
        "accent-dark": "#7ae000",
        dark: {
          bg: "#0f0f0f",
          card: "#1c1c1c",
          card2: "#141414",
        },
        light: {
          bg: "#f9f9f9",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        panel: "72px",
        "panel-sm": "36px",
      },
      maxWidth: {
        content: "1080px",
        hero: "1440px",
        nav: "860px",
      },
    },
  },
  plugins: [],
};

export default config;
