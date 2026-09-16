import { useEffect, useReducer } from 'react';
import { createTimer, restoreTimer, timerReducer, TIMER_KEY, formatTime } from './timer';

function loadTimer() {
  try { return restoreTimer(JSON.parse(sessionStorage.getItem(TIMER_KEY)), Date.now()); }
  catch { return createTimer(); }
}

export default function useFocusTimer() {
  const [timer, dispatch] = useReducer(timerReducer, undefined, loadTimer);

  useEffect(() => {
    try { sessionStorage.setItem(TIMER_KEY, JSON.stringify(timer)); } catch { /* Works without storage. */ }
  }, [timer]);

  useEffect(() => {
    if (timer.status !== 'running') return;
    const tick = () => dispatch({ type: 'tick', now: Date.now() });
    const interval = window.setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    window.addEventListener('pageshow', tick);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
      window.removeEventListener('pageshow', tick);
    };
  }, [timer.status]);

  useEffect(() => {
    document.title = timer.status === 'idle' ? 'Focus — Gayathri Perumal' :
      timer.status === 'complete' ? 'Session complete — Focus' : `${formatTime(timer.remaining)} · ${timer.status === 'paused' ? 'Paused' : 'Focus'} — Gayathri Perumal`;
  }, [timer.remaining, timer.status]);

  return [timer, dispatch];
}
