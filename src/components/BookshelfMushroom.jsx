import { useState } from "react";
import { useReducedMotion } from "motion/react";

export default function BookshelfMushroom({ still }) {
  const [mood, setMood] = useState("idle");
  const reduce = useReducedMotion();
  const smiling = mood === "smiling";

  return <button
    type="button"
    className={`shelf-toy mushroom mushroom-${mood}`}
    aria-label="Make the little mushroom dance"
    onClick={() => setMood(still || reduce ? "smiling" : "dancing")}
  >
    <svg
      className="mushroom-character"
      viewBox="0 0 90 100" fill="none" aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.animationName === "mushroom-dance") setMood("smiling");
      }}
    >
      <path d="M33 43 27 87Q45 97 63 87L57 43" fill="#e9dcc0" stroke="#b7a484" strokeWidth="1.5" />
      <path d="M8 47C8 28 29 8 45 8S82 28 82 47C67 56 23 56 8 47Z" fill="#b96e50" />
      <ellipse cx="31" cy="28" rx="7" ry="5" fill="#f6e5ce" />
      <ellipse cx="61" cy="35" rx="6" ry="4" fill="#f6e5ce" />
      <ellipse cx="39" cy="45" rx="5" ry="3" fill="#f6e5ce" />
      {smiling ? <>
        <ellipse cx="33" cy="78" rx="4" ry="2.5" fill="#d89481" fillOpacity=".65" />
        <ellipse cx="57" cy="78" rx="4" ry="2.5" fill="#d89481" fillOpacity=".65" />
        <path d="M36 74q3-5 6 0m6 0q3-5 6 0" stroke="#655344" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 79q5 12 10 0Z" fill="#825747" />
      </> : <path d="M39 71v3m12-3v3m-10 6q4 4 8 0" stroke="#655344" strokeWidth="2" strokeLinecap="round" />}
    </svg>
    <span className="sr-only" role="status">{smiling ? "The little mushroom smiles!" : ""}</span>
  </button>;
}
