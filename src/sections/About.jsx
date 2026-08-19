import { about, marquee, contactLinks } from "../data/content";
import { Reveal } from "../components/primitives";
import { MailIcon, LinkedInIcon, XIcon } from "../components/SocialIcons";

const ICONS = { mail: MailIcon, linkedin: LinkedInIcon, x: XIcon };

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-24 pb-16 pt-5 sm:pb-20">
      <div>
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <p className={`text-pretty text-[17px] leading-[1.7] text-ink70 ${i ? "mt-5" : ""}`}>
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <ul className="mt-8 flex flex-wrap items-center gap-2.5">
          {contactLinks.map(({ icon, label, href }) => {
            const Icon = ICONS[icon];
            const external = href.startsWith("http");
            return (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="grid h-10 w-10 place-items-center rounded-[10px] bg-paper2 text-ink70 transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            );
          })}
        </ul>
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
