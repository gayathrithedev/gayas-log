import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { subscribeCatCursor } from "../lib/catCursorStore";

/* A small cat that trails the pointer, leaning into the direction of travel.
   Desktop + fine pointers only; sits out entirely for reduced-motion. */
export default function CatCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // springs lag behind the pointer, then settle
  const sx = useSpring(x, { stiffness: 190, damping: 20, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 160, damping: 18, mass: 0.9 });

  // tilt from how far the cat is currently behind
  const tilt = useTransform(sx, (v) => Math.max(-16, Math.min(16, (x.get() - v) * 0.12)));

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024;
    if (!fine) return;

    // show the cat on the first real pointer move, not at mount — otherwise
    // it pops in at a stale position before the pointer is anywhere.
    const onMove = (e) => {
      x.set(e.clientX + 18);
      y.set(e.clientY + 22);
      setEnabled(true);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  // the meadow has its own cat — step aside while the pointer is over it
  useEffect(() => subscribeCatCursor(setHidden), []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] h-11 w-11 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ x: sx, y: sy, rotate: tilt, opacity: hidden ? 0 : 1, transition: "opacity .25s ease" }}
    >
      <Cat className="h-full w-full drop-shadow-[0_4px_10px_rgba(16,16,16,0.18)]" />
    </motion.div>
  );
}

/* Hazel — ginger tabby, drawn rather than borrowed. */
function Cat({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id="catFur" cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#F6C68C" />
          <stop offset="100%" stopColor="#E0A055" />
        </radialGradient>
      </defs>

      {/* ears */}
      <path d="M13 22 L11.5 6 L26 15 Z" fill="url(#catFur)" stroke="#A9713A" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M51 22 L52.5 6 L38 15 Z" fill="url(#catFur)" stroke="#A9713A" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M15.6 19 L14.8 11.4 L22.2 16 Z" fill="#EFB6BC" />
      <path d="M48.4 19 L49.2 11.4 L41.8 16 Z" fill="#EFB6BC" />

      {/* head */}
      <ellipse cx="32" cy="34" rx="23" ry="20.5" fill="url(#catFur)" stroke="#A9713A" strokeWidth="1.4" />

      {/* forehead stripes */}
      <g stroke="#D2803C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".7">
        <path d="M32 16.8 v5.6" />
        <path d="M25.5 18.4 l-1.4 5" />
        <path d="M38.5 18.4 l1.4 5" />
      </g>

      {/* eyes */}
      <ellipse cx="23" cy="33" rx="5.2" ry="6" fill="#FCF7EF" />
      <ellipse cx="41" cy="33" rx="5.2" ry="6" fill="#FCF7EF" />
      <ellipse cx="23.4" cy="33.4" rx="3.5" ry="4.6" fill="#D4A017" />
      <ellipse cx="40.6" cy="33.4" rx="3.5" ry="4.6" fill="#D4A017" />
      <ellipse cx="23.4" cy="33.6" rx="1.5" ry="4.2" fill="#241F1A" />
      <ellipse cx="40.6" cy="33.6" rx="1.5" ry="4.2" fill="#241F1A" />
      <circle cx="21.6" cy="30.8" r="1.25" fill="#fff" />
      <circle cx="38.8" cy="30.8" r="1.25" fill="#fff" />

      {/* white muzzle + chin */}
      <ellipse cx="32" cy="41" rx="13" ry="8" fill="#FCF7EF" />
      <path d="M32 40.8 l-2.6-2.3 h5.2 Z" fill="#E89AA4" />
      <path d="M32 40.8 v2" stroke="#A9713A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M32 42.8 q-3.2 2.6 -5.4 .2 M32 42.8 q3.2 2.6 5.4 .2"
            stroke="#A9713A" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* whiskers */}
      <g stroke="#D2803C" strokeWidth="1" strokeLinecap="round" opacity=".8" fill="none">
        <path d="M20 41 L6 38.5" />
        <path d="M20 43.5 L6.5 44.6" />
        <path d="M44 41 L58 38.5" />
        <path d="M44 43.5 L57.5 44.6" />
      </g>
    </svg>
  );
}
