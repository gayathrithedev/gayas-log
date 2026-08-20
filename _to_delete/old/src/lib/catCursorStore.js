/* Tiny shared flag so the flower patch can hide the cursor cat while the
   pointer is over it — there's already a cat there. */

let hidden = false;
const subscribers = new Set();

export function setCatCursorHidden(value) {
  if (hidden === value) return;
  hidden = value;
  subscribers.forEach((fn) => fn(hidden));
}

export function subscribeCatCursor(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

export function isCatCursorHidden() {
  return hidden;
}
