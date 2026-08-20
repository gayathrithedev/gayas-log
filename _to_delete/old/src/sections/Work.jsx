import { projects } from "../data/content";
import { Reveal, SectionHead, Frame } from "../components/primitives";

function Card({ p }) {
  return (
    <Reveal delay={0.04}>
      <article className="group border-t border-rule pt-7">
        <a
          href={p.href}
          target="_blank"
          rel="noreferrer noopener"
          className="block overflow-hidden rounded-xl border border-rule"
        >
          <Frame
            src={p.image}
            alt={`${p.title} preview`}
            label={p.title}
            className="aspect-[16/10] w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </a>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-mono text-[11px] text-ink40">{p.n}</span>
          <h3 className="font-display text-[26px] leading-tight tracking-[-0.015em]">
            <a href={p.href} target="_blank" rel="noreferrer noopener" className="link-swipe">
              {p.title}
            </a>
          </h3>
        </div>

        <p className="mt-1.5 pl-7 font-mono text-[11px] uppercase tracking-[0.16em] text-ink40">
          {p.kind} · {p.year}
        </p>

        <p className="mt-3.5 pl-7 text-pretty text-[16px] leading-[1.7] text-ink70">{p.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 pl-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink40">
            {p.contribution}
          </span>
          <span aria-hidden className="text-rule">|</span>
          <ul className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full border border-rule px-2 py-0.5 font-mono text-[11px] text-ink70">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section className="shell py-16 sm:py-20">
      <SectionHead id="work" index="01" label="Work" title="Selected work" note="Things that shipped." />
      <div className="mt-10 grid gap-12">
        {projects.map((p) => <Card key={p.title} p={p} />)}
      </div>

      <Reveal delay={0.08}>
        <p className="mt-10 border-t border-rule pt-5 font-mono text-[12px] text-ink40">
          More in the wild →{" "}
          <a
            href="https://github.com/gayathrithedev?tab=repositories"
            target="_blank"
            rel="noreferrer noopener"
            className="link-swipe text-ink70"
          >
            github.com/gayathrithedev
          </a>
        </p>
      </Reveal>
    </section>
  );
}
