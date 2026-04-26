import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Header from './components/Header'
import HomeView from './components/HomeView'
import TodayView from './components/TodayView'
import PomodoroView from './components/PomodoroView'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

// Check if this is the admin site
const IS_ADMIN = import.meta.env.VITE_IS_ADMIN === 'true'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  })
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setCheckingAuth(false)
  }

  // Check if user is logged in on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Persist and apply dark/light mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  // Show login modal on admin site if not logged in
  useEffect(() => {
    if (IS_ADMIN && !user && !checkingAuth) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLoginModal(true)
    }
  }, [user, checkingAuth])


  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const pageTabs = ['home', 'today', 'pomodoro']
  const visibleTab = activeTab === 'archives'
    ? 'today'
    : pageTabs.includes(activeTab) ? activeTab : 'home'

  // Show loading while checking auth on admin site
  if (IS_ADMIN && checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-150 relative overflow-x-hidden">
      <Header
        isAdmin={IS_ADMIN}
        user={user}
        onLogout={handleLogout}
        activeTab={visibleTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 w-full pb-24">
        <div className="w-[92%] max-w-5xl mx-auto mt-4">
          {visibleTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
          {visibleTab === 'today' && (
            <TodayView
              user={user}
              isAdmin={IS_ADMIN}
              showArchivesOnLoad={activeTab === 'archives'}
            />
          )}
          {visibleTab === 'pomodoro' && <PomodoroView />}

          <div className="mt-12">
            <Footer />
          </div>
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
