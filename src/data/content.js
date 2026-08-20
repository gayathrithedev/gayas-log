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

  // The one line under the greeting.
  headline: [
    { text: "An engineer who hears " },
    { text: "\u201cthat\u2019s the hard part\u201d", em: true },
    { text: " and quietly leans in." },
  ],

  portrait: "/portrait.jpg",
  portraitCaption: "Somewhere between a stand-up and a side project.",

  email: "gayathrithedev@gmail.com",
  resume: "/resume.pdf", // TODO: add your resume to /public
};

/* The icon row under the hero line. */
export const contactLinks = [
  { icon: "mail",     label: "Email",    href: "mailto:gayathrithedev@gmail.com" },
  { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/gayathrithedev" },
  { icon: "x",        label: "X",        href: "https://x.com/gayathrithedev" },
];

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
  paragraphs: [
    "I started out because a button wouldn't centre. I stayed because of everything that turned out to be hiding behind that button — state, latency, accessibility, the twelve people who each meant something different by \"simple\".",
    "These days I work on the layer where product decisions become pixels: component libraries teams actually adopt, React Native apps that don't feel like websites in a costume, and the unglamorous performance work that makes all of it feel instant.",
    "Away from the screen I write, review other people's PRs far too enthusiastically, and keep a running list of ideas that will absolutely get built next weekend.",
  ],
};

/* --- WRITING -------------------------------------------------------------- */

export const writing = [
  {
    title: "Breakfast Therapy \ud83e\udd51",
    where: "Substack",
    year: "2026",
    date: "Jan 2026",
    image: "/writing/breakfast-therapy.jpg",
    href: "https://gayathrithedev.substack.com/p/breakfast-therapy",
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
  { label: "Writing", href: "#writing" },
];
