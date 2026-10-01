import test from 'node:test';
import assert from 'node:assert/strict';
import { createTimer, formatTime, restoreTimer, timerReducer, validMinutes } from './timer.js';

test('elapsed wall time survives a throttled background tab', () => {
  const started = timerReducer(createTimer(), { type: 'start', now: 1000 });
  const afterFiveMinutes = timerReducer(started, { type: 'tick', now: 301000 });
  assert.equal(formatTime(afterFiveMinutes.remaining), '20:00');
});

test('pause and resume preserve the exact remaining time', () => {
  const started = timerReducer(createTimer(), { type: 'start', now: 1000 });
  const paused = timerReducer(started, { type: 'pause', now: 11250 });
  const resumed = timerReducer(paused, { type: 'start', now: 50000 });
  assert.equal(paused.remaining, 1489750);
  assert.equal(resumed.deadline, 1539750);
  assert.equal(timerReducer(paused, { type: 'tick', now: 90000 }), paused);
});

test('completion is clamped at zero and begins again with a full session', () => {
  const started = timerReducer(createTimer('focus', 1), { type: 'start', now: 0 });
  const complete = timerReducer(started, { type: 'tick', now: 61000 });
  assert.equal(complete.status, 'complete');
  assert.equal(complete.remaining, 0);
  assert.equal(complete.deadline, null);
  assert.equal(timerReducer(complete, { type: 'start', now: 100000 }).deadline, 160000);
});

test('a running timer is restored against the current clock, including expiry', () => {
  const saved = timerReducer(createTimer('short'), { type: 'start', now: 1000 });
  assert.equal(restoreTimer(saved, 61000).remaining, 240000);
  assert.equal(restoreTimer(saved, 400000).status, 'complete');
});

test('invalid stored state safely falls back to the default', () => {
  for (const invalid of [null, {}, { ...createTimer(), duration: -1 }, { ...createTimer(), mode: 'missing' }, { ...createTimer(), remaining: '1000' }, { ...createTimer(), status: 'running', deadline: null }]) {
    assert.deepEqual(restoreTimer(invalid, 1000), createTimer());
  }
});

test('duration changes cannot accidentally replace a running session', () => {
  const started = timerReducer(createTimer(), { type: 'start', now: 1000 });
  assert.equal(timerReducer(started, { type: 'configure', mode: 'short', minutes: 5 }), started);
  assert.deepEqual(timerReducer(started, { type: 'reset' }), createTimer());
});

test('custom duration accepts only whole minutes in range', () => {
  for (const value of ['', 0, -1, 181, 1.5, 'hello', Infinity]) assert.equal(validMinutes(value), false);
  for (const value of [1, '25', 180]) assert.equal(validMinutes(value), true);
  assert.equal(formatTime(999), '00:01');
  assert.equal(formatTime(180 * 60000), '180:00');
});

test('custom sessions reach halfway and completion at their actual deadlines', () => {
  for (const minutes of [1, 30, 180]) {
    const started = timerReducer(createTimer('focus', minutes), { type: 'start', now: 1000 });
    const halfway = timerReducer(started, { type: 'tick', now: 1000 + minutes * 30_000 });
    assert.equal(1 - halfway.remaining / halfway.duration, 0.5);
    const complete = timerReducer(halfway, { type: 'tick', now: 1000 + minutes * 60_000 });
    assert.equal(complete.remaining, 0);
    assert.equal(complete.status, 'complete');
  }
});

test('explicitly pausing before switching to a break sets the correct duration', () => {
  const started = timerReducer(createTimer('focus', 30), { type: 'start', now: 1000 });
  for (const [mode, minutes] of [['short', 5], ['long', 10]]) {
    const paused = timerReducer(started, { type: 'pause', now: 61000 });
    const next = timerReducer(paused, { type: 'configure', mode, minutes });
    assert.deepEqual(next, createTimer(mode, minutes));
  }
});

for (const [minutes, breakMinutes, mode] of [[25, 5, 'short'], [50, 10, 'long']]) {
  test(`${minutes}-minute focus automatically starts a ${breakMinutes}-minute break`, () => {
    const started = timerReducer(createTimer('focus', minutes), { type: 'start', now: 1000 });
    const now = started.deadline + 500;
    for (const next of [timerReducer(started, { type: 'tick', now }), timerReducer(started, { type: 'pause', now }), restoreTimer(started, now)]) {
      assert.equal(next.mode, mode);
      assert.equal(next.status, 'running');
      assert.equal(next.remaining, breakMinutes * 60_000);
      assert.equal(next.deadline, now + breakMinutes * 60_000);
      assert.equal(next.completedAt, started.deadline);
      const finished = timerReducer(next, { type: 'tick', now: next.deadline });
      assert.equal(finished.status, 'complete');
      assert.equal(finished.remaining, 0);
      assert.notEqual(finished.completedAt, next.completedAt);
      assert.equal(timerReducer(finished, { type: 'tick', now: next.deadline + 1000 }), finished);
    }
  });
}
