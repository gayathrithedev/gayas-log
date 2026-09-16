export const DEFAULT_MINUTES = { focus: 25, short: 5, long: 15 };
export const TIMER_KEY = 'gayas-focus-session-v1';

export function validMinutes(value) {
  const minutes = Number(value);
  return Number.isInteger(minutes) && minutes >= 1 && minutes <= 180;
}

export function createTimer(mode = 'focus', minutes = DEFAULT_MINUTES[mode]) {
  return { mode, duration: minutes * 60_000, remaining: minutes * 60_000, deadline: null, status: 'idle' };
}

export function restoreTimer(saved, now) {
  if (!saved || !Object.hasOwn(DEFAULT_MINUTES, saved.mode) ||
      !validMinutes(saved.duration / 60_000) || !Number.isFinite(saved.remaining) ||
      saved.remaining < 0 || saved.remaining > saved.duration ||
      !['idle', 'running', 'paused', 'complete'].includes(saved.status)) return createTimer();
  if (saved.status === 'running') {
    if (!Number.isFinite(saved.deadline) || saved.deadline > now + saved.duration) return createTimer();
    const remaining = Math.max(0, saved.deadline - now);
    return { ...saved, remaining, status: remaining ? 'running' : 'complete', deadline: remaining ? saved.deadline : null };
  }
  return { ...saved, deadline: null };
}

export function timerReducer(state, action) {
  switch (action.type) {
    case 'start':
      if (state.status === 'running') return state;
      return { ...state, remaining: state.remaining || state.duration, deadline: action.now + (state.remaining || state.duration), status: 'running' };
    case 'tick': {
      if (state.status !== 'running') return state;
      const remaining = Math.max(0, state.deadline - action.now);
      if (!remaining) return { ...state, remaining: 0, deadline: null, status: 'complete' };
      if (Math.ceil(remaining / 1000) === Math.ceil(state.remaining / 1000)) return state;
      return { ...state, remaining };
    }
    case 'pause': {
      if (state.status !== 'running') return state;
      const remaining = Math.max(0, state.deadline - action.now);
      return { ...state, remaining, deadline: null, status: remaining ? 'paused' : 'complete' };
    }
    case 'reset': return createTimer(state.mode, state.duration / 60_000);
    case 'configure':
      if (state.status === 'running' || !Object.hasOwn(DEFAULT_MINUTES, action.mode) || !validMinutes(action.minutes)) return state;
      return createTimer(action.mode, Number(action.minutes));
    default: return state;
  }
}

export function formatTime(milliseconds) {
  const seconds = Math.ceil(milliseconds / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
