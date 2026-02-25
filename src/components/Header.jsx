import { Github, XSocial, BookOpen, Linkedin } from './Icons'

function Header({ activeTab, setActiveTab, isAdmin, user, onLogout }) {
  return (
    <header className="pt-16 pb-6 w-[90%] md:w-[40%] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-[42px] font-bold leading-tight tracking-tight animate-gradient-text"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #00C853, #69F0AE, #00E676, #A5D6A7, #00C853, #69F0AE)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(0, 230, 118, 0.3))',
            }}
          >Gayathri Perumal</h1>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://twitter.com/gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150" aria-label="X (Twitter)">
            <XSocial size={20} />
          </a>
          <a href="https://linkedin.com/in/gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://hashnode.com/@gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150" aria-label="Hashnode">
            <BookOpen size={20} />
          </a>
          <a href="https://github.com/gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150" aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>
      </div>

      <nav className="flex items-center gap-4 text-[16px] flex-wrap font-medium">
        <button onClick={() => setActiveTab('home')} className={`tab ${activeTab === 'home' ? 'tab-active' : ''}`}>
          Home
        </button>
        <span className="text-[var(--text-tertiary)]">·</span>
        <button onClick={() => setActiveTab('today')} className={`tab ${activeTab === 'today' ? 'tab-active' : ''}`}>
          Today
        </button>
        <span className="text-[var(--text-tertiary)]">·</span>
        <button onClick={() => setActiveTab('archives')} className={`tab ${activeTab === 'archives' ? 'tab-active' : ''}`}>
          Archives
        </button>
        <span className="text-[var(--text-tertiary)]">·</span>
        <button onClick={() => setActiveTab('pomodoro')} className={`tab ${activeTab === 'pomodoro' ? 'tab-active' : ''}`}>
          Pomodoro
        </button>
        {isAdmin && user && (
          <>
            <span className="text-[var(--text-tertiary)]">·</span>
            <button onClick={onLogout} className="tab !text-[#EF4444] hover:!text-[#DC2626]">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header