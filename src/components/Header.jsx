import { Moon, Sun, LogOut } from 'lucide-react'

function Header({ darkMode, toggleDarkMode, isAdmin, user, onLogout, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
          {/* Left: Logo and theme toggle */}
          <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              Gaya's Log
            </h1>
            <div className="flex items-center gap-3">
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
          </div>

          {/* Right: Navigation menu */}
          <nav className="flex items-center gap-6 overflow-x-auto pb-1 md:pb-0 no-scrollbar w-full md:w-auto mask-linear-gradient">
            <button
              onClick={() => setActiveTab('home')}
              className={`text-base whitespace-nowrap transition-colors ${activeTab === 'home'
                ? 'text-[var(--text-primary)] font-medium underline decoration-2 underline-offset-4'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('today')}
              className={`text-base whitespace-nowrap transition-colors ${activeTab === 'today'
                ? 'text-[var(--text-primary)] font-medium underline decoration-2 underline-offset-4'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('archives')}
              className={`text-base whitespace-nowrap transition-colors ${activeTab === 'archives'
                ? 'text-[var(--text-primary)] font-medium underline decoration-2 underline-offset-4'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              Archive
            </button>
            <button
              onClick={() => setActiveTab('pomodoro')}
              className={`text-base whitespace-nowrap transition-colors ${activeTab === 'pomodoro'
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
              className="text-base whitespace-nowrap text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
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