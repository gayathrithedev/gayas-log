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
    Download
} from 'lucide-react'

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
        { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 md:w-72 bg-[#0a0a0a] border-r border-[#262626] flex flex-col p-6 z-50 hidden md:flex">
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-[#333]">
                    <span className="text-lg font-bold text-white">GP</span>
                </div>
                <div>
                    <h2 className="text-white font-medium text-lg">Gayathri</h2>
                    <p className="text-[#737373] text-sm">Engineer & Maker</p>
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
                                    ? 'bg-[#1e1e1e] text-white'
                                    : 'text-[#737373] hover:text-white hover:bg-[#1e1e1e]/50'
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </button>
                    )
                })}

                <div className="mt-6 mb-2 text-xs font-semibold text-[#525252] uppercase tracking-wider px-4">
                    Resources
                </div>

                <a
                    href="https://hashnode.com/@gayathrithedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#737373] hover:text-white hover:bg-[#1e1e1e]/50 transition-all duration-200 text-sm font-medium"
                >
                    <BookOpen size={18} />
                    Blog
                </a>
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 mt-auto">
                <div className="p-4 rounded-xl border border-[#262626] bg-[#0a0a0a]">
                    <div className="flex items-center gap-2 text-[#737373] text-sm mb-1">
                        <Clock size={14} />
                        <span>{currentDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#737373] text-sm">
                        <MapPin size={14} />
                        <span>India</span>
                    </div>
                </div>

                <button
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#262626] text-[#737373] hover:text-white hover:border-[#404040] transition-all duration-200 text-sm font-medium"
                >
                    <Download size={16} />
                    Download CV
                </button>

                <div className="flex items-center justify-between px-2">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 text-[#737373] hover:text-white transition-colors rounded-lg hover:bg-[#1e1e1e]"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {isAdmin && user && (
                        <button
                            onClick={onLogout}
                            className="p-2 text-[#737373] hover:text-red-400 transition-colors rounded-lg hover:bg-[#1e1e1e]"
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
