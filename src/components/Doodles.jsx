/* Hand-drawn-ish vector objects that float around the hero.
   All stroke-based so they inherit colour and stay crisp at any size. */

const s = { fill: "none", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

export const Mug = (p) => (
  <svg viewBox="0 0 48 48" stroke="currentColor" {...p}>
    <path {...s} d="M10 18h22v14a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8V18Z" />
    <path {...s} d="M32 22h4a5 5 0 0 1 0 10h-4" />
    <path {...s} d="M16 12c0-2 2-2 2-4M23 12c0-2 2-2 2-4M30 12c0-2 2-2 2-4" />
  </svg>
);

export const Braces = (p) => (
  <svg viewBox="0 0 48 48" stroke="currentColor" {...p}>
    <path {...s} d="M19 8c-5 0-5 4-5 8s-4 8-4 8 4 0 4 8-0 8 5 8" />
    <path {...s} d="M29 8c5 0 5 4 5 8s4 8 4 8-4 0-4 8 0 8-5 8" />
  </svg>
);

export const Atom = (p) => (
  <svg viewBox="0 0 48 48" stroke="currentColor" {...p}>
    <circle {...s} cx="24" cy="24" r="3.2" />
    <ellipse {...s} cx="24" cy="24" rx="17" ry="6.6" />
    <ellipse {...s} cx="24" cy="24" rx="17" ry="6.6" transform="rotate(60 24 24)" />
    <ellipse {...s} cx="24" cy="24" rx="17" ry="6.6" transform="rotate(120 24 24)" />
  </svg>
);

export const Sticky = (p) => (
  <svg viewBox="0 0 48 48" stroke="currentColor" {...p}>
    <path {...s} d="M9 9h30v22L30 40H9V9Z" />
    <path {...s} d="M39 31H30v9" />
    <path {...s} d="M15 17h18M15 23h14M15 29h9" />
  </svg>
);

export const Cursor = (p) => (
  <svg viewBox="0 0 48 48" stroke="currentColor" {...p}>
    <path {...s} d="M14 9l21 13-9 2.5L21 36 14 9Z" />
  </svg>
);

export const Spark = (p) => (
  <svg viewBox="0 0 48 48" stroke="currentColor" {...p}>
    <path {...s} d="M24 7c0 9 5 14 14 14-9 0-14 5-14 14 0-9-5-14-14-14 9 0 14-5 14-14Z" />
  </svg>
);

export const Squiggle = (p) => (
  <svg viewBox="0 0 120 24" stroke="currentColor" {...p}>
    <path {...s} d="M2 16c8-14 16 12 24 0s16 12 24 0 16 12 24 0 16 12 24 0" />
  </svg>
);

export const Arrow = (p) => (
  <svg viewBox="0 0 80 60" stroke="currentColor" {...p}>
    <path {...s} d="M4 6c22 4 40 18 50 42" />
    <path {...s} d="M44 44l10 5 2-11" />
  </svg>
);
