import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";

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

            <nav aria-label="Sections" className="flex items-center gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-2.5 py-1 text-[13px] text-ink40 transition-colors hover:bg-paper2 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`mailto:${profile.email}`}
                className="ml-1 rounded-full bg-ink px-3 py-1 text-[13px] text-paper transition-colors hover:bg-ink70"
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
