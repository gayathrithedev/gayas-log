import { motion } from "motion/react";

/* Hazel — pale ginger tabby, white bib, chin, muzzle and socks,
   amber eyes, pink collar. Drawn from her photos. */

export const COAT = "#F0BC80";
export const COAT_LIGHT = "#F8D8AF";
export const STRIPE = "#D2843F";
export const STRIPE_SOFT = "#E3A462";
export const WHITE = "#FDFAF4";
export const LINE = "#A9713A";
export const NOSE = "#E2919C";
export const EAR_IN = "#EFB9BE";
export const EYE = "#D8A81C";
export const COLLAR = "#E9A6BD";

/* Shared gradients + a soft fur edge. Ids are suffixed so two instances
   on the page don't collide. */
function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`coat-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COAT_LIGHT} />
        <stop offset="55%" stopColor={COAT} />
        <stop offset="100%" stopColor="#E7AC6C" />
      </linearGradient>
      <radialGradient id={`cheek-${id}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={WHITE} />
        <stop offset="100%" stopColor={WHITE} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* ---------------------------------------------------------------- walking */
/* Side profile facing left. Legs are separate groups so they can swing. */
export function HazelWalking({ stride = 0, ...rest }) {
  const swing = (phase) => ({
    rotate: stride === 0 ? 0 : phase,
  });

  return (
    <svg viewBox="0 0 150 100" {...rest}>
      <Defs id="walk" />

      {/* far legs, darker so they sit behind */}
      <g opacity=".72">
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "top center" }}
          animate={swing(-14)}
          transition={{ duration: 0.34, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <path d="M52 62 l-3 22" stroke="#DFA265" strokeWidth="7" strokeLinecap="round" fill="none" />
        </motion.g>
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "top center" }}
          animate={swing(16)}
          transition={{ duration: 0.34, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <path d="M104 60 l4 24" stroke="#DFA265" strokeWidth="8" strokeLinecap="round" fill="none" />
        </motion.g>
      </g>

      {/* tail, up and curved */}
      <path
        d="M116 56 C 132 52, 138 34, 130 24 C 126 19, 119 20, 118 26"
        fill="none"
        stroke={`url(#coat-walk)`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M116 56 C 132 52, 138 34, 130 24 C 126 19, 119 20, 118 26"
        fill="none"
        stroke={LINE}
        strokeWidth=".9"
        strokeLinecap="round"
        opacity=".35"
      />
      {/* tail rings */}
      <g stroke={STRIPE} strokeWidth="2.4" strokeLinecap="round" opacity=".5" fill="none">
        <path d="M124 51 l4 2.5" />
        <path d="M132 41 l4.5 1" />
        <path d="M132 29 l4 -1.5" />
      </g>

      {/* body */}
      <path
        d="M40 62 C 34 50, 40 38, 58 36 C 78 34, 100 36, 110 42 C 118 47, 118 58, 112 64 C 100 70, 56 70, 40 62 Z"
        fill={`url(#coat-walk)`}
        stroke={LINE}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* mackerel stripes down the back */}
      <g stroke={STRIPE} strokeWidth="2.6" strokeLinecap="round" opacity=".45" fill="none">
        <path d="M62 37 q3 6 1.5 11" />
        <path d="M74 36 q3 6 1.5 11" />
        <path d="M86 37 q3 6 1.5 11" />
        <path d="M98 39 q3 5 1.5 10" />
      </g>
      {/* pale belly */}
      <path d="M46 62 C 58 68, 96 68, 110 62 C 98 66, 58 66, 46 62 Z" fill={WHITE} opacity=".9" />

      {/* near legs */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "top center" }}
        animate={swing(16)}
        transition={{ duration: 0.34, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <path d="M48 62 l-2 22" stroke={COAT} strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M46 80 l-1 5" stroke={WHITE} strokeWidth="8" strokeLinecap="round" fill="none" />
      </motion.g>
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "top center" }}
        animate={swing(-15)}
        transition={{ duration: 0.34, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <path d="M100 61 l4 23" stroke={COAT} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M104 80 l1 5" stroke={WHITE} strokeWidth="9" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* head */}
      <g>
        {/* ears */}
        <path d="M30 30 L26 12 L42 21 Z" fill={`url(#coat-walk)`} stroke={LINE} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M50 26 L54 10 L38 18 Z" fill={`url(#coat-walk)`} stroke={LINE} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M31.5 27 L29.5 16.5 L39 22 Z" fill={EAR_IN} opacity=".8" />
        <path d="M48.5 24 L51 15 L41.5 19.5 Z" fill={EAR_IN} opacity=".8" />

        <ellipse cx="40" cy="35" rx="17" ry="14.5" fill={`url(#coat-walk)`} stroke={LINE} strokeWidth="1.2" />
        {/* cheek fluff */}
        <ellipse cx="30" cy="40" rx="10" ry="7" fill={WHITE} opacity=".85" />
        {/* forehead M */}
        <g stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" opacity=".55" fill="none">
          <path d="M40 22 v5" />
          <path d="M35 23 l-1.5 4.5" />
          <path d="M45 23 l1.5 4.5" />
        </g>
        {/* muzzle */}
        <ellipse cx="30" cy="41" rx="9" ry="6" fill={WHITE} />
        <ellipse cx="30" cy="34" rx="3.6" ry="4.2" fill={EYE} />
        <ellipse cx="30" cy="34.2" rx="1.2" ry="3.4" fill="#1F1B16" />
        <circle cx="28.9" cy="32.2" r="1" fill="#fff" />
        <path d="M25 39.5 l-1.8-1.5 h3.6 Z" fill={NOSE} />
        <g stroke={LINE} strokeWidth=".8" strokeLinecap="round" opacity=".5" fill="none">
          <path d="M23 41 L10 39" />
          <path d="M23 43 L10.5 45" />
        </g>
        {/* collar */}
        <path d="M50 44 q4 6 -2 9" stroke={COLLAR} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------------- sleeping */
/* Curled in the bed, facing left. `peek` opens one sleepy eye. */
export function HazelSleeping({ peek = false, earTwitch = false, ...rest }) {
  return (
    <svg viewBox="0 0 140 80" {...rest}>
      <Defs id="sleep" />

      {/* tail wrapped around the front */}
      <path
        d="M96 62 C 116 60, 122 44, 110 38 C 100 33, 88 40, 92 49"
        fill="none"
        stroke={`url(#coat-sleep)`}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M96 62 C 116 60, 122 44, 110 38 C 100 33, 88 40, 92 49"
        fill="none"
        stroke={LINE}
        strokeWidth=".9"
        strokeLinecap="round"
        opacity=".3"
      />
      <g stroke={STRIPE} strokeWidth="2.6" strokeLinecap="round" opacity=".45" fill="none">
        <path d="M106 60 l1 4" />
        <path d="M116 52 l4 1.5" />
        <path d="M114 40 l2.5 -3.5" />
      </g>

      {/* curled back */}
      <path
        d="M20 62 C 12 44, 26 24, 54 24 C 84 24, 104 36, 104 52 C 104 59, 98 63, 88 63 Z"
        fill={`url(#coat-sleep)`}
        stroke={LINE}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* fur tufts along the spine */}
      <path
        d="M30 32 q4 -3 8 -1 q4 -3 9 -1 q5 -3 10 -1 q5 -2 10 0 q6 -1 11 2"
        fill="none"
        stroke={COAT_LIGHT}
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".9"
      />
      {/* mackerel banding */}
      <g stroke={STRIPE} strokeWidth="3" strokeLinecap="round" opacity=".42" fill="none">
        <path d="M46 27 q4 7 2 12" />
        <path d="M60 26 q4 7 2 12" />
        <path d="M74 29 q4 6 2 11" />
        <path d="M87 34 q4 5 2 10" />
      </g>

      {/* head tucked at the left */}
      <ellipse cx="34" cy="50" rx="18" ry="15" fill={`url(#coat-sleep)`} stroke={LINE} strokeWidth="1.2" />
      <motion.path
        d="M20 40 L16 26 L31 34 Z"
        fill={`url(#coat-sleep)`}
        stroke={LINE}
        strokeWidth="1.1"
        strokeLinejoin="round"
        style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
        animate={earTwitch ? { rotate: [0, -13, 4, 0] } : { rotate: 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
      <path d="M46 38 L52 25 L37 31 Z" fill={`url(#coat-sleep)`} stroke={LINE} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M21.6 38 L19 29 L28.5 34 Z" fill={EAR_IN} opacity=".75" />
      <path d="M45.4 36.5 L49.5 28.5 L39.5 32 Z" fill={EAR_IN} opacity=".75" />

      {/* cheek fluff + white muzzle */}
      <ellipse cx="28" cy="56" rx="12" ry="8" fill={WHITE} opacity=".92" />
      <ellipse cx="26" cy="57" rx="9" ry="5.5" fill={WHITE} />
      {/* forehead M */}
      <g stroke={STRIPE} strokeWidth="1.5" strokeLinecap="round" opacity=".5" fill="none">
        <path d="M34 38 v4.5" />
        <path d="M29 39 l-1.4 4" />
        <path d="M39 39 l1.4 4" />
      </g>

      {/* eyes — closed, or one sleepy slit */}
      {peek ? (
        <>
          <ellipse cx="25" cy="49" rx="3" ry="2.1" fill={EYE} />
          <ellipse cx="25" cy="49" rx="1" ry="2" fill="#1F1B16" />
          <path d="M38 49 q3 2.6 6 0" stroke={LINE} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <g stroke={LINE} strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M22 49 q3 2.6 6 0" />
          <path d="M38 49 q3 2.6 6 0" />
        </g>
      )}

      <path d="M26 54.5 l-1.8-1.5 h3.6 Z" fill={NOSE} />
      <path d="M26 54.5 v1.6 M26 56.1 q-2 1.7 -3.6 .2 M26 56.1 q2 1.7 3.6 .2"
            stroke={LINE} strokeWidth=".9" strokeLinecap="round" fill="none" />
      <g stroke={LINE} strokeWidth=".8" strokeLinecap="round" opacity=".45" fill="none">
        <path d="M18 55 L5 53" />
        <path d="M18 57 L5.5 59" />
      </g>

      {/* front paw, white sock, tucked under the chin */}
      <ellipse cx="42" cy="62" rx="9" ry="4.4" fill={WHITE} stroke={LINE} strokeWidth="1" />
      <g stroke={LINE} strokeWidth=".7" opacity=".35" fill="none">
        <path d="M39 60.5 v2.4" />
        <path d="M43 60.2 v2.6" />
      </g>

      {/* collar */}
      <path d="M45 57 q6 5 1 9" stroke={COLLAR} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------- bed */
export function CatBed(props) {
  return (
    <svg viewBox="0 0 170 60" {...props}>
      <defs>
        <linearGradient id="bedRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFDCE0" />
          <stop offset="100%" stopColor="#DCC3C9" />
        </linearGradient>
        <radialGradient id="bedIn" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F7EDEF" />
          <stop offset="100%" stopColor="#E6D2D7" />
        </radialGradient>
      </defs>
      {/* outer cushion */}
      <ellipse cx="85" cy="36" rx="82" ry="22" fill="url(#bedRim)" stroke="#C9AEB5" strokeWidth="1.1" />
      {/* inner dip */}
      <ellipse cx="85" cy="34" rx="64" ry="14" fill="url(#bedIn)" stroke="#CDB4BA" strokeWidth=".9" />
      {/* quilting */}
      <g stroke="#CDB4BA" strokeWidth=".9" opacity=".7" fill="none">
        <path d="M18 33 q6 -7 13 -8" />
        <path d="M152 33 q-6 -7 -13 -8" />
        <path d="M60 51 q10 4 25 4 q15 0 25 -4" />
      </g>
    </svg>
  );
}
