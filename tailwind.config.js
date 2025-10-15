/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        secondary: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        dark: {
          50: '#374151',
          100: '#1f2937',
          200: '#111827',
          300: '#0a0f1a',
          400: '#050a15',
        },
        gradient: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
        }
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}