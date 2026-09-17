import test from 'node:test';
import assert from 'node:assert/strict';
import { createAmbientMixer } from './ambientMixer.js';

test('every independent sound combination plays exactly its selected layers', async () => {
  const { mixer, audio, states } = setup();
  for (const layers of [['thunder'], ['fire'], ['thunder', 'fire'], ['rain', 'fire'], ['rain', 'thunder'], ['rain', 'thunder', 'fire'], ['rain'], []]) {
    await mixer.play(layers);
    assert.deepEqual(Object.keys(audio).filter(id => !audio[id].paused).sort(), [...layers].sort());
  }
  assert.equal(states.at(-1), 'paused');
});

function setup(sources = { rain: 'rain', thunder: 'thunder', fire: 'fire' }) {
  const audio = {};
  const states = [];
  const mixer = createAmbientMixer({ sources, onState: status => states.push(status), createAudio(src) {
    const player = {
      paused: true, calls: 0,
      play() { this.calls += 1; this.paused = false; this.onplaying?.(); return Promise.resolve(); },
      pause() { this.paused = true; },
      removeAttribute() {}, load() {},
    };
    audio[src] = player;
    return player;
  } });
  return { mixer, audio, states };
}

test('scenes add the exact layers without restarting rain; selecting rain removes the others', async () => {
  const { mixer, audio } = setup();
  await mixer.play(['rain']);
  assert.deepEqual(Object.keys(audio), ['rain']);
  await mixer.play(['rain', 'thunder']);
  assert.equal(audio.rain.calls, 1);
  assert.equal(audio.thunder.paused, false);
  await mixer.play(['rain', 'thunder', 'fire']);
  assert.equal(audio.fire.paused, false);
  await mixer.play(['rain']);
  assert.equal(audio.rain.paused, false);
  assert.equal(audio.thunder.paused, true);
  assert.equal(audio.fire.paused, true);
  assert.equal(audio.rain.loop, true);
});

test('missing audio never starts a partial scene', async () => {
  const { mixer, audio, states } = setup({ rain: 'rain', thunder: '', fire: '' });
  await mixer.play(['rain']);
  await mixer.play(['rain', 'thunder', 'fire']);
  assert.equal(audio.rain.paused, true);
  assert.equal(states.at(-1), 'unavailable');
  assert.equal(mixer.ready(['fire']), false);
});

test('volume and pause apply to every active layer', async () => {
  const { mixer, audio, states } = setup();
  mixer.setVolume(.2);
  await mixer.play(['rain', 'thunder', 'fire']);
  for (const player of Object.values(audio)) assert.equal(player.volume, .2);
  mixer.setVolume(.7);
  mixer.pause();
  for (const player of Object.values(audio)) { assert.equal(player.volume, .7); assert.equal(player.paused, true); }
  assert.equal(states.at(-1), 'paused');
});

test('a late play resolution cannot undo pause', async () => {
  const { mixer, audio, states } = setup();
  await mixer.play(['rain']);
  mixer.pause();
  let resolve;
  audio.rain.play = () => new Promise(done => { resolve = () => { audio.rain.paused = false; audio.rain.onplaying?.(); done(); }; });
  const pending = mixer.play(['rain']);
  mixer.pause();
  resolve();
  await pending;
  assert.equal(audio.rain.paused, true);
  assert.equal(states.at(-1), 'paused');
});

test('playback failure stops every layer and disposal releases media', async () => {
  const { mixer, audio, states } = setup();
  await mixer.play(['rain', 'thunder', 'fire']);
  mixer.pause();
  audio.fire.play = () => Promise.reject(new Error('unavailable'));
  await mixer.play(['rain', 'thunder', 'fire']);
  assert.equal(states.at(-1), 'error');
  for (const player of Object.values(audio)) assert.equal(player.paused, true);
  mixer.dispose();
  assert.equal(audio.rain.onerror, null);
});
