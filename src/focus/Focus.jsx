import { useRef, useState } from 'react';
import { House } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import Pomodoro from './Pomodoro';
import FocusMusic from './FocusMusic';
import Surprise from './Surprise';
import './focus.css';
import './experiences.css';

const tabs = [{ id: 'pomodoro', name: 'Pomodoro' }, { id: 'music', name: 'Focus Music' }, { id: 'surprise', name: 'Surprise' }];
const homeHref = import.meta.env.MODE === 'focus' || window.location.hostname === 'focus.gayathriperumal.in' ? 'https://www.gayathriperumal.in/' : '/';

export default function Focus() {
  const [active, setActive] = useState('pomodoro');
  const tabRefs = useRef([]);
  function moveTab(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  }
  return <div className="focus-page grain">
    <a className="focus-skip" href="#focus-main">Skip to focus tools</a>
    <header className="focus-header">
      <h1 className="sr-only">Focus by Gayathri Perumal</h1>
      <div className="focus-tabs" role="tablist" aria-label="My everyday tools">
        {tabs.map((tab, index) => <button type="button" key={tab.id} id={`tab-${tab.id}`} ref={node => { tabRefs.current[index] = node; }} role="tab" aria-selected={active === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} onKeyDown={event => moveTab(event, index)} onClick={() => setActive(tab.id)}>{tab.name}</button>)}
      </div>
      <div className="focus-header-links"><a href={homeHref} aria-label="Home" title="Home"><House size={18} strokeWidth={1.4} aria-hidden="true" /></a><ThemeToggle /></div>
    </header>
    <main id="focus-main" className="focus-main">
      <section id="panel-pomodoro" role="tabpanel" aria-labelledby="tab-pomodoro" hidden={active !== 'pomodoro'} tabIndex={0}><Pomodoro /></section>
      <section id="panel-music" role="tabpanel" aria-labelledby="tab-music" hidden={active !== 'music'} tabIndex={0}><FocusMusic /></section>
      <section id="panel-surprise" role="tabpanel" aria-labelledby="tab-surprise" hidden={active !== 'surprise'} tabIndex={0}><Surprise active={active === 'surprise'} /></section>
    </main>
    <footer className="focus-quiet-footer"><span>Made for a little more intention.</span></footer>
  </div>;
}
