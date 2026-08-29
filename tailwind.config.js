/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens. Values are RGB triplets so Tailwind opacity
        // modifiers (for example bg-paper/90) work in both themes.
        paper:    "rgb(var(--color-paper) / <alpha-value>)",
        paper2:   "rgb(var(--color-paper2) / <alpha-value>)",
        ink:      "rgb(var(--color-ink) / <alpha-value>)",
        ink70:    "rgb(var(--color-ink70) / <alpha-value>)",
        ink40:    "rgb(var(--color-ink40) / <alpha-value>)",
        rule:     "rgb(var(--color-rule) / <alpha-value>)",
        // "accent" tokens kept for API stability; all theme-aware.
        flame:    "rgb(var(--color-flame) / <alpha-value>)",
        flameSoft:"rgb(var(--color-flame-soft) / <alpha-value>)",
        moss:     "rgb(var(--color-moss) / <alpha-value>)",
        mossSoft: "rgb(var(--color-moss-soft) / <alpha-value>)",
        ochre:    "rgb(var(--color-ochre) / <alpha-value>)",
        ochreSoft:"rgb(var(--color-ochre-soft) / <alpha-value>)",
        // The greeting accent.
        inkblue:  "rgb(var(--color-inkblue) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Caveat"', 'cursive'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  'var(--shadow-card)',
        lift:  'var(--shadow-lift)',
        sticker:'var(--shadow-sticker)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translate3d(0, 0, 0)' }, '100%': { transform: 'translate3d(-50%, 0, 0)' } },
        floaty:  { '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' }, '50%': { transform: 'translateY(-14px) rotate(calc(var(--r,0deg) + 3deg))' } },
        blink:   { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floaty:  'floaty 6s ease-in-out infinite',
        blink:   'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
