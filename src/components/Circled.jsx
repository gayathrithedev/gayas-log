import { motion, useReducedMotion } from "motion/react";

/* Wraps a phrase in a hand-drawn ellipse that draws itself in.
   The stroke is non-scaling so it stays even however wide the text is. */
export default function Circled({ children, delay = 0.9, className = "" }) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>

      <svg
        aria-hidden
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-3 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+24px)] overflow-visible"
      >
        <motion.path
          d="M96.5 15.5 C 94 4.5, 71 1.2, 50 1.2 C 23 1.2, 2.5 7, 2.5 20 C 2.5 32.5, 25.5 38.8, 52 38.8 C 78 38.8, 98.5 32.5, 98.5 18.5 C 98.5 11.5, 92 6.5, 83 3.4"
          fill="none"
          stroke="#EC4899"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          /* No pathLength draw-in here: the viewBox is stretched to the
             width of the phrase, and dash maths under a non-uniform scale
             leaves the ellipse unfinished. Fading in is reliable. */
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  );
}
