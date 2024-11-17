import type { Config } from "tailwindcss"

const config: Config = {
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
        primary: "rgb(34 197 94)", // green-500
        "primary-foreground": "#ffffff",
        input: "rgb(31 41 55)", // gray-800
        ring: "rgb(34 197 94)", // green-500
        accent: "#ffffff",
        "accent-foreground": "rgb(17 24 39)", // gray-900
      },
    },
  },
  plugins: [],
}

export default config