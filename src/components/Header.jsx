import { Moon, Sun, LogOut } from 'lucide-react'

function Header({ darkMode, toggleDarkMode, isAdmin, user, onLogout, activeTab, setActiveTab }) {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-6 py-4">
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
              <button
                onClick={onLogout}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
          
          {/* Right: Navigation tabs */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('today')}
              className={`text-base transition-colors ${
                activeTab === 'today' 
                  ? 'text-[var(--text-primary)] font-medium' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('archives')}
              className={`text-base transition-colors ${
                activeTab === 'archives' 
                  ? 'text-[var(--text-primary)] font-medium' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Archive
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header