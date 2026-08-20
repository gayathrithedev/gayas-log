# Gayathri Perumal — portfolio

Personal site for **Gayathri Perumal**, senior software engineer in Bengaluru.

Live: https://gayas-log-public.vercel.app

## Stack

React 19 · Vite 7 · Tailwind CSS 3 · Motion (Framer Motion) · self-hosted fonts via Fontsource.

## Editing the site

**Everything you'd want to change lives in one file: [`src/data/content.js`](src/data/content.js).**
Hero copy, posts, socials — all of it. Anything marked `TODO` is a
placeholder waiting for the real thing.

### Images

Drop files in `public/` and point `content.js` at them. The current files are
generated grey placeholders; replacing them is the fastest visual win.

| What | Where | Suggested size |
| --- | --- | --- |
| Portrait | `public/portrait.svg` → swap for `.jpg` | 900 × 1125 |
| Personal photos | `public/life/*.svg` → swap for `.jpg` | ~1200 square-ish |
| Post covers | `public/writing/*.svg` → swap for `.jpg` | 800 × 1000 (4:5) |
| Social preview | `public/og.png` | 1200 × 630 |

Missing images degrade to a labelled grey frame rather than a broken icon, so
partial updates always look intentional.

### The greeting

`profile.greeting` is Tamil (`வணக்கம்`) by default. Change it to whatever you like.
If you switch to Latin text, you can delete the Noto Serif Tamil `<link>` in
`index.html` — the other three faces are bundled locally.

## Design notes

Monochrome on white: ink `#101010`, muted `#4E4E4B`, hairline `#E7E7E3`. No accent
colour — emphasis comes from scale, italics and whitespace. Type is Instrument
Serif for display, Instrument Sans for body, JetBrains Mono for labels. Sections
carry a numbered label. Motion is scroll-triggered and respects
`prefers-reduced-motion`.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
npm run lint
```
