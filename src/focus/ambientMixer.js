export const soundScenes = [
  { id: 'rain', name: 'Rain' },
  { id: 'thunder', name: 'Thunder' },
  { id: 'fire', name: 'Fire' },
];

export function createAmbientMixer({ sources, createAudio = src => new Audio(src), onState = () => {} }) {
  const players = new Map();
  let wanted = new Set();
  let request = 0;
  let volume = 0.4;
  let disposed = false;

  function stop(status = 'paused') {
    request += 1;
    wanted = new Set();
    players.forEach(audio => audio.pause());
    if (!disposed) onState(status);
  }

  function ready(layers) {
    return Array.isArray(layers) && layers.length > 0 && layers.every(layer => soundScenes.some(item => item.id === layer) && Boolean(sources[layer]));
  }

  async function play(layers) {
    if (disposed) return;
    if (Array.isArray(layers) && layers.length === 0) { stop(); return; }
    if (!ready(layers)) { stop('unavailable'); return; }
    const current = ++request;
    wanted = new Set(layers);
    players.forEach((audio, layer) => { if (!wanted.has(layer)) audio.pause(); });
    onState('loading');
    try {
      await Promise.all(layers.map(layer => {
        let audio = players.get(layer);
        if (!audio) {
          audio = createAudio(sources[layer]);
          audio.loop = true;
          audio.preload = 'none';
          audio.onplaying = () => { if (!wanted.has(layer)) audio.pause(); };
          audio.onerror = () => { if (wanted.has(layer)) stop('error'); };
          players.set(layer, audio);
        }
        audio.volume = volume;
        return audio.paused ? audio.play() : Promise.resolve();
      }));
      // A late playback promise cannot override a newer scene or pause.
      players.forEach((audio, layer) => { if (!wanted.has(layer)) audio.pause(); });
      if (current === request && !disposed) onState('playing');
    } catch {
      if (current === request && !disposed) stop('error');
    }
  }

  return {
    play, ready, pause: () => stop(),
    setVolume(value) {
      if (!Number.isFinite(value)) return;
      volume = Math.max(0, Math.min(1, value));
      players.forEach(audio => { audio.volume = volume; });
    },
    dispose() {
      disposed = true;
      stop();
      players.forEach(audio => { audio.onplaying = null; audio.onerror = null; audio.removeAttribute('src'); audio.load(); });
      players.clear();
    },
  };
}
