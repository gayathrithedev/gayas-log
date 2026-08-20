import { writing } from "../data/content";
import { Reveal, SectionHead, Frame } from "../components/primitives";

function Card({ post }) {
  return (
    <Reveal delay={0.04}>
      <a
        href={post.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
      >
        {/* the light panel the image sits inside */}
        <div className="overflow-hidden rounded-2xl bg-paper2 px-5 pb-6 pt-4 sm:px-6">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink40/70">
              {post.where}
            </span>
            {post.year && (
              <span className="font-display text-[24px] leading-none text-ink40/45">{post.year}</span>
            )}
          </div>
          <Frame
            src={post.image}
            alt={post.title}
            label="add cover"
            className="mx-auto aspect-[4/5] w-full max-w-[220px] rounded-lg shadow-card transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <p className="mt-4 text-[17px] leading-[1.55] text-ink">
          {post.title}
          {post.date && <span className="text-ink40">{" · "}{post.date}</span>}
          <span aria-hidden className="ml-1.5 inline-block text-ink40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
            ↗
          </span>
        </p>
      </a>
    </Reveal>
  );
}

export default function Writing() {
  return (
    <section className="relative border-t border-rule">
      <div className="shell relative py-16 sm:py-20">
        <SectionHead id="writing" index="01" label="Writing" title="Notes & writing" note="Thinking out loud." />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-6">
          {writing.map((post) => (
            <Card key={post.title} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
