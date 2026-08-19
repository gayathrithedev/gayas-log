import { Sun, Moon } from './Icons'

function Header({ activeTab, setActiveTab, isAdmin, user, onLogout, theme, onToggleTheme }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'today', label: 'Today' },
    { id: 'journey', label: 'Journey' },
    { id: 'pomodoro', label: 'Pomodoro' },
  ]

  return (
    <header className="w-[92%] max-w-5xl mx-auto pt-7 sm:pt-10 pb-8">
      <div className="grid gap-5 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-[var(--shadow)] sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="group text-left"
          aria-label="Go to home"
        >
          <p className="font-serif text-[30px] italic leading-none tracking-[-0.06em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            Gaya’s Log
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--text-tertiary)]">
            Portfolio · logbook
          </p>
        </button>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-[15px] font-medium lg:justify-self-center" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-1 py-1 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)] ${isActive ? 'text-[var(--accent)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[var(--accent)]' : ''}`}
              >
                {item.label}
              </button>
            )
          })}
          {isAdmin && user && (
            <button onClick={onLogout} className="px-1 py-1 text-[#EF4444] transition-colors duration-200 hover:text-[#DC2626]">
              Logout
            </button>
          )}
        </nav>

        <div className="flex items-center gap-2 text-[var(--text-secondary)] lg:justify-self-end">
          <button
            onClick={onToggleTheme}
            className="header-icon-button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
