import { about, marquee } from "../data/content";
import { Reveal } from "../components/primitives";

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-24 pb-16 pt-5 sm:pb-20">
      <div>
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <p className={`text-pretty text-[15px] leading-[26px] text-ink70 ${i ? "mt-5" : ""}`}>
              {p}
            </p>
          </Reveal>
        ))}
      </div>

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
