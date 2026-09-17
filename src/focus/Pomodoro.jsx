import { useState } from 'react';
import { Pause, Play, RotateCcw, Check, X } from 'lucide-react';
import useFocusTimer from './useFocusTimer';
import { DEFAULT_MINUTES, formatTime, validMinutes } from './timer';
import TimerVessel from './TimerVessel';
import './pomodoro.css';

const modes = [{ id: 'focus', label: 'Pomodoro' }, { id: 'short', label: 'Short break' }, { id: 'long', label: 'Long break' }];

export default function Pomodoro() {
  const [timer, dispatch] = useFocusTimer();
  const [focusMinutes, setFocusMinutes] = useState(timer.mode === 'focus' ? timer.duration / 60_000 : 25);
  const [editing, setEditing] = useState(false);
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');
  const running = timer.status === 'running';
  const complete = timer.status === 'complete';
  const time = formatTime(timer.remaining);
  // Reserve each digit slot for the whole session, including 100:00 → 99:59.
  const digits = time.padStart(formatTime(timer.duration).length, ' ');
  const progress = Math.max(0, Math.min(1, 1 - timer.remaining / timer.duration));

  function configure(mode, minutes) {
    if (running) dispatch({ type: 'pause', now: Date.now() });
    dispatch({ type: 'configure', mode, minutes });
    setEditing(false);
    setError('');
  }
  function applyCustom(event) {
    event.preventDefault();
    if (!validMinutes(custom)) { setError('Choose a whole number from 1 to 180 minutes.'); return; }
    if (timer.mode === 'focus') setFocusMinutes(Number(custom));
    configure(timer.mode, Number(custom));
  }
  function editTime() {
    if (running) dispatch({ type: 'pause', now: Date.now() });
    setCustom(String(timer.duration / 60_000));
    setError('');
    setEditing(true);
  }
  function cancelEdit() {
    setEditing(false);
    setError('');
  }

  return <div className={`pomodoro-panel ${running ? 'is-running' : ''}`}>
    <div className="pomodoro-controls">
      <div className="pomodoro-time-row">
        {editing ? <form className="pomodoro-edit" onSubmit={applyCustom}>
          <label className="sr-only" htmlFor="session-minutes">Session minutes</label>
          <input id="session-minutes" type="text" inputMode="numeric" value={custom} onChange={event => setCustom(event.target.value)} autoFocus onFocus={event => event.target.select()} onKeyDown={event => { if (event.key === 'Escape') cancelEdit(); }} aria-invalid={!!error} aria-describedby="timer-edit-help" />
          <span className="pomodoro-edit-unit">min</span>
          <div className="pomodoro-edit-actions"><button type="submit" aria-label="Save duration"><Check size={19} /></button><button type="button" onClick={cancelEdit} aria-label="Cancel editing"><X size={18} /></button></div>
        </form> : <>
          <button className="pomodoro-time" type="button" onClick={editTime} aria-label={`Edit duration, ${time} remaining`}><span role="timer" aria-label={`${time} remaining`} aria-live="off" className="pomodoro-digits">{Array.from(digits, (digit, index) => <span key={index} aria-hidden="true" className={`pomodoro-digit${digit === ':' ? ' pomodoro-digit-colon' : digit === ' ' ? ' pomodoro-digit-spacer' : ''}`}>{digit === ' ' ? '0' : digit}</span>)}</span></button>
          <button type="button" className="pomodoro-play" aria-label={running ? 'Pause timer' : complete ? 'Restart timer' : timer.status === 'paused' ? 'Resume timer' : 'Start timer'} onClick={() => dispatch({ type: running ? 'pause' : 'start', now: Date.now() })}>{running ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button>
        </>}
      </div>
      <p id="timer-edit-help" className={`pomodoro-hint ${error ? 'has-error' : ''}`} role={error ? 'alert' : undefined}>{editing ? error || 'Set your minutes. Enter to save.' : 'Click the time to edit'}</p>
      <div className="pomodoro-modes" role="group" aria-label="Session type">{modes.map(mode => <button type="button" key={mode.id} aria-pressed={timer.mode === mode.id} onClick={() => configure(mode.id, mode.id === 'focus' ? focusMinutes : DEFAULT_MINUTES[mode.id])}>{mode.label}</button>)}</div>
      <div className="pomodoro-bottom"><button type="button" className="focus-icon-button" aria-label="Reset timer" title="Reset timer" onClick={() => { dispatch({ type: 'reset' }); setEditing(false); setError(''); }}><RotateCcw size={17} strokeWidth={1.4} /></button><span className="pomodoro-status" role="status">{complete ? (timer.mode === 'focus' ? 'Time for a little break.' : 'Ready for a fresh start.') : timer.status === 'paused' ? 'Paused. Take your time.' : ''}</span></div>
    </div>
    <div className="pomodoro-object" role="img" aria-label={timer.mode === 'focus' ? `Glass hourglass, ${Math.round(progress * 100)} percent elapsed` : 'A warm coffee in a glass cup'}>
      <TimerVessel mode={timer.mode} progress={progress} running={running} />
    </div>
  </div>;
}
