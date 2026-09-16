import { useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play, Repeat2, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { focusTracks } from './content';

const bars = Array.from({ length: 29 }, (_, i) => 12 + Math.sin(i * 0.79) ** 2 * 35);
const displayTime = time => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

export default function FocusMusic() {
  const audio = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [loop, setLoop] = useState(true);
  const [error, setError] = useState('');
  const track = focusTracks[index];
  async function togglePlayback() {
    if (!track || !audio.current) return;
    setError('');
    if (!audio.current.paused) { audio.current.pause(); return; }
    try { audio.current.volume = volume; await audio.current.play(); }
    catch { setError('This track couldn’t play. Please try again.'); }
  }
  function selectTrack(next) {
    audio.current?.pause(); setIndex(next); setTime(0); setDuration(0); setError('');
  }
  return <div className={`music-panel ${playing ? 'music-is-playing' : ''}`}>
    <h2>A little space to tune in.</h2>
    <div className="music-visual" aria-hidden="true"><div className="music-orbit orbit-one" /><div className="music-orbit orbit-two" /><div className="music-orbit orbit-three" /><div className="music-wave">{bars.map((height, i) => <span key={i} style={{ height, '--delay': `${i * -0.13}s` }} />)}</div></div>
    <div className="music-track-title"><h3>{track?.title || 'A soundtrack for deep work.'}</h3><p>{track?.description || 'My handpicked focus playlist is on its way.'}</p></div>
    <div className="music-seek"><input aria-label="Track position" type="range" min="0" max={duration || 1} step="0.1" value={time} disabled={!track || !duration} onChange={event => { const next = Number(event.target.value); audio.current.currentTime = next; setTime(next); }} /><div><span>{displayTime(time)}</span><span>{displayTime(duration)}</span></div></div>
    <div className="music-controls"><button type="button" className="focus-icon-button" aria-label="Previous track" disabled={focusTracks.length < 2} onClick={() => selectTrack((index - 1 + focusTracks.length) % focusTracks.length)}><SkipBack size={19} /></button><button type="button" className="music-play" aria-label={playing ? 'Pause music' : 'Play music'} disabled={!track} onClick={togglePlayback}>{playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}</button><button type="button" className="focus-icon-button" aria-label="Next track" disabled={focusTracks.length < 2} onClick={() => selectTrack((index + 1) % focusTracks.length)}><SkipForward size={19} /></button></div>
    <div className="music-options"><Volume2 size={16} aria-hidden="true" /><input aria-label="Music volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={event => { const next = Number(event.target.value); setVolume(next); if (audio.current) audio.current.volume = next; }} /><button className="focus-icon-button" type="button" aria-label="Repeat track" aria-pressed={loop} onClick={() => setLoop(!loop)}><Repeat2 size={17} /></button></div>
    {error && <p role="alert" className="focus-error">{error}</p>}
    {track && <audio ref={audio} src={track.src} preload="metadata" loop={loop} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={event => setTime(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onError={() => { setPlaying(false); setError('This track is unavailable right now.'); }} />}
    {!!focusTracks.length && <div className="music-track-list">{focusTracks.map((item, i) => <div key={item.id}><button type="button" aria-pressed={i === index} onClick={() => selectTrack(i)}><span>{String(i + 1).padStart(2, '0')}</span>{item.title}</button>{item.researchUrl && <a href={item.researchUrl} target="_blank" rel="noopener noreferrer">Read the research <ArrowUpRight size={12} /></a>}</div>)}</div>}
  </div>;
}
