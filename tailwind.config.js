/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Claude Theme Colors
        light: {
          bg: '#F5F5F5',
          'content-bg': '#FFFFFF',
          'text-primary': '#2D2D2D',
          'text-secondary': '#6B6B6B',
          accent: '#CC785C',
          border: '#E5E5E5',
          hover: '#F0E8E3',
        },
        dark: {
          bg: '#1A1A1A',
          'content-bg': '#2D2D2D',
          'text-primary': '#E8E8E8',
          'text-secondary': '#A0A0A0',
          accent: '#D4916C',
          border: '#404040',
          hover: '#383838',
        },
        energy: {
          high: '#059669',
          medium: '#D97706',
          low: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'claude': '8px',
      },
      transitionDuration: {
        'claude': '200ms',
      }
    },
  },
  plugins: [],
}