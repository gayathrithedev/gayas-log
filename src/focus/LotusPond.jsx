import './lotus.css';

export default function LotusPond({ progress, running }) {
  const bloom = Math.max(0, Math.min(1, progress));
  const halfOpen = Math.min(1, bloom * 2);
  const fullyOpen = Math.max(0, bloom * 2 - 1);

  return <div className={`lotus-pond ${running ? 'is-running' : ''}`} data-bloom={bloom.toFixed(3)} aria-hidden="true">
    {['light', 'dark'].map(theme => <div key={theme} className={`lotus-theme lotus-theme-${theme}`}>
      <div className="lotus-scene lotus-bud" style={{ opacity: 1 - halfOpen }} />
      <div className="lotus-scene lotus-opening" style={{ opacity: halfOpen - fullyOpen }} />
      <div className="lotus-scene lotus-open" style={{ opacity: fullyOpen }} />
    </div>)}
    <div className="lotus-water"><i className="lotus-ripple" /><i className="lotus-ripple" /><i className="lotus-ripple" /></div>
  </div>;
}
