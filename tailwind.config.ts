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
        lightBlue: {
          50: "#e0f2fe",
          500: "#3b82f6",
          600: "#2563eb",
        },
        softAmber: {
          100: "#fffbeb",
          50: "#fff8e1",
        },
      },
      fontFamily: {
        geistSans: ["'Geist Sans'", "sans-serif"],
        geistMono: ["'Geist Mono'", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
