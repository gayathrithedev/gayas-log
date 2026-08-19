/* A little hand-drawn meadow. Four flowers are always there; hovering
   grows five more in bright blue, yellow and pink. */

const PETALS = 11;

function Daisy({ cx, cy, r, rot = 0, color }) {
  return (
    <g stroke={color} fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: PETALS }, (_, i) => {
        const a = (360 / PETALS) * i + rot;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy - r * 0.62}
            rx={r * 0.19}
            ry={r * 0.42}
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.2} />
    </g>
  );
}

/* stem: a gently wobbling line from the ground up to the bloom */
function Stem({ x, yTop, yBase, sway = 4, color }) {
  const h = yBase - yTop;
  const d = `M ${x} ${yBase}
             C ${x - sway} ${yBase - h * 0.3}, ${x + sway} ${yBase - h * 0.5}, ${x - sway * 0.4} ${yBase - h * 0.72}
             S ${x} ${yTop + 2}, ${x} ${yTop}`;
  return <path d={d} stroke={color} fill="none" strokeWidth="1" strokeLinecap="round" />;
}

function Flower({ x, top, base, r, rot, sway, color }) {
  return (
    <>
      <Stem x={x} yTop={top + r * 0.9} yBase={base} sway={sway} color={color} />
      <Daisy cx={x} cy={top} r={r} rot={rot} color={color} />
    </>
  );
}

const INK = "#4E4E4B";
const BLUE = "#1D4ED8";
const YELLOW = "#E0A400";
const PINK = "#E0479B";

/* the four that are always visible */
const BASE = [
  { x: 30,  top: 60, base: 118, r: 11, rot: 6,  sway: 4 },
  { x: 62,  top: 34, base: 120, r: 16, rot: 14, sway: 5 },
  { x: 100, top: 42, base: 118, r: 14, rot: 3,  sway: 4 },
  { x: 132, top: 66, base: 122, r: 12, rot: 20, sway: 3 },
];

/* the five that grow in on hover */
const EXTRA = [
  { x: 14,  top: 74, base: 120, r: 9,  rot: 10, sway: 3, color: BLUE,   delay: 0 },
  { x: 46,  top: 84, base: 121, r: 8,  rot: 24, sway: 3, color: PINK,   delay: 90 },
  { x: 80,  top: 70, base: 119, r: 10, rot: 2,  sway: 4, color: YELLOW, delay: 45 },
  { x: 114, top: 88, base: 120, r: 8,  rot: 16, sway: 3, color: BLUE,   delay: 160 },
  { x: 148, top: 78, base: 121, r: 9,  rot: 8,  sway: 4, color: PINK,   delay: 120 },
];

export default function FlowerPatch({ className = "" }) {
  return (
    <svg
      viewBox="0 0 162 130"
      role="img"
      aria-label="A small patch of daisies"
      className={`group overflow-visible ${className}`}
    >
      {BASE.map((f, i) => (
        <Flower key={`b${i}`} {...f} color={INK} />
      ))}

      {EXTRA.map((f, i) => (
        <g
          key={`e${i}`}
          className="origin-bottom opacity-0 [transform:scale(0.4)] [transition:transform_.55s_cubic-bezier(.22,1.4,.36,1),opacity_.35s_ease] group-hover:opacity-100 group-hover:[transform:scale(1)]"
          style={{ transformBox: "view-box", transformOrigin: `${f.x}px ${f.base}px`, transitionDelay: `${f.delay}ms` }}
        >
          <Flower {...f} />
        </g>
      ))}
    </svg>
  );
}
