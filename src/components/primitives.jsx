import { motion, useReducedMotion } from "motion/react";

/* Scroll-in reveal. Wraps anything, staggers via `delay`. */
export function Reveal({ children, delay = 0, y = 22, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* Section heading: small label above a modest serif title. */
export function SectionHead({ label, index, title, note, id }) {
  return (
    <header id={id} className="scroll-mt-24">
      <Reveal>
        <span className="eyebrow">
          {index && <span className="text-ink40/70">{index} — </span>}
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-[30px] leading-[1.1] tracking-[-0.015em] sm:text-[34px]">
          {title}
        </h2>
      </Reveal>
      {note && (
        <Reveal delay={0.08}>
          <p className="mt-2 text-[15px] text-ink40">{note}</p>
        </Reveal>
      )}
    </header>
  );
}

/* Little tilted chip that looks stuck on with tape. */
export function Sticker({ children, rotate = -2, tone = "paper2", className = "" }) {
  const tones = {
    paper2: "bg-paper2 text-ink70 border-rule",
    flame: "bg-paper text-ink border-ink/20",
    moss: "bg-paper2 text-ink70 border-rule",
    ochre: "bg-paper text-ink70 border-rule",
  };
  return (
    <span
      style={{ rotate: `${rotate}deg` }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-tight shadow-sticker ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* Underlined text link with the swipe effect. */
export function SwipeLink({ href, children, className = "", ...rest }) {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={`link-swipe ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/* Primary pill button, ink-on-cream with a hard offset shadow. */
export function Button({ href, children, tone = "ink", className = "", ...rest }) {
  const tones = {
    ink: "bg-ink text-paper hover:bg-ink70",
    ghost: "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-paper2",
  };
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${tones[tone]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

/* Image that degrades to a labelled placeholder if the file isn't there yet. */
export function Frame({ src, alt, className = "", label = "add image" }) {
  return (
    <div className={`relative overflow-hidden bg-paper2 ${className}`}>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink40">{label}</span>
      </div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="relative h-full w-full object-cover"
        onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
      />
    </div>
  );
}
