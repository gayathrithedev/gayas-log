import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { motivations } from './content';
import ScratchCard from './ScratchCard';

const confetti = Array.from({ length: 64 }, (_, i) => ({
  x: Math.cos(i * 2.4) * (105 + i % 12 * 14),
  y: -75 - (i % 9) * 22,
  drift: Math.sin(i * 1.7) * 45,
  rotate: i * 73,
  color: ['#e5b752', '#ff7791', '#73cdb9', '#9c91ef', '#f5cd6a', '#73b9f0', '#f5a46c', '#e5b752'][i % 8],
}));

export default function Surprise({ active }) {
  useEffect(() => {
    if (!active) return;
    const image = new Image();
    image.src = '/focus/gift-open.webp';
    image.decode().catch(() => {});
  }, [active]);
  const [opened, setOpened] = useState(false);
  const [note, setNote] = useState(0);
  const [burst, setBurst] = useState(0);
  function nextNote() {
    setNote(current => (current + 1 + Math.floor(Math.random() * (motivations.length - 1))) % motivations.length);
  }
  function openGift() {
    nextNote();
    setOpened(true); setBurst(value => value + 1);
  }
  return <div className={`surprise-panel ${opened ? 'gift-is-open' : ''}`}>
    <h2>A little something for you.</h2>
    <div className="gift-stage">
      {opened && <>
        <div className="gift-confetti" key={`confetti-${burst}`} aria-hidden="true">{confetti.map((piece, i) => <i key={i} style={{ '--x': `${piece.x}px`, '--y': `${piece.y}px`, '--drift': `${piece.drift}px`, '--turn': `${piece.rotate}deg`, '--delay': `${i % 8 * 24}ms`, background: piece.color }} />)}</div>
        <ScratchCard />
        <img className="gift-open-image" src="/focus/gift-open.webp" alt="An opened gift box with a ribbon" width="560" height="560" decoding="async" />
      </>}
      {!opened && <button type="button" className="gift-box-button" onClick={openGift} aria-label="Open your surprise"><img src="/focus/gift-closed.webp" alt="A gift box tied with a satin bow" width="560" height="560" loading="eager" decoding="async" /></button>}
    </div>
    {!opened && <div className="gift-action"><button type="button" className="focus-primary" onClick={openGift}>Open my surprise</button></div>}
    {opened && <section className="gift-followup" aria-label="A note from Gayathri">
      <p className="motivation-message" aria-live="polite">{motivations[note]}</p>
      <button type="button" className="focus-text-button" onClick={nextNote}><RotateCcw size={14} aria-hidden="true" /> Another little nudge</button>
    </section>}
  </div>;
}
