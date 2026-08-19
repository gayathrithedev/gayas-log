import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/content";
import { Frame } from "../components/primitives";
import Circled from "../components/Circled";
import { Mug, Braces, Atom, Sticky, Cursor, Spark } from "../components/Doodles";

/* Doodles live in the empty margins beside the column — only where there's room. */
const OBJECTS = [
  { C: Braces, cls: "left-[6%] top-[24%] h-11 w-11 text-ink70",   r: -8,  d: 0,   depth: 30 },
  { C: Mug,    cls: "right-[7%] top-[18%] h-12 w-12 text-ink40",  r: 10,  d: 0.6, depth: -24 },
  { C: Atom,   cls: "right-[9%] top-[58%] h-14 w-14 text-ink70",  r: -6,  d: 1.2, depth: 38 },
  { C: Sticky, cls: "left-[9%] top-[62%] h-11 w-11 text-ink40",   r: 7,   d: 0.9, depth: -18 },
  { C: Cursor, cls: "left-[13%] top-[12%] h-8 w-8 text-ink40",    r: -14, d: 1.6, depth: 20 },
  { C: Spark,  cls: "right-[14%] top-[38%] h-7 w-7 text-ink40",   r: 4,   d: 2.1, depth: -26 },
];

/* Live local time, ticking every second. */
function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: profile.timeZone,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="text-[15px] text-ink40" />;

  return (
    <span className="text-[15px] text-ink40">
      <span className="tabular-nums">{now}</span> IST in {profile.city}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e) =>
      setPointer({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" className="relative pt-24 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        {OBJECTS.map(({ C, cls, r, d, depth }, i) => (
          <motion.div
            key={i}
            className={`absolute ${cls} animate-floaty opacity-40`}
            style={{ "--r": `${r}deg`, animationDelay: `${d}s` }}
            animate={{ x: pointer.x * depth, y: pointer.y * depth }}
            transition={{ type: "spring", stiffness: 40, damping: 18, mass: 1.2 }}
          >
            <C className="h-full w-full" />
          </motion.div>
        ))}
      </div>

      <div className="shell relative">
        {/* portrait — small, framed, slightly tilted */}
        <motion.div {...rise(0)}>
          <div className="inline-block -rotate-2 rounded-[12px] bg-paper p-1.5 shadow-sticker ring-1 ring-rule">
            <Frame
              src={profile.portrait}
              alt={`${profile.name}, portrait`}
              label="photo"
              className="h-[104px] w-[104px] rounded-[8px] grayscale sm:h-[120px] sm:w-[120px]"
            />
          </div>
        </motion.div>

        {/* greeting + local time */}
        <motion.div
          {...rise(0.1)}
          className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
        >
          <p className="font-mono text-[20px] font-medium italic tracking-tight text-inkblue sm:text-[22px]">
            <span className="greeting not-italic">{profile.greeting}</span>
            <span>, </span>
            hello!
          </p>
          <Clock />
        </motion.div>

        {/* intro */}
        <motion.p {...rise(0.24)} className="mt-4 text-pretty text-[17px] leading-[2] text-ink70">
          {profile.headline.map((chunk, i) =>
            chunk.em ? (
              <Circled key={i}>
                <span className="italic text-ink">{chunk.text}</span>
              </Circled>
            ) : (
              <span key={i}>{chunk.text}</span>
            )
          )}
        </motion.p>
      </div>
    </section>
  );
}
