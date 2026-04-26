import {
    Home,
    Calendar,
    Archive,
    Timer,
    BookOpen,
    Sun,
    Moon,
    LogOut,
    MapPin,
    Clock,
    Download,
    Linkedin,
    Mail,
    Github,
    XSocial
} from './Icons'

function Sidebar({ darkMode, toggleDarkMode, isAdmin, user, onLogout, activeTab, setActiveTab }) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
    })

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'today', label: 'Today', icon: Calendar },
        { id: 'archives', label: 'Archives', icon: Archive },
        { id: 'journey', label: 'Journey', icon: MapPin },
        { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 md:w-72 bg-transparent flex flex-col p-8 z-50 hidden md:flex">
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border border-[var(--border)]">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gaya"
                        alt="Gaya"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-[var(--text-primary)] font-medium text-lg">Gayathri</h2>
                    <p className="text-[var(--text-secondary)] text-sm">Engineer & Maker</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                ? 'bg-[var(--hover)] text-[var(--text-primary)]'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover)]/50'
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </button>
                    )
                })}

                <div className="mt-8 mb-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-4">
                    Socials
                </div>

                <div className="grid grid-cols-4 gap-2 px-2">
                    <a href="mailto:contact@gaya.dev" className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--hover)]/50 flex justify-center" aria-label="Email">
                        <Mail size={20} />
                    </a>
                    <a href="https://github.com/gayathrithedev" target="_blank" rel="noopener noreferrer" className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--hover)]/50 flex justify-center" aria-label="Github">
                        <Github size={20} />
                    </a>
                    <a href="https://twitter.com/gayathrithedev" target="_blank" rel="noopener noreferrer" className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--hover)]/50 flex justify-center" aria-label="X (formerly Twitter)">
                        <XSocial size={20} />
                    </a>
                    <a href="https://hashnode.com/@gayathrithedev" target="_blank" rel="noopener noreferrer" className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--hover)]/50 flex justify-center" aria-label="Medium">
                        <BookOpen size={20} />
                    </a>
                    <a href="#" className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--hover)]/50 flex justify-center" aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                </div>
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 mt-auto">
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--content-bg)]">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm mb-1">
                        <Clock size={14} />
                        <span>{currentDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
                        <MapPin size={14} />
                        <span>India</span>
                    </div>
                </div>

                <button
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-all duration-200 text-sm font-medium"
                >
                    <Download size={16} />
                    Download CV
                </button>

                <div className="flex items-center justify-between px-2">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--hover)]"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {isAdmin && user && (
                        <button
                            onClick={onLogout}
                            className="p-2 text-[var(--text-secondary)] hover:text-red-400 transition-colors rounded-lg hover:bg-[var(--hover)]"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
