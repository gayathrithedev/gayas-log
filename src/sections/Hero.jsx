import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/content";
import { Frame } from "../components/primitives";
import Circled from "../components/Circled";


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
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" className="relative pt-24 sm:pt-28">
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
          <p className="font-display text-[28px] font-medium leading-none text-inkblue sm:text-[30px]">
            <span className="greeting text-[18px] sm:text-[20px]">{profile.greeting}</span>
            <span>, </span>
            hello!
          </p>
          <Clock />
        </motion.div>

        {/* intro */}
        <motion.p {...rise(0.24)} className="mt-4 text-pretty text-[15px] leading-[26px] text-ink70">
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
