import { useEffect, useRef, useState } from "react";

export function PhotoFrame({ photo }) {
  const dialogRef = useRef(null);
  const [opened, setOpened] = useState(false);
  return <>
    <button type="button" className="shelf-photo" onClick={() => { setOpened(true); dialogRef.current?.showModal(); }}
      aria-label={`View larger photo: ${photo.alt}`} aria-haspopup="dialog">
      <span className="photo-print"><img src={`/books/optimized/${photo.file.replace(/\.[^.]+$/, ".webp")}`} alt="" decoding="async" style={{ objectPosition: photo.position || "center", transform: photo.zoom ? `scale(${photo.zoom})` : undefined, transformOrigin: photo.position || "center" }} /></span>
    </button>
    <dialog ref={dialogRef} className="photo-viewer" aria-label={photo.alt} onClick={(event) => {
      if (event.target === event.currentTarget) dialogRef.current.close();
    }}>
      <button type="button" className="photo-viewer-close" onClick={() => dialogRef.current.close()} autoFocus aria-label="Close photo">×</button>
      {opened && <img src={`/books/${photo.file}`} alt={photo.alt} decoding="async" />}
    </dialog>
  </>;
}

export function ZZPlant({ small = false }) {
  return <img className={`zz-plant${small ? " zz-small" : ""}`} src="/books/optimized/zz-plant.webp" alt="A little ZZ plant in a speckled ceramic pot" width="1145" height="1374" decoding="async" />;
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
