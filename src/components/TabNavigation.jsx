function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-[var(--content-bg)] border-b border-[var(--border)]">
      <div className="w-full max-w-[60%] mx-auto px-4 md:max-w-[60%] sm:max-w-full">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('today')}
            className={`tab ${activeTab === 'today' ? 'tab-active' : ''}`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('archives')}
            className={`tab ${activeTab === 'archives' ? 'tab-active' : ''}`}
          >
            Archives
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TabNavigation