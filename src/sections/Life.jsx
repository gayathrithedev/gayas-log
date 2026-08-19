import { life } from "../data/content";
import { Reveal, SectionHead, Frame } from "../components/primitives";

const SPAN = {
  tall: "col-span-1 aspect-[3/4]",
  wide: "col-span-2 aspect-[16/10]",
  sq:   "col-span-1 aspect-square",
  full: "col-span-2 aspect-[2/1]",
};

export default function Life() {
  return (
    <section className="shell py-16 sm:py-20">
      <SectionHead index="03" label={life.label} title={life.title} note={life.note} />

      <div className="mt-8 grid grid-cols-2 gap-4">
        {life.photos.map((photo, i) => (
          <Reveal key={photo.src} delay={i * 0.06} className={SPAN[photo.span]}>
            <figure
              style={{ rotate: `${photo.rotate}deg` }}
              className="h-full bg-paper p-2 shadow-card transition-transform duration-500 ease-out hover:!rotate-0"
            >
              <Frame
                src={photo.src}
                alt={photo.caption}
                label="photo"
                className="h-[calc(100%-1.6rem)] w-full"
              />
              <figcaption className="pt-1.5 text-center font-mono text-[10px] text-ink40">
                {photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
