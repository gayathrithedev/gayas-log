import React from 'react';
import { Home, Calendar, Archive, Timer, LogOut } from './Icons';

function BottomDock({ isAdmin, user, onLogout, activeTab, setActiveTab }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'today', icon: Calendar, label: 'Today' },
        { id: 'archives', icon: Archive, label: 'Archives' },
        { id: 'pomodoro', icon: Timer, label: 'Pomodoro' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg bg-[var(--content-bg)] border border-[var(--border)] backdrop-blur-xl">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg transition-all duration-300 group"
                            aria-label={item.label}
                        >
                            <div className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--accent-cyan)] text-black' : 'text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)]'}`}>
                                <Icon size={22} />
                            </div>
                        </button>
                    )
                })}

                {isAdmin && user && (
                    <>
                        <div className="w-[1px] h-8 bg-[var(--border)] mx-1 sm:mx-2" />

                        <button
                            onClick={onLogout}
                            className="relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg transition-all duration-300 group"
                            title="Logout"
                        >
                            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-[var(--text-secondary)] group-hover:text-[var(--accent-magenta)] transition-all">
                                <LogOut size={22} />
                            </div>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default BottomDock;