import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { ambientSources } from './content';
import { createAmbientMixer, soundScenes } from './ambientMixer';
import SoundBloom from './SoundBloom';
import './music.css';

export default function FocusMusic({ active }) {
  const mixer = useRef(null);
  const [layers, setLayers] = useState(['rain']);
  const [status, setStatus] = useState('idle');
  const [volume, setVolume] = useState(0.4);
  const [motion, setMotion] = useState(true);
  const ready = layers.length > 0 && layers.every(layer => Boolean(ambientSources[layer]));
  const scene = layers.includes('fire') ? 'fire' : layers.includes('thunder') ? 'thunder' : 'rain';
  const playing = status === 'playing';
  const loading = status === 'loading';

  useEffect(() => {
    const player = createAmbientMixer({ sources: ambientSources, onState: setStatus });
    mixer.current = player;
    return () => { player.dispose(); mixer.current = null; };
  }, []);

  function toggleLayer(layer) {
    const next = layers.includes(layer) ? layers.filter(item => item !== layer) : [...layers, layer];
    setLayers(next);
    mixer.current?.play(next);
  }

  return <div className="soundscape">
    <div className="soundscape-art">
      <SoundBloom scene={scene} playing={playing} active={active} motion={motion} />
      <div className="soundscape-art-caption"><span>Move gently. Make a little ripple.</span><button type="button" onClick={() => setMotion(!motion)} aria-label={motion ? 'Pause visual motion' : 'Resume visual motion'}>{motion ? <Pause size={13} /> : <Play size={13} />}</button></div>
    </div>
    <div className="soundscape-sidebar">
      <fieldset className="soundscape-scenes">
        <legend className="sr-only">Choose sounds to combine</legend>
        {soundScenes.map(item => <label key={item.id} className="soundscape-scene">
          <input type="checkbox" name={item.id} checked={layers.includes(item.id)} onChange={() => toggleLayer(item.id)} />
          <span className="soundscape-scene-name">{item.name}</span>
        </label>)}
      </fieldset>
      <div className="soundscape-playback">
        <button type="button" className="soundscape-play" aria-label={playing || loading ? 'Pause soundscape' : 'Play soundscape'} disabled={!ready} onClick={() => playing || loading ? mixer.current?.pause() : mixer.current?.play(layers)}>{playing || loading ? <Pause size={17} /> : <Play size={17} />}</button>
        <Volume2 size={16} aria-hidden="true" />
        <input type="range" aria-label="Sound volume" min="0" max="1" step="0.01" value={volume} onChange={event => { const next = Number(event.target.value); setVolume(next); mixer.current?.setVolume(next); }} />
      </div>
      <p className="soundscape-status" role="status">{!layers.length ? 'Choose any sounds to combine.' : !ready ? 'Sound is on its way.' : status === 'error' ? 'Couldn’t play this sound. Try again.' : loading ? 'Tuning in…' : playing ? 'Now playing' : status === 'paused' ? 'Paused' : 'Choose any sounds to combine.'}</p>
    </div>
  </div>;
}
