import { about, marquee } from "../data/content";
import { Reveal, SectionHead, Sticker } from "../components/primitives";

export default function About() {
  return (
    <section className="shell py-16 sm:py-20">
      <SectionHead id="about" index="01" label={about.label} title={about.title} />

      <div className="mt-8">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <p className={`text-pretty text-[17px] leading-[1.7] text-ink70 ${i ? "mt-5" : ""}`}>
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.18}>
        <div className="mt-8 flex flex-wrap gap-2">
          {about.facts.map((f, i) => (
            <Sticker key={f} rotate={i % 2 ? 1.5 : -1.5} tone="paper2">{f}</Sticker>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-10 border-t border-rule pt-5">
          <p className="eyebrow">Tools of the trade</p>
          <p className="mt-2.5 font-mono text-[12px] leading-[2] text-ink70">
            {marquee.join("  ·  ")}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
