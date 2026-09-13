import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// A brief, decorative visit. Never captures clicks or repeats while reading.
export default function NatureVisitors() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce !== false) return;
    const arrive = window.setTimeout(() => setVisible(true), 10000);
    const leave = window.setTimeout(() => setVisible(false), 26000);
    return () => {
      window.clearTimeout(arrive);
      window.clearTimeout(leave);
    };
  }, [reduce]);

  if (!visible || reduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 text-ink"
        initial={{ opacity: 0 }}
        animate={{
          x: ["-5vw", "12vw", "29vw", "54vw", "80vw", "105vw"],
          y: ["76vh", "64vh", "72vh", "57vh", "66vh", "43vh"],
          rotate: [-15, 12, -8, 15, -12, 8],
          opacity: [0, 0.65, 0.65, 0.65, 0.65, 0],
        }}
        transition={{ duration: 15, ease: "easeInOut" }}
      >
        <svg width="25" height="25" viewBox="0 0 32 32" fill="currentColor">
          <g className="nature-butterfly-wings">
            <path d="M15.5 17C3 1 0 10 6 17c-7 7 3 14 9.5 2Z" />
            <path d="M16.5 17C29 1 32 10 26 17c7 7-3 14-9.5 2Z" />
          </g>
          <path d="M16 13v11m0-11-3-4m3 4 3-4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </motion.div>
      {[{ side: "left-3 bottom-[18%]", delay: 2, rotate: -25 }, { side: "right-3 bottom-[9%]", delay: 6, rotate: 30 }].map((leaf) => (
        <motion.svg
          key={leaf.side}
          className={`absolute h-6 w-6 text-moss ${leaf.side}`}
          viewBox="0 0 32 32"
          initial={{ opacity: 0, y: 10, rotate: leaf.rotate }}
          animate={{ opacity: [0, 0.4, 0.4, 0], y: [10, 0, -4, -12] }}
          transition={{ delay: leaf.delay, duration: 7, ease: "easeInOut" }}
        >
          <path d="M7 25C3 12 13 5 26 5c0 13-7 23-19 20Z" fill="currentColor" fillOpacity=".25" />
          <path d="M5 28 22 10M12 21l-1-7m6 2 6-1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </motion.svg>
      ))}
    </div>
  );
}
