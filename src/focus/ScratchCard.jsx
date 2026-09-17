import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Sparkles } from 'lucide-react';
import { topmate } from './content';

export default function ScratchCard() {
  const canvas = useRef(null);
  const drawing = useRef(false);
  const previous = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  useEffect(() => {
    if (revealed) return;
    const context = canvas.current.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    const gradient = context.createLinearGradient(0, 0, 720, 280);
    gradient.addColorStop(0, '#b47a20'); gradient.addColorStop(0.24, '#f1cf73'); gradient.addColorStop(0.46, '#ffe9a4'); gradient.addColorStop(0.7, '#cf9d3c'); gradient.addColorStop(1, '#f3d582');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 720, 280);
    for (let i = 0; i < 1800; i++) {
      context.fillStyle = i % 2 ? '#fff7d438' : '#80520e18';
      context.fillRect((i * 137.3) % 720, (i * 47.9) % 280, 2, 2);
    }
    context.strokeStyle = '#80520e88'; context.lineWidth = 2;
    context.strokeRect(16, 16, 688, 248);
    context.strokeStyle = '#fff2bd99'; context.lineWidth = 1;
    context.strokeRect(23, 23, 674, 234);
    context.textAlign = 'center'; context.fillStyle = '#50330c';
    context.font = '16px Georgia, serif'; context.fillText('✦  GOLDEN TICKET  ✦', 360, 68);
    context.font = 'italic 32px Georgia, serif'; context.fillText('A little extra, just for you.', 360, 123);
    context.font = '24px sans-serif'; context.fillText('Scratch to reveal', 360, 173);
  }, [revealed]);

  function scratch(event) {
    if (!drawing.current || revealed) return;
    const surface = canvas.current;
    const rect = surface.getBoundingClientRect();
    const point = { x: (event.clientX - rect.left) * surface.width / rect.width, y: (event.clientY - rect.top) * surface.height / rect.height };
    const context = surface.getContext('2d');
    if (!context) return;
    context.globalCompositeOperation = 'destination-out'; context.lineWidth = 64; context.lineCap = 'round';
    context.beginPath(); context.moveTo(previous.current?.x ?? point.x, previous.current?.y ?? point.y);
    context.lineTo(point.x, point.y); context.stroke();
    context.beginPath(); context.arc(point.x, point.y, 32, 0, Math.PI * 2); context.fill();
    previous.current = point;
  }
  function finishScratch() {
    if (!drawing.current || revealed) return;
    drawing.current = false; previous.current = null;
    const surface = canvas.current;
    const context = surface.getContext('2d');
    if (!context) return;
    const pixels = context.getImageData(0, 0, surface.width, surface.height).data;
    let cleared = 0; let samples = 0;
    for (let i = 3; i < pixels.length; i += 64) { samples++; if (pixels[i] < 128) cleared++; }
    if (cleared / samples > 0.35) setRevealed(true);
  }
  async function copyCode() {
    try { await navigator.clipboard.writeText(topmate.coupon); setCopyStatus('Copied!'); }
    catch { setCopyStatus('Select HAZEL above to copy it.'); }
  }
  return <div className="scratch-gift">
    <div className={`scratch-card ${revealed ? 'is-revealed' : ''}`}>
      <div className="scratch-reward" aria-hidden={!revealed}><span>{topmate.offer}</span><strong>{topmate.coupon}</strong><a className="scratch-topmate-link" href={topmate.url} target="_blank" rel="noopener noreferrer" tabIndex={revealed ? 0 : -1}>Connect with me on Topmate <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      {!revealed && <canvas ref={canvas} width="720" height="280" aria-hidden="true" onPointerDown={event => { if (event.button !== 0) return; drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratch(event); }} onPointerMove={scratch} onPointerUp={finishScratch} onPointerCancel={finishScratch} onLostPointerCapture={finishScratch} />}
    </div>
    <div className="scratch-controls">{revealed ? <div className="scratch-details"><p role="status">Use <b>{topmate.coupon}</b> at checkout. Your booking is on me.</p><div className="scratch-next-actions"><button type="button" className="focus-text-button" onClick={copyCode}>{copyStatus === 'Copied!' ? <Check size={15} /> : <Copy size={15} />} {copyStatus || 'Copy code'}</button></div></div> : <button type="button" className="focus-text-button" onClick={() => setRevealed(true)}><Sparkles size={14} /> Or reveal without scratching</button>}</div>
  </div>;
}
