import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import TodayView from './components/TodayView'
import ArchivesView from './components/ArchivesView'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('today')
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

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

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', !darkMode)
  }

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <TabNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="flex-1 w-full max-w-[60%] mx-auto px-4 py-8 md:max-w-[60%] sm:max-w-full">
        {activeTab === 'today' && <TodayView user={user} />}
        {activeTab === 'archives' && <ArchivesView />}
      </main>
      
      <Footer />
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
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