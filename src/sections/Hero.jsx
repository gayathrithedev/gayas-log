import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/content";
import Circled from "../components/Circled";
import NatureVisitors from "../components/NatureVisitors";


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
    <section id="top" className="relative pt-36 sm:pt-28">
      <div className="shell relative">
        {/* A little scrapbook keepsake from Women Who JS. */}
        <motion.div {...rise(0)}>
          <a
            href="/networking.html"
            aria-label="Women Who JS — explore Out & Networking"
            className="group relative ml-1 block w-[min(300px,calc(100%-16px))] rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink"
          >
          <figure className="relative -rotate-2 rounded-md bg-paper2 p-2 pb-3 shadow-[0_8px_16px_-12px_rgb(0_0_0_/_0.3)] transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-0">
            <span
              aria-hidden="true"
              className="absolute -top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[-5deg] bg-rule/80 shadow-sticker"
              style={{ clipPath: "polygon(2% 0, 98% 3%, 100% 15%, 98% 28%, 100% 42%, 98% 58%, 100% 74%, 98% 100%, 1% 97%, 3% 81%, 0 67%, 2% 51%, 0 35%, 3% 19%)", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 3px, rgb(255 255 255 / 0.18) 3px 4px)" }}
            />
            <img
              src="/life/women-who-js.jpg"
              alt="Gayathri on stage with fellow panelists at Women Who JS"
              width="1500"
              height="844"
              fetchPriority="high"
              className="aspect-[1500/844] w-full rounded-[3px] object-contain"
            />
            <figcaption className="mt-2 flex items-center justify-between gap-3 px-1.5 text-ink70">
              <span>
                <span className="block font-display text-[22px] leading-tight">Women Who JS</span>
                <span className="mt-1 block text-[10px] tracking-wide text-ink70">Out & Networking <span aria-hidden="true">↗</span></span>
              </span>
              <span aria-hidden="true" className="rotate-12 font-display text-[24px] text-ink70">♡</span>
            </figcaption>
          </figure>
          </a>
        </motion.div>

        {/* greeting + local time */}
        <motion.div
          {...rise(0.1)}
          className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
        >
          <p className="font-mono text-[20px] font-medium italic tracking-tight text-ink sm:text-[22px]">
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
      <NatureVisitors />
    </section>
  );
}
