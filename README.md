# Gayathri Perumal — portfolio

Personal site for **Gayathri Perumal**, senior software engineer in Bengaluru.

Live: https://www.gayathriperumal.in

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

## Focus

`/focus.html` has three centred, keyboard-accessible tabs: Pomodoro, Focus music,
and Surprise. It keeps the portfolio's monochrome light/dark themes and has its
own entry point, without loading the portfolio galleries or animation libraries.

The timer uses a wall-clock deadline to recover correctly after tab throttling
or refresh. Its session and optional intention are stored in sessionStorage
for that tab; no server receives them. Switching tabs preserves the running timer.
Themes are local to each origin.

Music has a player, playback animation, seeking, volume, repeat and track switching.
The playlist is deliberately empty until Gayathri supplies the tracks and research
references. Add those to `src/focus/content.js`; no scientific claims are invented.
Music does not autoplay. Playback can continue while another tool is selected.

Surprise opens a golden gift with an emerging scratch-off reward and colourful confetti,
with Gayathri's Topmate link directly below the coupon inside the card, followed by a random motivational message. Clearing 35% of the coating
reveals `HAZEL` for 100% off every booking, as provided by Gayathri. A keyboard
reveal button and copy-code button are included. This UI displays the offer;
it does not create or change the coupon in Topmate. All motion respects reduced
motion preferences. Gift assets load only when the Surprise experience needs them.

Run `node --test src/focus/timer.test.js` for timing and recovery checks.

### Dedicated subdomain

Run `npm run build:focus` and deploy the `dist-focus` directory as a static site
at `focus.gayathriperumal.in`. Its root `index.html`, fonts, favicon, and gift
images are included. Add that domain in the hosting provider and follow its DNS
and HTTPS configuration instructions. This does not replace the portfolio build.

Once the subdomain is live, set `VITE_FOCUS_ORIGIN=https://focus.gayathriperumal.in/`
when building the main portfolio with `npm run build`. Until then, the navigation
and homepage introduction use `/focus.html`, so they do not point to an
unconfigured subdomain. No hosting or DNS changes are made by either build.
