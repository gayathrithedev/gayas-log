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
      className="group relative inline-flex h-8 w-[52px] shrink-0 items-center rounded-full bg-paper2 p-1 ring-1 ring-rule transition-colors duration-300 hover:ring-ink40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <span
        aria-hidden
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-paper shadow-sticker transition-transform duration-300 ease-out ${dark ? "translate-x-5" : "translate-x-0"}`}
      />

      <span aria-hidden className="relative z-10 flex w-full items-center justify-between px-0.5">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className={`h-3.5 w-3.5 transition-colors duration-300 ${dark ? "text-ink40" : "text-ink"}`}
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
          className={`h-3.5 w-3.5 transition-colors duration-300 ${dark ? "text-ink" : "text-ink40"}`}
        >
          <path d="M13.3 10.6A5.7 5.7 0 0 1 5.4 2.7 5.8 5.8 0 1 0 13.3 10.6Z" />
        </svg>
      </span>
    </button>
  );
}
