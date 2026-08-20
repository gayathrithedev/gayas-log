import { writing, writingMore } from "../data/content";
import { Reveal, SectionHead, Frame } from "../components/primitives";

function Card({ post }) {
  return (
    <Reveal delay={0.04}>
      <a href={post.href} target="_blank" rel="noreferrer noopener" className="group block">
        {/* the light panel the cover sits inside */}
        <div className="overflow-hidden rounded-2xl bg-paper2 px-5 pb-6 pt-4 sm:px-6">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink40/70">
              {post.where}
            </span>
            {post.year && (
              <span className="font-display text-[24px] leading-none text-ink40/45">{post.year}</span>
            )}
          </div>

          {post.image ? (
            <Frame
              src={post.image}
              alt={post.title}
              label="add cover"
              className="mx-auto aspect-[4/5] w-full max-w-[220px] rounded-lg shadow-card transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            /* no cover photo — set the title instead, so the card still has weight */
            <div className="mx-auto flex aspect-[4/5] w-full max-w-[220px] flex-col justify-between rounded-lg bg-paper p-5 shadow-card transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <p className="font-display text-[26px] leading-[1.12] tracking-[-0.015em] text-ink">
                {post.title}
              </p>
              {post.tags && (
                <ul className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <li key={t} className="rounded-full border border-rule px-2 py-0.5 font-mono text-[10px] text-ink40">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <p className="mt-4 text-[14px] leading-[24px] text-ink">
          {post.title}
          {post.date && <span className="text-ink40">{" · "}{post.date}</span>}
          <span
            aria-hidden
            className="ml-1.5 inline-block text-ink40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
          >
            ↗
          </span>
        </p>
      </a>
    </Reveal>
  );
}

export default function Writing() {
  return (
    <section className="relative">
      <div className="shell relative py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0 flex-1">
            <SectionHead id="writing" index="01" label="Writing" title="Notes & writing" note="Thinking out loud." />
          </div>

          {writingMore && (
            <Reveal delay={0.1}>
              <a
                href={writingMore.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${writingMore.label} — there's more to read`}
                title={writingMore.label}
                className="group mb-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-rule bg-paper text-ink70 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
              >
                <span aria-hidden className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </Reveal>
          )}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-6">
          {writing.map((post) => (
            <Card key={post.title} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
