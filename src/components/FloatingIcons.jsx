import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mug, Braces, Atom, Sticky, Cursor, Spark } from "./Doodles";

/* Fixed decorations in the margins either side of the column.
   They stay put while the page scrolls, and pick up their own colour
   on hover. Hover classes are written out in full so Tailwind can
   see them at build time. */
const ITEMS = [
  {
    C: Braces,
    pos: "left-[5%] top-[26%] h-11 w-11",
    hover: "hover:text-[#E0B700]", // JavaScript yellow, darkened to stay legible on white
    r: -8,
    d: 0,
    depth: 26,
  },
  {
    C: Mug,
    pos: "right-[5%] top-[18%] h-12 w-12",
    hover: "hover:text-[#A9714B]", // coffee
    r: 10,
    d: 0.6,
    depth: -20,
  },
  {
    C: Atom,
    pos: "right-[7%] top-[60%] h-14 w-14",
    hover: "hover:text-[#61DAFB]", // React
    r: -6,
    d: 1.2,
    depth: 30,
  },
  {
    C: Sticky,
    pos: "left-[7%] top-[63%] h-11 w-11",
    hover: "hover:text-[#F2C14E]", // post-it
    r: 7,
    d: 0.9,
    depth: -16,
  },
  {
    C: Cursor,
    pos: "left-[11%] top-[12%] h-8 w-8",
    hover: "hover:text-[#4C8DFF]",
    r: -14,
    d: 1.6,
    depth: 18,
  },
  {
    C: Spark,
    pos: "right-[12%] top-[40%] h-8 w-8",
    hover: "hover:text-[#F5A623]", // gold
    r: 4,
    d: 2.1,
    depth: -24,
  },
];

export default function FloatingIcons() {
  const reduce = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e) =>
      setPointer({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden xl:block">
      {ITEMS.map(({ C, pos, hover, r, d, depth }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} animate-floaty`}
          style={{ "--r": `${r}deg`, animationDelay: `${d}s` }}
          animate={{ x: pointer.x * depth, y: pointer.y * depth }}
          transition={{ type: "spring", stiffness: 40, damping: 18, mass: 1.2 }}
        >
          <C
            className={`pointer-events-auto h-full w-full text-ink40/55 transition-[color,transform] duration-500 ease-out hover:scale-125 ${hover}`}
          />
        </motion.div>
      ))}
    </div>
  );
}
