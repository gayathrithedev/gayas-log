let audioContext;

export function prepareTimerSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioContext ??= new AudioContext();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  } catch { /* The timer still works when audio is unavailable. */ }
}

export function playTimerSound() {
  if (!audioContext || audioContext.state !== 'running') return;
  // Three soft bell strikes, with a gentle attack and natural decay.
  for (let strike = 0; strike < 3; strike += 1) {
    const start = audioContext.currentTime + strike * 0.55;
    for (const [frequency, volume] of [[880, 0.16], [1760, 0.035]]) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(volume, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.85);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    }
  }
}
