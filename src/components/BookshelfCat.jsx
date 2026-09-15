import { useEffect, useRef } from "react";

export default function BookshelfCat() {
  const audioRef = useRef(null);

  const playPurr = () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.currentTime = 0;
    // Hover audio may be blocked until the visitor clicks or taps the cat.
    audio.play().catch(() => {});
  };

  const stopPurr = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const onVisibilityChange = () => {
      if (document.hidden) audio?.pause();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      audio?.pause();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <>
    <button
      type="button"
      className="shelf-cat"
      aria-label="Pet Hazel to hear a purr"
      onClick={playPurr}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") playPurr(); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") stopPurr(); }}
      onBlur={stopPurr}
    >
      <span aria-hidden="true" className="cat-zzz">z z z</span>
      <img src="/books/optimized/sleeping-hazel.webp" alt="Hazel sleeping on the bookshelf, with ginger stripes and little white paws" width="1536" height="1024" decoding="async" />
    </button>
    <audio ref={audioRef} src="/sounds/cat-purr.mp3" preload="none" />
  </>;
}
