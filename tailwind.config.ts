import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#ec5b22",
        "accent-deep": "#c8460f",
        ink: "#0b0b0c",
        bone: "#f4f2ee",
        steel: "#2a2d33",
        dark: {
          bg: "#0b0b0c",
          card: "#1c1e22",
          card2: "#141517",
        },
        light: {
          bg: "#f4f2ee",
          card: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        panel: "46px",
        "panel-sm": "28px",
      },
      maxWidth: {
        content: "1120px",
        hero: "1440px",
        nav: "880px",
      },
    },
  },
  plugins: [],
};

export default config;
