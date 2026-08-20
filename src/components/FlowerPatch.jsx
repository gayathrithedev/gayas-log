import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* A little meadow. Hovering grows five more flowers up out of the
   ground, staggered so they open one after another. */

const PETALS = 11;

function Daisy({ cx, cy, r, rot = 0, color }) {
  return (
    <g stroke={color} fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: PETALS }, (_, i) => {
        const a = (360 / PETALS) * i + rot;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy - r * 0.62}
            rx={r * 0.19}
            ry={r * 0.42}
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.2} />
    </g>
  );
}

function Stem({ x, yTop, yBase, sway = 4, color }) {
  const h = yBase - yTop;
  const d = `M ${x} ${yBase}
             C ${x - sway} ${yBase - h * 0.3}, ${x + sway} ${yBase - h * 0.5}, ${x - sway * 0.4} ${yBase - h * 0.72}
             S ${x} ${yTop + 2}, ${x} ${yTop}`;
  return <path d={d} stroke={color} fill="none" strokeWidth="1" strokeLinecap="round" />;
}

function Flower({ x, top, base, r, rot, sway, color }) {
  return (
    <>
      <Stem x={x} yTop={top + r * 0.9} yBase={base} sway={sway} color={color} />
      <Daisy cx={x} cy={top} r={r} rot={rot} color={color} />
    </>
  );
}

const INK = "#4E4E4B";
const BLUE = "#1D4ED8";
const YELLOW = "#E0A400";
const PINK = "#E0479B";

const BASE = [
  { x: 30, top: 60, base: 118, r: 11, rot: 6, sway: 4 },
  { x: 62, top: 34, base: 120, r: 16, rot: 14, sway: 5 },
  { x: 100, top: 42, base: 118, r: 14, rot: 3, sway: 4 },
  { x: 132, top: 66, base: 122, r: 12, rot: 20, sway: 3 },
];

const EXTRA = [
  { x: 14, top: 74, base: 120, r: 9, rot: 10, sway: 3, color: BLUE, delay: 0 },
  { x: 46, top: 84, base: 121, r: 8, rot: 24, sway: 3, color: PINK, delay: 0.14 },
  { x: 80, top: 70, base: 119, r: 10, rot: 2, sway: 4, color: YELLOW, delay: 0.07 },
  { x: 114, top: 88, base: 120, r: 8, rot: 16, sway: 3, color: BLUE, delay: 0.28 },
  { x: 148, top: 78, base: 121, r: 9, rot: 8, sway: 4, color: PINK, delay: 0.21 },
];

export default function FlowerPatch({ className = "" }) {
  const reduce = useReducedMotion();
  const [bloomed, setBloomed] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onPointerEnter={() => setBloomed(true)}
      onPointerLeave={() => setBloomed(false)}
    >
      <svg
        viewBox="0 0 162 130"
        role="img"
        aria-label="A small patch of daisies"
        className="h-full w-full overflow-visible"
      >
        {BASE.map((f, i) => (
          <Flower key={`b${i}`} {...f} color={INK} />
        ))}

        {/* the colour flowers rise up out of the ground */}
        {EXTRA.map((f, i) => (
          <motion.g
            key={`e${i}`}
            /* growing up out of the ground: the origin sits at the stem base
               so scaleY reads as the stem lengthening, not the whole thing
               sliding. */
            style={{ transformBox: "view-box", transformOrigin: `${f.x}px ${f.base}px` }}
            initial={false}
            animate={
              bloomed
                ? { opacity: 1, y: 0, scaleY: 1 }
                : { opacity: 0, y: 20, scaleY: 0.78 }
            }
            transition={{
              duration: reduce ? 0 : 0.95,
              delay: bloomed && !reduce ? f.delay : 0,
              ease: [0.22, 0.68, 0.24, 1],
              opacity: {
                duration: reduce ? 0 : 0.6,
                delay: bloomed && !reduce ? f.delay + 0.06 : 0,
                ease: "easeOut",
              },
            }}
          >
            <Flower {...f} />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
