/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Monochrome system — white page, ink type, no colour accents.
        paper:    "#FFFFFF",
        paper2:   "#F6F6F4",
        ink:      "#101010",
        ink70:    "#4E4E4B",
        ink40:    "#8B8B86",
        rule:     "#E7E7E3",
        // "accent" tokens kept for API stability; all neutral.
        flame:    "#101010",
        flameSoft:"#F2F2F0",
        moss:     "#3A3A37",
        mossSoft: "#F4F4F2",
        ochre:    "#6B6B65",
        ochreSoft:"#F7F7F5",
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card:  '0 1px 0 0 #E7E7E3, 0 18px 40px -30px rgba(16,16,16,0.22)',
        lift:  '0 1px 0 0 #101010, 0 26px 50px -32px rgba(16,16,16,0.30)',
        sticker:'0 6px 18px -14px rgba(16,16,16,0.35)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
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
