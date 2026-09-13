import { useRef, useState } from "react";
import { life } from "../data/content";
import { Reveal } from "../components/primitives";

// Pair matching shapes; an unpaired photo gets a complete row of its own.
function arrangeRows(photos) {
  const remaining = [...photos];
  const rows = [];
  while (remaining.length) {
    const photo = remaining.shift();
    const row = [photo];
    if (photo.span !== "wide" && photo.span !== "full") {
      const partner = remaining.findIndex((item) => item.span === photo.span);
      if (partner !== -1) row.push(...remaining.splice(partner, 1));
    }
    rows.push(row);
  }
  return rows;
}

const rows = arrangeRows(life.photos);
const pairedAspect = { tall: "aspect-[3/4]", four3: "aspect-[4/3]", sq: "aspect-square" };

export default function Life() {
  const viewer = useRef(null);
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const openPhoto = (photo) => {
    setSelected(photo);
    setZoom(1);
    viewer.current.showModal();
  };
  return (
    <>
    <section id="top" className="shell pb-16 pt-36 sm:pb-20 sm:pt-28">
      <header className="mb-8">
        <h1 className="font-display text-[38px] leading-tight sm:text-[46px]">Out & Networking</h1>
        <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-ink70">{life.note}</p>
      </header>

      <div className="space-y-4 sm:space-y-5">
        {rows.map((row) => (
          <div key={row[0].src} className={`grid gap-3 sm:gap-4 ${row.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {row.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 0.06} className="min-w-0">
                <figure className="flex h-full flex-col">
                  <button type="button" onClick={() => openPhoto(photo)} aria-label={`View ${photo.caption}`} className="group block w-full cursor-zoom-in overflow-hidden rounded-lg shadow-[0_4px_14px_-8px_rgb(0_0_0_/_0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    decoding="async"
                    className={`block w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025] ${row.length === 2 ? pairedAspect[photo.span] || "" : "h-auto"}`}
                  />
                  </button>
                  <figcaption className="px-1 pb-1 pt-2.5 text-center font-sans text-[11px] leading-relaxed text-ink70 sm:text-[12px]">
                    {photo.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </section>
    <dialog ref={viewer} aria-label="Photo viewer" onClose={() => { setSelected(null); setZoom(1); }} className="fixed inset-0 m-auto w-[95vw] max-w-[1100px] rounded-xl border border-rule bg-paper p-3 text-ink shadow-xl backdrop:bg-black/80 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-xl">{selected?.caption}</p>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Zoom out" disabled={zoom === 1} onClick={() => setZoom((value) => Math.max(1, value - 0.5))} className="h-10 w-10 rounded-lg border border-rule disabled:opacity-40">−</button>
          <span className="min-w-12 text-center text-sm" aria-live="polite">{zoom * 100}%</span>
          <button type="button" aria-label="Zoom in" disabled={zoom === 3} onClick={() => setZoom((value) => Math.min(3, value + 0.5))} className="h-10 w-10 rounded-lg border border-rule disabled:opacity-40">+</button>
          <button type="button" onClick={() => viewer.current.close()} className="h-10 rounded-lg border border-rule px-3">Close</button>
        </div>
      </div>
      <div className="max-h-[70dvh] overflow-auto rounded-lg bg-paper2">
        {selected && <img src={selected.src} alt={selected.caption} className="block max-w-none object-contain" style={{ width: `${zoom * 100}%`, height: `${zoom * 65}dvh`, objectPosition: zoom > 1 ? "left top" : "center" }} />}
      </div>
    </dialog>
    </>
  );
}
