/* ---------------------------------------------------------------------------
   Gayathri Perumal — CONTENT
   This is the only file you need to touch to update the site.
   Anything marked TODO is a placeholder — swap it for the real thing.
--------------------------------------------------------------------------- */

export const profile = {
  // Change this greeting to whatever feels like home (नमस्ते / வணக்கம் / ನಮಸ್ಕಾರ / hey)
  greeting: "வணக்கம்",
  greetingRoman: "vanakkam",
  name: "Gayathri Perumal",
  shortName: "Gaya",
  role: "Senior Software Engineer",
  location: "Bengaluru, India",
  city: "Bengaluru",
  timeZone: "Asia/Kolkata",
  available: true,
  availableNote: "Open to work",

  // Hero headline — keep it two or three lines, it's set in big serif.
  headline: [
    { text: "I build interfaces that " },
    { text: "feel obvious", em: true },
    { text: " — and hold up at 2am on a bad network." },
  ],

  blurb:
    "Nine-ish years of shipping React, React Native and TypeScript for teams that care about the last 5%. I like design systems that survive contact with real deadlines, animations that explain rather than decorate, and bundles that stay small.",

  // TODO: drop your photo at public/portrait.jpg (roughly 900×1100)
  portrait: "/portrait.svg",
  portraitCaption: "Somewhere between a stand-up and a side project.",

  email: "gayathrithedev@gmail.com",
  resume: "/resume.pdf", // TODO: add your resume to /public
};

export const socials = [
  { label: "GitHub",   handle: "gayathrithedev", href: "https://github.com/gayathrithedev" },
  { label: "LinkedIn", handle: "in/gayathrithedev", href: "https://linkedin.com/in/gayathrithedev" },
  { label: "X",        handle: "@gayathrithedev", href: "https://x.com/gayathrithedev" },
  { label: "Hashnode", handle: "@gayathrithedev", href: "https://hashnode.com/@gayathrithedev" },
];

export const marquee = [
  "React", "React Native", "TypeScript", "Next.js", "Design systems",
  "GraphQL", "Gatsby", "Electron", "Jest", "Firebase", "Framer Motion",
  "Accessibility", "Performance", "Open source",
];

/* --- ABOUT ---------------------------------------------------------------- */

export const about = {
  label: "About",
  title: "A short introduction",
  paragraphs: [
    "I started out because a button wouldn't centre. I stayed because of everything that turned out to be hiding behind that button — state, latency, accessibility, the twelve people who each meant something different by \"simple\".",
    "These days I work on the layer where product decisions become pixels: component libraries teams actually adopt, React Native apps that don't feel like websites in a costume, and the unglamorous performance work that makes all of it feel instant.",
    "Away from the screen I write, review other people's PRs far too enthusiastically, and keep a running list of ideas that will absolutely get built next weekend.",
  ],
  // Small facts rendered as chips
  facts: ["Bengaluru", "Design systems", "React Native", "Open source", "Filter coffee"],
};

/* --- WORK ----------------------------------------------------------------- */

export const projects = [
  {
    n: "01",
    title: "react-native-chip-input",
    kind: "Open source · Library",
    year: "2021 →",
    summary:
      "A material-design chip input for React Native — tokenised entry, keyboard-aware layout and a theming API small enough to remember. Published to npm and used in production apps beyond my own.",
    contribution: "Design, API surface, docs, releases",
    stack: ["React Native", "JavaScript", "npm"],
    href: "https://github.com/gayathrithedev/react-native-chip-input",
    accent: "flame",
    // TODO: add an image at public/work/chip-input.svg
    image: "/work/chip-input.svg",
  },
  {
    n: "02",
    title: "Blog-post",
    kind: "Side project · Web app",
    year: "2020",
    summary:
      "A full CRUD blogging app on React and Firebase — auth, rich text, optimistic updates. Built to understand where the real complexity in \"just a blog\" actually lives.",
    contribution: "End-to-end build",
    stack: ["React", "Firebase", "CSS"],
    href: "https://github.com/gayathrithedev/Blog-post",
    accent: "moss",
    image: "/work/blog-post.svg",
  },
  {
    n: "03",
    title: "Auto-SMS",
    kind: "Side project · Mobile",
    year: "2019",
    summary:
      "Schedule an SMS, forget about it, look thoughtful later. A small utility app that taught me more about Android permissions than I ever planned to know.",
    contribution: "End-to-end build",
    stack: ["React Native", "Android"],
    href: "https://github.com/gayathrithedev/Auto-SMS",
    accent: "ochre",
    image: "/work/auto-sms.svg",
  },
  {
    n: "04",
    title: "Your best case study",
    kind: "TODO · Replace me",
    year: "2024",
    summary:
      "Swap this card for the work you're proudest of: the problem, what you changed, and the number that moved. Two sentences beat two paragraphs.",
    contribution: "Your role here",
    stack: ["Add", "your", "stack"],
    href: "#",
    accent: "flame",
    image: "/work/placeholder.svg",
  },
];

/* --- WRITING -------------------------------------------------------------- */
/* TODO: point these at your actual Hashnode posts. */

export const writing = [
  {
    title: "Making React Native lists that don't drop frames",
    where: "Hashnode",
    date: "TODO",
    href: "https://hashnode.com/@gayathrithedev",
  },
  {
    title: "A component API is a promise you have to keep",
    where: "Hashnode",
    date: "TODO",
    href: "https://hashnode.com/@gayathrithedev",
  },
  {
    title: "Small bundles, boring wins",
    where: "Hashnode",
    date: "TODO",
    href: "https://hashnode.com/@gayathrithedev",
  },
];

/* --- BEYOND CODE ---------------------------------------------------------- */
/* TODO: drop 5 images into public/life/ and update captions. */

export const life = {
  label: "Beyond work",
  title: "Outside the editor",
  note: "The parts that don't fit in a commit message.",
  photos: [
    { src: "/life/one.svg",   caption: "Coffee, first. Always.",        rotate: -3, span: "tall" },
    { src: "/life/two.svg",   caption: "Weekend hills.",                rotate: 2,  span: "wide" },
    { src: "/life/three.svg", caption: "Notebook > Notion, sometimes.", rotate: -2, span: "sq" },
    { src: "/life/four.svg",  caption: "Home, in festival lights.",     rotate: 3,  span: "sq" },
    { src: "/life/five.svg",  caption: "The 2am build that worked.",    rotate: -1, span: "full" },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
];
