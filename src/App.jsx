import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Header from './components/Header'
import TodayView from './components/TodayView'
import ArchivesView from './components/ArchivesView'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

// Check if this is the admin site
const IS_ADMIN = import.meta.env.VITE_IS_ADMIN === 'true'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('today')
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
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
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
    <div className="min-h-screen flex flex-col">
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isAdmin={IS_ADMIN}
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
        {activeTab === 'today' && <TodayView user={user} isAdmin={IS_ADMIN} />}
        {activeTab === 'archives' && <ArchivesView />}
      </main>
      
      <Footer />
      
      {IS_ADMIN && showLoginModal && !user && (
        <LoginModal 
          onClose={() => {}} 
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