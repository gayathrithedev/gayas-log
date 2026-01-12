import { Sun, Moon, LogOut } from 'lucide-react'

function Header({ darkMode, toggleDarkMode, isAdmin, user, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--content-bg)] border-b border-[var(--border)] shadow-sm">
      <div className="w-full max-w-[60%] mx-auto px-4 py-4 flex justify-between items-center md:max-w-[60%] sm:max-w-full">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Gaya's Log {isAdmin && <span className="text-sm text-[var(--text-secondary)] font-normal">(Admin)</span>}
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Logout Button - Only on admin site when logged in */}
          {isAdmin && user && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-claude"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          )}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-claude hover:bg-[var(--hover)] transition-all duration-claude"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-[var(--text-secondary)]" />
            ) : (
              <Moon size={20} className="text-[var(--text-secondary)]" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header