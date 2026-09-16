// Use the dedicated origin once its hosting and DNS are connected.
// The same-site entry keeps every link usable before that deployment.
export const focusHref = import.meta.env.VITE_FOCUS_ORIGIN || '/focus.html';
