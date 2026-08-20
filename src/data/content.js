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
    "I'm a software engineer based in Bengaluru, focused on building thoughtful frontend experiences with React and React Native. I enjoy turning product ideas into clear, accessible interfaces that are reliable and easy to use.",
    "My work spans UI engineering, design systems, and mobile development. I care about the details that make a product feel polished: maintainable components, good performance, and close collaboration with designers and engineers.",
    "Outside of work, I write about frontend development, enjoy a good code review, and stay connected to the developer community through meetups and conferences.",
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
  {
    title: "React Native 0.74 — enabling the bridgeless new architecture",
    where: "Hashnode",
    year: "2024",
    date: "May 2024",
    // no cover art, so this one renders as a typographic card
    tags: ["React Native", "New Architecture"],
    href: "https://gayathri.hashnode.dev/react-native-074-enable-bridgeless-new-architecture",
  },
];

/* Shown as the "more posts" arrow beside the section heading. */
export const writingMore = {
  label: "All posts",
  href: "https://gayathri.hashnode.dev",
};




/* --- BEYOND CODE ---------------------------------------------------------- */
/* TODO: drop 5 images into public/life/ and update captions. */

export const life = {
  label: "Community",
  title: "Out in the room",
  note: "Meetups, conferences, and the people who make them.",
  // TODO: the captions are my read of each photo — reword them in your voice.
  photos: [
    { src: "/life/chennai-reactjs.jpg", caption: "Chennai React.js.",              rotate: -2, span: "tall" },
    { src: "/life/meetup-friends.jpg",  caption: "The people you keep running into.", rotate: 2, span: "tall" },
    { src: "/life/women-who-js.jpg",    caption: "Women Who JS.",                  rotate: -1, span: "wide" },
    { src: "/life/team-day.jpg",        caption: "Between sessions.",              rotate: 2,  span: "four3" },
    { src: "/life/off-screen.jpg",      caption: "Away from the screen.",          rotate: -2, span: "tall" },
    { src: "/life/react-stage.jpg",     caption: "Big screen, bigger crowd.",      rotate: 1,  span: "wide" },
    { src: "/life/conference-day.jpg",  caption: "Conference day.",                rotate: -1, span: "wide" },
  ],
};


export const nav = [
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
];
