import { profile, socials } from "../data/content";
import { Reveal } from "../components/primitives";

export default function Footer() {
  return (
    <footer id="contact" className="bg-paper">
      <div className="shell py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow"><span className="text-ink40/70">03 — </span>Contact</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-4 font-display text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[38px]">
            Got something worth <span className="italic">building</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <a
            href={`mailto:${profile.email}`}
            className="link-swipe mt-6 inline-block font-display text-[22px]"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={0.18}>
          <ul className="mt-10 grid gap-x-8 gap-y-1 border-t border-rule pt-6 sm:grid-cols-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-baseline justify-between gap-4 border-b border-rule py-2.5 transition-colors hover:border-ink"
                >
                  <span className="text-[15px]">{s.label}</span>
                  <span className="font-mono text-[11px] text-ink40 transition-colors group-hover:text-ink">
                    {s.handle} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* a small engineering signature */}
        <Reveal delay={0.24}>
          <div className="mt-20 rounded-[18px] bg-paper2 px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">A note from the desk</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink40">/status: curious</span>
            </div>
            <p className="mt-5 max-w-[22ch] font-display text-[30px] leading-[1.05] tracking-[-0.015em] text-ink sm:text-[34px]">
              Still curious. Still building.
            </p>
            <p className="mt-5 font-mono text-[11px] text-ink40">
              while (curious) build();
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink40 sm:flex-row sm:items-center sm:justify-between">
          <span>{profile.location}</span>
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </div>
      </div>
    </footer>
  );
}
