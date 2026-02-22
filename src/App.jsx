import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Header from './components/Header'
import HomeView from './components/HomeView'
import TodayView from './components/TodayView'
import ArchivesView from './components/ArchivesView'
import PomodoroView from './components/PomodoroView'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

// Check if this is the admin site
const IS_ADMIN = import.meta.env.VITE_IS_ADMIN === 'true'

function App() {
  const [activeTab, setActiveTab] = useState('home')
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

  // Force dark mode for now (can hook up to theme toggler later)
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

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

  // Show loading while checking auth on admin site
  if (IS_ADMIN && checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-[var(--text-secondary)]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-150 relative">
      <Header
        isAdmin={IS_ADMIN}
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 w-full pb-24">
        <div className="w-[90%] md:w-[40%] mx-auto mt-4">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'today' && <TodayView user={user} isAdmin={IS_ADMIN} />}
          {activeTab === 'archives' && <ArchivesView />}
          {activeTab === 'pomodoro' && <PomodoroView />}

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