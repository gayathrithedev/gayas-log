import { useEffect, useRef, useState } from "react";
import { nav, profile } from "../data/content";
import ThemeToggle from "./ThemeToggle";

const NAV_LINK =
  "inline-flex min-h-10 items-center gap-1.5 px-1 text-[13px] leading-none text-ink40 transition-colors duration-300 hover:text-ink";

export default function Nav({ networking = false, books = false }) {
  const header = useRef(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (networking || books) return;
    let frame;
    const update = () => {
      const threshold = Math.max((header.current?.getBoundingClientRect().bottom || 80) + 48, window.innerHeight * 0.4);
      let current = "";
      for (const id of ["about", "contact"]) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= threshold) current = `#${id}`;
      }
      setActive(current);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [networking, books]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header ref={header} className="fixed inset-x-0 top-0 z-50">
        <div className="bg-paper/90 backdrop-blur-md">
          <div className="shell flex flex-wrap items-center justify-between gap-y-2 py-3.5">
            <a href="/#top" className="font-display text-xl leading-none tracking-[-0.01em] sm:text-2xl">
              Gayathri Perumal
            </a>

            <nav aria-label="Main navigation" className="flex w-full flex-wrap items-center justify-between gap-1 sm:w-auto sm:gap-3">
              {nav.map((item) => (
                <a key={item.href} href={(networking || books) && item.href.startsWith("#") ? `/${item.href}` : item.href} aria-current={books && item.href === "/books.html" ? "page" : !networking && !books && active === item.href ? "location" : undefined} className={`${NAV_LINK} ${((books && item.href === "/books.html") || (!networking && !books && active === item.href)) ? "!text-ink underline decoration-1 underline-offset-[6px]" : ""}`}>
                  {item.label}
                </a>
              ))}

              <a href="/networking.html" aria-current={networking ? "page" : undefined} className={`${NAV_LINK} ${networking ? "!text-ink" : ""}`}>
                Out & Networking
              </a>

              {profile.resume && (
                <a
                  href={profile.resume}
                  download="Gayathri-Perumal-Resume.pdf"
                  title="Download my resume"
                  className={`${NAV_LINK} group`}
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

              <div className="absolute right-5 top-3.5 sm:static">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
