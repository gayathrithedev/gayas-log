import { useEffect, useState } from "react";

export function PhotoFrame({ photos }) {
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const picture = <span className="photo-print"><img src={`/books/${photo.file}`} alt={photo.alt} style={{ objectPosition: photo.position || "center", transform: photo.zoom ? `scale(${photo.zoom})` : undefined, transformOrigin: photo.position || "center" }} /></span>;
  if (photos.length === 1) return <div className="shelf-photo">{picture}</div>;
  return <button type="button" className="shelf-photo shelf-photo-album"
    onClick={() => setIndex((current) => (current + 1) % photos.length)}
    aria-label={`${photo.alt}. Photo ${index + 1} of ${photos.length}. Show next photo`}
    title="Tap to see another Hazel memory">
    {picture}
    <span className="photo-dots" aria-hidden="true">{photos.map((item, i) => <i key={item.file} className={i === index ? "active" : ""} />)}</span>
  </button>;
}

export function ZZPlant({ small = false }) {
  return <img className={`zz-plant${small ? " zz-small" : ""}`} src="/books/zz-plant.png" alt="A little ZZ plant in a speckled ceramic pot" width="1145" height="1374" />;
}

export function FairyLights() {
  return <div className="fairy-lights" aria-hidden="true">
    {Array.from({ length: 7 }, (_, i) => <i key={i} className="fairy-bulb" style={{ left: `${8 + i * 14}%` }} />)}
  </div>;
}

const clockFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });

export function ShelfClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const time = clockFormat.format(now);
  return <div className="shelf-clock" title={`Bengaluru · ${time} IST`}>
    <time dateTime={now.toISOString()} aria-label={`Bengaluru time: ${time} IST`}>{time.slice(0, 5)}</time>
    <span>BENGALURU · IST</span>
  </div>;
}
