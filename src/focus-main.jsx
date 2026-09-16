import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/caveat/400.css';
import '@fontsource/instrument-serif/400.css';
import './index.css';
import Focus from './focus/Focus';

createRoot(document.getElementById('root')).render(<StrictMode><Focus /></StrictMode>);
