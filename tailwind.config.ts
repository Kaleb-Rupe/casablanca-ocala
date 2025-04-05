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
        coral: "#EE4D64",
        darkGray: "#2D2D2D",
        background: "var(--background)",
        foreground: "var(--foreground)",
        beige: "#F5F5DC",
        sage: "#9CAF88",
        navy: "#1a365d",
      },
    },
  },
  plugins: [],
} satisfies Config;
