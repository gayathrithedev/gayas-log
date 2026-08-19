import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { experience } from "../data/content";
import { Reveal, SectionHead } from "../components/primitives";

export default function Experience() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="shell py-24 sm:py-32">
      <SectionHead id="experience" index="03" label="Experience" title="The path here" note="roles, in reverse" />

      <div ref={ref} className="relative mt-14 pl-10 sm:pl-16">
        {/* the thread */}
        <div aria-hidden className="absolute left-[13px] top-2 h-full w-px bg-rule sm:left-[27px]" />
        <motion.div
          aria-hidden
          style={{ height: reduce ? "100%" : height }}
          className="absolute left-[13px] top-2 w-px origin-top bg-ink sm:left-[27px]"
        />

        <ol className="grid gap-12 sm:gap-16">
          {experience.map((job) => (
            <li key={job.company + job.period} className="relative">
              {/* node */}
              <Reveal delay={0.04}>
                <span
                  aria-hidden
                  className="absolute -left-10 top-2 grid h-[27px] w-[27px] place-items-center rounded-full border border-rule bg-paper sm:-left-16"
                >
                  <span className="h-2 w-2 rounded-full bg-ink" />
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-3xl leading-tight tracking-[-0.015em] sm:text-4xl">
                    {job.role}
                  </h3>
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink40">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[13px] text-ink70">{job.company}</p>
                <p className="mt-4 max-w-2xl text-pretty leading-[1.7] text-ink70">{job.note}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <li key={t} className="rounded-full bg-paper2 px-2.5 py-1 font-mono text-[11px] text-ink70">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}

          {/* origin marker */}
          <li className="relative">
            <Reveal>
              <span aria-hidden className="absolute -left-10 top-1.5 grid h-[27px] w-[27px] place-items-center rounded-full border border-dashed border-rule bg-paper sm:-left-16">
                <span className="h-1.5 w-1.5 rounded-full bg-ink40" />
              </span>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink40">
                — where it started
              </p>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}
