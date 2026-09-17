import { useId } from 'react';

export default function TimerVessel({ mode, progress, running }) {
  const id = useId().replace(/:/g, '');
  const paint = name => `url(#${id}-${name})`;
  // Sand levels share the countdown's elapsed fraction, including pause and restore.
  const top = 126 * Math.sqrt(1 - progress);
  const bottom = 126 * Math.sqrt(progress);
  const glass = 'M116 62 C99 104 111 145 151 187 C165 202 177 211 177 223 C177 237 161 248 148 262 C111 299 100 340 116 376 Q180 392 244 376 C260 340 249 299 212 262 C199 248 183 237 183 223 C183 211 195 202 209 187 C249 145 261 104 244 62 Z';
  const upperSand = `M${180 - top * .68} ${223 - top} H${180 + top * .68} L180 223 Z`;
  const lowerSand = `M${180 - bottom} 378 Q${180 - bottom * .45} 373 180 ${378 - bottom} Q${180 + bottom * .45} 373 ${180 + bottom} 378 Z`;
  return <svg className={`timer-vessel ${running ? 'vessel-running' : ''}`} viewBox="0 0 360 450" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-glass`} x1="105" y1="200" x2="255" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#9dafa9" stopOpacity=".22" /><stop offset=".08" stopColor="white" stopOpacity=".85" /><stop offset=".21" stopColor="#b9cbc5" stopOpacity=".1" /><stop offset=".48" stopColor="white" stopOpacity=".02" /><stop offset=".76" stopColor="#b5c9c4" stopOpacity=".17" /><stop offset=".91" stopColor="white" stopOpacity=".85" /><stop offset="1" stopColor="#879c94" stopOpacity=".3" /></linearGradient>
      <linearGradient id={`${id}-edge`} x1="110" y1="70" x2="260" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#9ca9a1" stopOpacity=".65" /><stop offset=".28" stopColor="#dde7e0" /><stop offset=".48" stopColor="#899a92" stopOpacity=".5" /><stop offset=".7" stopColor="white" /><stop offset="1" stopColor="#899b92" stopOpacity=".8" /></linearGradient>
      <linearGradient id={`${id}-sand`} x1="127" y1="100" x2="229" y2="190" gradientUnits="userSpaceOnUse"><stop stopColor="#edca88" /><stop offset=".5" stopColor="#d5a251" /><stop offset="1" stopColor="#ac7839" /></linearGradient>
      <linearGradient id={`${id}-pile`} x1="140" y1="270" x2="211" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#f2d597" /><stop offset=".58" stopColor="#dab26d" /><stop offset="1" stopColor="#ae7c3d" /></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#766548" stopOpacity=".2" /><stop offset="1" stopColor="#766548" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-coffee`} x1="150" y1="230" x2="172" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#42251a" /><stop offset=".48" stopColor="#65402a" /><stop offset=".83" stopColor="#aa7846" /><stop offset="1" stopColor="#d6aa72" /></linearGradient>
      <radialGradient id={`${id}-crema`}><stop stopColor="#7a4a2b" /><stop offset=".75" stopColor="#b8834c" /><stop offset="1" stopColor="#e8c188" /></radialGradient>
      <pattern id={`${id}-grain`} width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".6" fill="#fff6dd" opacity=".5" /><circle cx="5" cy="5" r=".5" fill="#85571d" opacity=".35" /></pattern>
      <clipPath id={`${id}-bulb`}><path d={glass} /></clipPath>
    </defs>
    {mode === 'focus' ? <g className="hourglass-art">
      <ellipse cx="180" cy="398" rx="113" ry="20" fill={paint('shadow')} />
      <path d={glass} fill={paint('glass')} stroke={paint('edge')} strokeWidth="1.6" />
      <g clipPath={paint('bulb')}>
        {top > 0 && <g><path data-sand="top" d={upperSand} fill={paint('sand')} /><path d={upperSand} fill={paint('grain')} /><ellipse cx="180" cy={223 - top} rx={top * .68} ry={top * .035} fill="#efd49c" /></g>}
        {bottom > 0 && <g><path data-sand="bottom" d={lowerSand} fill={paint('pile')} /><path d={lowerSand} fill={paint('grain')} /></g>}
        {running && progress < 1 && <path className="sand-stream" d={`M180 221 V${378 - bottom}`} stroke="#ce9c52" strokeWidth="1.5" strokeDasharray="1 3" />}
      </g>
      <path d="M119 78 C109 121 127 155 155 184 M124 287 C112 310 109 345 121 365" stroke="white" strokeOpacity=".8" strokeWidth="5" strokeLinecap="round" />
      <path d="M237 86 C246 126 226 155 207 179 M209 268 C238 300 249 332 239 364" stroke="white" strokeOpacity=".7" strokeWidth="8" strokeLinecap="round" />
      <path d="M130 84 C122 115 135 140 143 151 M226 294 C235 316 236 338 232 352" stroke="white" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="180" cy="62" rx="64" ry="11" fill={paint('glass')} stroke={paint('edge')} strokeWidth="2" /><ellipse cx="180" cy="62" rx="56" ry="6" stroke="white" strokeOpacity=".9" />
      <ellipse cx="180" cy="377" rx="64" ry="10" fill={paint('glass')} stroke={paint('edge')} strokeWidth="2" /><path d="M129 381 Q180 392 231 381" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </g> : <g className="coffee-art">
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
    </g>}
  </svg>;
}
