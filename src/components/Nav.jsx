import { nav, profile } from "../data/content";

const NAV_LINK =
  "inline-flex min-h-10 items-center gap-1.5 px-1 text-[13px] leading-none text-ink40 transition-colors duration-300 hover:text-ink";

export default function Nav() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="bg-paper/90 backdrop-blur-md">
          <div className="shell flex items-center justify-between py-3.5">
            <a href="#top" className="font-display text-xl leading-none tracking-[-0.01em] sm:text-2xl">
              Gayathri Perumal
            </a>

            <nav aria-label="Sections" className="flex items-center gap-5">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className={NAV_LINK}>
                  {item.label}
                </a>
              ))}

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
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
