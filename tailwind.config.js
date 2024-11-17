/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        'gray-800': 'rgb(31 41 55)',
        'gray-900': 'rgb(17 24 39)',
        'green-500': 'rgb(34 197 94)',
        'green-600': 'rgb(22 163 74)',
      },
    },
  },
  plugins: [],
}

