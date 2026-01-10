import { Sun, Moon, LogIn, LogOut } from 'lucide-react'

function Header({ darkMode, toggleDarkMode, user, onLogin, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--content-bg)] border-b border-[var(--border)] shadow-sm">
      <div className="w-full max-w-[60%] mx-auto px-4 py-4 flex justify-between items-center md:max-w-[60%] sm:max-w-full">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Gaya's Log
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Login/Logout Button */}
          {user ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-claude"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-claude"
              title="Admin Login"
            >
              <LogIn size={20} />
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