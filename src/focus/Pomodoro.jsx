import { useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import useFocusTimer from './useFocusTimer';
import { DEFAULT_MINUTES, formatTime, validMinutes } from './timer';

const modes = [{ id: 'focus', label: 'Focus' }, { id: 'short', label: 'Short break' }, { id: 'long', label: 'Long break' }];

export default function Pomodoro() {
  const [timer, dispatch] = useFocusTimer();
  const [intention, setIntention] = useState(() => {
    try { return sessionStorage.getItem('gayas-focus-intention') || ''; } catch { return ''; }
  });
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState('');
  const [customError, setCustomError] = useState('');
  const running = timer.status === 'running';
  const complete = timer.status === 'complete';
  const isFocus = timer.mode === 'focus';
  const duration = timer.duration / 60_000;
  const progress = Math.max(0, Math.min(1, 1 - timer.remaining / timer.duration));
  const presets = isFocus ? [25, 50] : timer.mode === 'short' ? [5, 10] : [15, 20];

  function configure(mode, minutes) {
    dispatch({ type: 'configure', mode, minutes });
    setCustomOpen(false);
    setCustomError('');
  }
  function applyCustom(event) {
    event.preventDefault();
    if (!validMinutes(custom)) { setCustomError('Choose a whole number from 1 to 180 minutes.'); return; }
    configure(timer.mode, Number(custom));
  }
  function updateIntention(event) {
    setIntention(event.target.value);
    try { sessionStorage.setItem('gayas-focus-intention', event.target.value); } catch { /* Keep working in memory. */ }
  }

  return <div className={`pomodoro-panel ${running ? "is-running" : ""}`}>
      <div className="focus-intention focus-secondary">
        <label htmlFor="intention">What am I focusing on?</label>
        <input id="intention" type="text" placeholder="One thing at a time…" value={intention} onChange={updateIntention} maxLength={160} autoComplete="off" />
      </div>

      <div className="focus-modes" role="group" aria-label="Session type">
        {modes.map(mode => <button type="button" key={mode.id} aria-pressed={timer.mode === mode.id} disabled={running} onClick={() => configure(mode.id, DEFAULT_MINUTES[mode.id])}>{mode.label}</button>)}
      </div>

      <div className="focus-clock" role="timer" aria-label={`${isFocus ? 'Focus' : 'Break'} time remaining`} aria-live="off">{formatTime(timer.remaining)}</div>
      <div className="focus-progress" role="progressbar" aria-label="Session progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><span style={{ transform: `scaleX(${progress})` }} /></div>

      <div className="focus-duration" role="group" aria-label="Session duration">
        {presets.map(minutes => <button key={minutes} type="button" aria-pressed={duration === minutes && !customOpen} disabled={running} onClick={() => configure(timer.mode, minutes)}>{minutes} min</button>)}
        <button type="button" aria-expanded={customOpen} aria-controls="custom-duration" aria-pressed={!presets.includes(duration) || customOpen} disabled={running} onClick={() => { setCustomOpen(!customOpen); setCustom(String(duration)); setCustomError(''); }}>{presets.includes(duration) ? 'Custom' : `${duration} min · custom`}</button>
      </div>
      {customOpen && <form id="custom-duration" className="focus-custom" onSubmit={applyCustom} noValidate>
        <label htmlFor="custom-minutes">Minutes</label>
        <input id="custom-minutes" type="number" inputMode="numeric" min="1" max="180" step="1" value={custom} onChange={event => setCustom(event.target.value)} aria-invalid={!!customError} aria-describedby={customError ? 'duration-error' : undefined} />
        <button type="submit">Set time</button>
        {customError && <p id="duration-error" role="alert" className="focus-error">{customError}</p>}
      </form>}

      <div className="focus-actions">
        <button type="button" className="focus-primary" onClick={() => { setCustomOpen(false); dispatch({ type: running ? 'pause' : 'start', now: Date.now() }); }}>
          {running ? <Pause size={17} fill="currentColor" aria-hidden="true" /> : <Play size={17} fill="currentColor" aria-hidden="true" />}
          {running ? 'Pause' : timer.status === 'paused' ? 'Continue' : complete ? 'Begin again' : isFocus ? 'Begin focus' : 'Begin break'}
        </button>
        <button type="button" className="focus-reset focus-icon-button" aria-label="Reset timer" title="Reset timer" onClick={() => dispatch({ type: 'reset' })}><RotateCcw size={19} /></button>
      </div>
      <div className="focus-status" role="status">
        {complete ? <><span>{isFocus ? 'A little promise, kept. Time for a breather.' : 'A little rest. A fresh start.'}</span><button type="button" onClick={() => configure(isFocus ? 'short' : 'focus', isFocus ? 5 : 25)}>{isFocus ? 'Take a short break' : 'Back to focus'} <span aria-hidden="true">→</span></button></> : running ? 'Just this moment. Just this one thing.' : timer.status === 'paused' ? 'Take your time. It will be here.' : ' '}
      </div>

  </div>;
}
