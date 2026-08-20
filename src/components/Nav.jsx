import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";

/* One pill shape for everything in the header: same height, padding, radius
   and border box — only the colours differ. Without the border on every
   variant the outlined ones would sit 2px taller than the filled one. */
const PILL =
  "inline-flex h-8 items-center rounded-full border px-3.5 text-[13px] leading-none transition-colors duration-300";

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className={`transition-colors duration-500 ${solid ? "bg-paper/90 backdrop-blur-md" : "bg-transparent"}`}>
          <div className="shell flex items-center justify-between py-3.5">
            <a href="#top" className="font-display text-lg leading-none tracking-[-0.01em]">
              Gayathri Perumal
            </a>

            <nav aria-label="Sections" className="flex items-center gap-1.5">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className={`${PILL} border-transparent text-ink40 hover:bg-paper2 hover:text-ink`}>
                  {item.label}
                </a>
              ))}

              {profile.resume && (
                <a
                  href={profile.resume}
                  download
                  title="Download my resume"
                  className={`${PILL} group gap-1.5 border-rule text-ink70 hover:border-ink hover:text-ink`}
                >
                  Resume
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  >
                    <path d="M8 2.5v8" />
                    <path d="M4.8 7.6 8 10.8l3.2-3.2" />
                    <path d="M3 13h10" />
                  </svg>
                </a>
              )}

              <a
                href={`mailto:${profile.email}`}
                className={`${PILL} border-ink bg-ink text-paper hover:border-ink70 hover:bg-ink70`}
              >
                Hello
              </a>
            </nav>
          </div>
          <div className={`h-px w-full bg-rule transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`} />
        </div>
      </header>
    </>
  );
}
