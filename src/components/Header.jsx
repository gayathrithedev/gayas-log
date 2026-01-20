import { Moon, Sun, LogOut } from 'lucide-react'

function Header({ darkMode, toggleDarkMode, isAdmin, user, onLogout, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo and theme toggle */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              Gaya's Log
            </h1>
            <button
              onClick={toggleDarkMode}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {isAdmin && user && (
              <span className="text-[var(--text-secondary)]">|</span>
            )}
            {isAdmin && user && (
              <button
                onClick={onLogout}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>

          {/* Right: Navigation menu */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`text-base transition-colors ${activeTab === 'home'
                  ? 'text-[var(--text-primary)] font-medium underline decoration-2 underline-offset-4'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('today')}
              className={`text-base transition-colors ${activeTab === 'today'
                  ? 'text-[var(--text-primary)] font-medium underline decoration-2 underline-offset-4'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('archives')}
              className={`text-base transition-colors ${activeTab === 'archives'
                  ? 'text-[var(--text-primary)] font-medium underline decoration-2 underline-offset-4'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              Archive
            </button>
            <button
              onClick={() => setActiveTab('pomodoro')}
              className={`text-base transition-colors ${activeTab === 'pomodoro'
                  ? 'text-[var(--text-primary)] font-medium underline decoration-2 underline-offset-4'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              Pomodoro
            </button>
            <a
              href="https://hashnode.com/@gayathrithedev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Blog
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header