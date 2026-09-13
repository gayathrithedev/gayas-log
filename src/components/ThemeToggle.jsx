import { useEffect, useState } from "react";

const THEME_KEY = "gayas-log-theme";

function readTheme() {
  if (typeof document === "undefined") return "light";

  const domTheme = document.documentElement.dataset.theme;
  if (domTheme === "dark" || domTheme === "light") return domTheme;

  try {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
  } catch {
    // Private browsing can deny localStorage; the theme still works per visit.
  }

  return "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    theme === "dark" ? "#121413" : "#FFFFFF"
  );

  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // The preference is still applied for the current visit.
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);
  const dark = theme === "dark";

  useEffect(() => {
    applyTheme(readTheme());
  }, []);

  const toggle = () => {
    const nextTheme = dark ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="group relative inline-flex h-11 w-16 shrink-0 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <span aria-hidden="true" className="absolute inset-x-0 inset-y-1 rounded-full bg-paper2 ring-1 ring-rule transition-shadow duration-300 group-hover:ring-ink/50" />
      <span
        aria-hidden
        className={`absolute left-1 top-2 h-7 w-7 rounded-full bg-paper shadow-[0_1px_4px_rgb(0_0_0_/_0.12)] transition-transform duration-300 ease-out ${dark ? "translate-x-7" : "translate-x-0"}`}
      />

      <span aria-hidden className="absolute left-1 top-2 z-10 grid h-7 w-14 grid-cols-2 place-items-center">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className={`h-4 w-4 transition-colors duration-300 ${dark ? "text-ink40" : "text-ink"}`}
        >
          <circle cx="8" cy="8" r="2.5" />
          <path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M12.6 3.4l-.85.85M4.25 11.75l-.85.85" />
        </svg>

        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className={`h-4 w-4 transition-colors duration-300 ${dark ? "text-ink" : "text-ink40"}`}
        >
          <path d="M13.3 10.6A5.7 5.7 0 0 1 5.4 2.7 5.8 5.8 0 1 0 13.3 10.6Z" />
        </svg>
      </span>
    </button>
  );
}
