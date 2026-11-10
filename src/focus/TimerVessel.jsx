import { useId } from 'react';
import LotusPond from './LotusPond';

export default function TimerVessel({ mode, progress, running }) {
  const id = useId().replace(/:/g, '');
  const paint = name => `url(#${id}-${name})`;
  if (mode === 'focus') return <LotusPond progress={progress} running={running} />;
  return <svg className={`timer-vessel ${running ? 'vessel-running' : ''}`} viewBox="0 0 360 450" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-glass`} x1="105" y1="200" x2="255" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#9dafa9" stopOpacity=".22" /><stop offset=".08" stopColor="white" stopOpacity=".85" /><stop offset=".21" stopColor="#b9cbc5" stopOpacity=".1" /><stop offset=".48" stopColor="white" stopOpacity=".02" /><stop offset=".76" stopColor="#b5c9c4" stopOpacity=".17" /><stop offset=".91" stopColor="white" stopOpacity=".85" /><stop offset="1" stopColor="#879c94" stopOpacity=".3" /></linearGradient>
      <linearGradient id={`${id}-edge`} x1="110" y1="70" x2="260" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#9ca9a1" stopOpacity=".65" /><stop offset=".28" stopColor="#dde7e0" /><stop offset=".48" stopColor="#899a92" stopOpacity=".5" /><stop offset=".7" stopColor="white" /><stop offset="1" stopColor="#899b92" stopOpacity=".8" /></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#766548" stopOpacity=".2" /><stop offset="1" stopColor="#766548" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-coffee`} x1="150" y1="230" x2="172" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#42251a" /><stop offset=".48" stopColor="#65402a" /><stop offset=".83" stopColor="#aa7846" /><stop offset="1" stopColor="#d6aa72" /></linearGradient>
      <radialGradient id={`${id}-crema`}><stop stopColor="#7a4a2b" /><stop offset=".75" stopColor="#b8834c" /><stop offset="1" stopColor="#e8c188" /></radialGradient>
    </defs>
    <g className="coffee-art">
      <ellipse cx="180" cy="381" rx="129" ry="22" fill={paint('shadow')} />
      <ellipse cx="174" cy="367" rx="121" ry="21" fill={paint('glass')} stroke={paint('edge')} strokeWidth="1.5" /><ellipse cx="174" cy="362" rx="117" ry="19" stroke="white" strokeOpacity=".9" strokeWidth="2" /><ellipse cx="174" cy="364" rx="62" ry="9" stroke={paint('edge')} />
      <path d="M255 215 C321 190 322 288 254 306 L250 289 C298 274 299 216 257 233 Z" fill={paint('glass')} stroke={paint('edge')} strokeWidth="2" /><path d="M266 219 C310 210 310 276 265 292" stroke="white" strokeWidth="3" strokeOpacity=".85" />
      <path d="M91 199 Q89 320 125 344 Q171 372 219 344 Q255 320 255 199 Z" fill={paint('glass')} stroke={paint('edge')} strokeWidth="2" />
      <path d="M104 233 Q106 310 134 328 Q174 349 212 328 Q240 310 243 233 Z" fill={paint('coffee')} />
      <ellipse cx="173.5" cy="232" rx="69.5" ry="15" fill={paint('crema')} /><ellipse cx="173.5" cy="231" rx="61" ry="10" stroke="#efd6a3" strokeOpacity=".35" />
      <path d="M101 207 Q102 320 133 339 Q171 358 211 339 Q244 321 245 208" stroke={paint('edge')} strokeWidth="1.5" />
      <path d="M107 218 Q110 299 129 319" stroke="white" strokeOpacity=".6" strokeWidth="7" strokeLinecap="round" /><path d="M235 220 Q236 281 221 314" stroke="white" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="173" cy="199" rx="82" ry="17" fill={paint('glass')} stroke={paint('edge')} strokeWidth="2" /><ellipse cx="173" cy="198" rx="75" ry="12" stroke="white" strokeOpacity=".9" strokeWidth="1.5" />
      <g className="coffee-steam" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M144 171 C126 151 161 138 143 115" /><path d="M178 162 C158 138 193 123 178 94" /><path d="M208 172 C193 156 220 145 209 126" /></g>
    </g>
  </svg>;
}
