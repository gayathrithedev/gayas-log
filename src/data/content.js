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
    { text: "When someone says " },
    { text: "\u201cthat\u2019s hard to build\u201d", em: true },
    { text: ", it makes me want to try." },
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
  "JavaScript", "TypeScript", "React", "React Native", "Expo", "Next.js",
  "Redux", "Redux Toolkit", "React Query", "Java", "Spring Boot", "DevOps",
  "Playwright", "Maestro", "AI-Assisted development",
];

/* --- ABOUT ---------------------------------------------------------------- */

export const about = {
  paragraphs: [
    "Hi, I'm Gayathri Perumal, a senior software engineer living in Bengaluru. I've spent over seven years in tech, working with product companies. I started with frontend development and have worked with React and React Native for over six years. Recently, I've been working on the backend too, so I now call myself a full-stack engineer.",
    "Outside of work, I enjoy going to conferences, tech events, and community meetups to meet fellow techies. I also mentor college students, freshers, and people navigating challenges in the tech industry. Supporting and encouraging women in tech matters a lot to me.",
    "I tweet a lot and spend a good chunk of my time on X. I love a good coffee and a peaceful walk around Agara Lake or one of Bengaluru's beautiful parks. I also enjoy making salad bowls and smoothie bowls. I like eating healthy, and making a good bowl is something I look forward to.",
  ],
};

/* --- WRITING -------------------------------------------------------------- */

export const writing = [
  {
    title: "React Native 0.74 — enabling the bridgeless new architecture",
    where: "Hashnode",
    year: "2024",
    date: "May 2024",
    // no cover art, so this one renders as a typographic card
    tags: ["React Native", "New Architecture"],
    href: "https://gayathri.hashnode.dev/react-native-074-enable-bridgeless-new-architecture",
  },
  {
    title: "Breakfast Therapy \ud83e\udd51",
    where: "Substack",
    year: "2026",
    date: "Jan 2026",
    image: "/writing/breakfast-therapy.jpg",
    href: "https://gayathrithedev.substack.com/p/breakfast-therapy",
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
    { src: "/life/meetup-friends.jpg",  caption: "Techroast Show — 1st Bangalore Show", rotate: 2, span: "tall" },
    { src: "/life/women-who-js.jpg",    caption: "Women Who JS.",                  rotate: -1, span: "wide" },
    { src: "/life/team-day.jpg",        caption: "Between sessions.",              rotate: 2,  span: "four3" },
    { src: "/life/off-screen.jpg",      caption: "Away from the screen.",          rotate: -2, span: "tall" },
    { src: "/life/react-stage.jpg",     caption: "React India 2025",               rotate: 1,  span: "wide" },
    { src: "/life/conference-day.jpg",  caption: "CTO Talk, MakeMyTrip",            rotate: -1, span: "wide" },
    { src: "/life/react-india-2024.png", caption: "React India 2024",               rotate: 2,  span: "four3" },
    { src: "/life/memory-labs.png",      caption: "Memory Labs",                    rotate: -1, span: "wide" },
    { src: "/life/she-builds.png",       caption: "She Builds",                     rotate: 1,  span: "wide" },
    { src: "/life/maersk-code-and-cargo.png", caption: "Maersk Code and Cargo",        rotate: -2, span: "tall" },
    { src: "/life/chennai-react-group.png", caption: "Chennai React",                rotate: 1,  span: "full" },
  ],
};


export const nav = [
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
];
