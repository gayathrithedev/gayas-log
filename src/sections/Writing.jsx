import { writing } from "../data/content";
import { Reveal, SectionHead } from "../components/primitives";

export default function Writing() {
  return (
    <section className="shell py-16 sm:py-20">
      <SectionHead id="writing" index="03" label="Writing" title="Notes & writing" note="Thinking out loud." />

      <ul className="mt-8">
        {writing.map((post, i) => (
          <li key={post.title}>
            <Reveal delay={i * 0.05}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group block border-b border-rule py-5 transition-colors hover:border-ink/30"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-ink40">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[21px] leading-snug transition-colors group-hover:text-ink70">
                    {post.title}
                  </h3>
                </div>
                <p className="mt-1 pl-7 font-mono text-[11px] uppercase tracking-[0.16em] text-ink40">
                  {post.where} · {post.date}
                  <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </p>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
