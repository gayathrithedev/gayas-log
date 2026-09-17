import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;
const profiles = { rain: { petals: 8, strength: 1 }, thunder: { petals: 6, strength: 1.5 }, fire: { petals: 10, strength: 1.9 } };

export default function SoundBloom({ scene, playing, active, motion }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, inside: false });
  const ripple = useRef(-100);
  const redraw = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context || !active) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let size = 0;
    let lastFrame = 0;
    let phase = 0;
    let ink = '#161616';
    const profile = profiles[scene];

    function draw(now) {
      if (!size) return;
      const moving = motion && !reducedMotion.matches;
      const seconds = now / 1000;
      const radius = size * .41;
      context.clearRect(0, 0, size, size);
      context.fillStyle = ink;
      for (let ring = 0; ring < 28; ring += 1) {
        const depth = ring / 27;
        const count = 130 + ring * 4;
        const base = radius * (.36 + depth * .64);
        context.globalAlpha = .5 + Math.sin(depth * Math.PI) * .4;
        context.beginPath();
        for (let dot = 0; dot < count; dot += 1) {
          const angle = dot / count * TAU + ring * .019 + phase * .035;
          const petals = Math.sin(angle * profile.petals + phase * .65 - depth * 3);
          const wave = Math.sin(angle * 3 - phase + depth * 6);
          let r = base + petals * radius * .085 * depth ** 1.5 * profile.strength + wave * radius * .025 * depth;
          if (moving) {
            const age = seconds - ripple.current;
            const front = age * radius * 1.3;
            if (age >= 0 && age < 2.5) r += Math.exp(-(((base - front) / (radius * .12)) ** 2)) * radius * .055 * (1 - age / 2.5);
          }
          let x = Math.cos(angle) * r;
          let y = Math.sin(angle) * r;
          if (pointer.current.inside && moving) {
            const dx = x - pointer.current.x * size;
            const dy = y - pointer.current.y * size;
            const distance = Math.hypot(dx, dy);
            const push = Math.max(0, 1 - distance / (size * .22));
            x += dx * push * .23;
            y += dy * push * .23;
          }
          const dotSize = Math.max(.85, size * (.0015 + .0008 * Math.sin(depth * Math.PI))) * (.9 + .1 * Math.sin(angle * 5 + ring));
          context.moveTo(size / 2 + x + dotSize, size / 2 + y);
          context.arc(size / 2 + x, size / 2 + y, dotSize, 0, TAU);
        }
        context.fill();
      }
      context.globalAlpha = 1;
    }

    function tick(now) {
      if (now - lastFrame >= 1000 / 30) {
        phase += Math.min((now - lastFrame) / 1000, .05) * (playing ? .85 : .35);
        lastFrame = now;
        draw(now);
      }
      frame = requestAnimationFrame(tick);
    }
    function refresh() {
      cancelAnimationFrame(frame);
      draw(performance.now());
      if (motion && !reducedMotion.matches && !document.hidden) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
    function resize() {
      size = canvas.getBoundingClientRect().width;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * scale);
      canvas.height = Math.round(size * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      draw(performance.now());
    }
    function updateTheme() {
      ink = document.documentElement.dataset.theme === 'dark' ? '#eeeeee' : '#161616';
      draw(performance.now());
    }
    const observer = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(updateTheme);
    observer.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    reducedMotion.addEventListener('change', refresh);
    document.addEventListener('visibilitychange', refresh);
    redraw.current = () => draw(performance.now());
    updateTheme();
    resize();
    refresh();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener('change', refresh);
      document.removeEventListener('visibilitychange', refresh);
      redraw.current = () => {};
    };
  }, [scene, playing, active, motion]);

  return <button type="button" className="sound-bloom" aria-label="Send a ripple through the dotted sound flower" onClick={() => { ripple.current = performance.now() / 1000; redraw.current(); }} onPointerMove={event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: (event.clientX - bounds.left) / bounds.width - .5, y: (event.clientY - bounds.top) / bounds.height - .5, inside: true };
  }} onPointerLeave={() => { pointer.current.inside = false; }} onPointerUp={event => { if (event.pointerType !== 'mouse') pointer.current.inside = false; }}>
    <canvas ref={canvasRef} aria-hidden="true" />
  </button>;
}
