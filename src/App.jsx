
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Header from './components/Header'
import HomeView from './components/HomeView'
import TodayView from './components/TodayView'
import ArchivesView from './components/ArchivesView'
import PomodoroView from './components/PomodoroView'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import Sidebar from './components/Sidebar' // Added Sidebar import

// Check if this is the admin site
const IS_ADMIN = import.meta.env.VITE_IS_ADMIN === 'true'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Check dark mode preference
  // Check dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    const isDark = savedMode === null ? true : savedMode === 'true'

    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Show login modal on admin site if not logged in
  useEffect(() => {
    if (IS_ADMIN && !user && !checkingAuth) {
      setShowLoginModal(true)
    }
  }, [user, checkingAuth])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setCheckingAuth(false)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', !darkMode)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  // Show loading while checking auth on admin site
  if (IS_ADMIN && checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row"> {/* Updated main div class */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isAdmin={IS_ADMIN}
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Sidebar // Added Sidebar component
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isAdmin={IS_ADMIN}
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 w-full md:pl-72 transition-all duration-300"> {/* Updated main class */}
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-8 md:py-16"> {/* Adjusted content wrapper */}
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'today' && <TodayView user={user} isAdmin={IS_ADMIN} />}
          {activeTab === 'archives' && <ArchivesView />}
          {activeTab === 'pomodoro' && <PomodoroView />}
        </div>

        <div className="md:hidden"> {/* Footer adjusted to be hidden on desktop */}
          <Footer />
        </div>
      </main>

      {IS_ADMIN && showLoginModal && !user && (
        <LoginModal
          onClose={() => { }}
          onSuccess={() => {
            setShowLoginModal(false)
            checkUser()
          }}
        />
      )}
    </div>
  )
}

export default App