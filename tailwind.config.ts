import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorValue: "#025955",
      },
      fontFamily: {
        trebuchetMs: ["Trebuchet MS"],
      },
      screens: {
        xs: "480px",
        "1xl": "1440px",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
} satisfies Config;
