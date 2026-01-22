import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

function PomodoroView() {
  const [focusTime, setFocusTime] = useState(() => {
    const saved = localStorage.getItem('pomodoroFocusTime')
    return saved ? parseInt(saved) : 25
  })
  const [breakTime, setBreakTime] = useState(() => {
    const saved = localStorage.getItem('pomodoroBreakTime')
    return saved ? parseInt(saved) : 5
  })
  const [currentTime, setCurrentTime] = useState(() => {
    const saved = localStorage.getItem('pomodoroCurrentTime')
    return saved ? parseInt(saved) : 25 * 60
  })
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem('pomodoroIsRunning')
    return saved === 'true'
  })
  const [isBreak, setIsBreak] = useState(() => {
    const saved = localStorage.getItem('pomodoroIsBreak')
    return saved === 'true'
  })
  const [lastTick, setLastTick] = useState(() => {
    const saved = localStorage.getItem('pomodoroLastTick')
    return saved ? parseInt(saved) : Date.now()
  })
  
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  // Initialize audio
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizYIGGS56+mihCA=')
  }, [])

  // Sync timer across tabs/pages
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'pomodoroCurrentTime') setCurrentTime(parseInt(e.newValue))
      if (e.key === 'pomodoroIsRunning') setIsRunning(e.newValue === 'true')
      if (e.key === 'pomodoroIsBreak') setIsBreak(e.newValue === 'true')
      if (e.key === 'pomodoroFocusTime') setFocusTime(parseInt(e.newValue))
      if (e.key === 'pomodoroBreakTime') setBreakTime(parseInt(e.newValue))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Main timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const savedLastTick = parseInt(localStorage.getItem('pomodoroLastTick') || now)
        const elapsed = Math.floor((now - savedLastTick) / 1000)
        
        if (elapsed >= 1) {
          setCurrentTime((prev) => {
            const newTime = prev - elapsed
            
            if (newTime <= 0) {
              // Timer finished
              playBeep()
              setIsRunning(false)
              localStorage.setItem('pomodoroIsRunning', 'false')
              
              // Auto-switch between focus and break
              const newIsBreak = !isBreak
              const nextTime = newIsBreak ? breakTime * 60 : focusTime * 60
              
              setIsBreak(newIsBreak)
              localStorage.setItem('pomodoroIsBreak', newIsBreak.toString())
              localStorage.setItem('pomodoroCurrentTime', nextTime.toString())
              
              return nextTime
            }
            
            localStorage.setItem('pomodoroCurrentTime', newTime.toString())
            localStorage.setItem('pomodoroLastTick', now.toString())
            setLastTick(now)
            
            return newTime
          })
        }
      }, 100) // Check every 100ms for accuracy
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, isBreak, focusTime, breakTime])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pomodoroFocusTime', focusTime.toString())
  }, [focusTime])

  useEffect(() => {
    localStorage.setItem('pomodoroBreakTime', breakTime.toString())
  }, [breakTime])

  useEffect(() => {
    localStorage.setItem('pomodoroIsRunning', isRunning.toString())
    if (isRunning) {
      localStorage.setItem('pomodoroLastTick', Date.now().toString())
      setLastTick(Date.now())
    }
  }, [isRunning])

  useEffect(() => {
    localStorage.setItem('pomodoroIsBreak', isBreak.toString())
  }, [isBreak])

  const playBeep = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
    
    // Also try browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: isBreak ? 'Break time is over!' : 'Focus time is over!',
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>'
      })
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    if (!isRunning) {
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    const newTime = focusTime * 60
    setCurrentTime(newTime)
    localStorage.setItem('pomodoroIsRunning', 'false')
    localStorage.setItem('pomodoroIsBreak', 'false')
    localStorage.setItem('pomodoroCurrentTime', newTime.toString())
    localStorage.setItem('pomodoroLastTick', Date.now().toString())
  }

  const handleFocusChange = (value) => {
    const time = parseInt(value) || 0
    setFocusTime(time)
    if (!isRunning && !isBreak) {
      const newTime = time * 60
      setCurrentTime(newTime)
      localStorage.setItem('pomodoroCurrentTime', newTime.toString())
    }
  }

  const handleBreakChange = (value) => {
    const time = parseInt(value) || 0
    setBreakTime(time)
    if (!isRunning && isBreak) {
      const newTime = time * 60
      setCurrentTime(newTime)
      localStorage.setItem('pomodoroCurrentTime', newTime.toString())
    }
  }

  const progress = isBreak 
    ? ((breakTime * 60 - currentTime) / (breakTime * 60)) * 100
    : ((focusTime * 60 - currentTime) / (focusTime * 60)) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center mb-8 text-[var(--text-secondary)]">
        I use pomodoro for my daily tasks. If you wanna try it, go ahead and try it for yourself. I know you can do at least 3 pomodoros continuously. Let's GO!
      </p>

      {/* Settings */}
      <div className="card mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
              Focus Time (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={focusTime}
              onChange={(e) => handleFocusChange(e.target.value)}
              disabled={isRunning}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
              Break Time (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakTime}
              onChange={(e) => handleBreakChange(e.target.value)}
              disabled={isRunning}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="card text-center">
        <div className="mb-4">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {isBreak ? '☕ Break Time' : '🎯 Focus Time'}
          </span>
        </div>

        {/* Circular Progress */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <svg className="w-64 h-64 transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="var(--border)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke={isBreak ? '#10b981' : '#3b82f6'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute">
            <div className="text-6xl font-bold text-[var(--text-primary)]">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleStart}
            className="btn-primary px-8 py-3 flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Pause size={20} />
                Pause
              </>
            ) : (
              <>
                <Play size={20} />
                Start
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary px-8 py-3 flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        {isRunning && (
          <p className="mt-4 text-sm text-[var(--text-secondary)]">
            Timer continues even if you switch tabs or close the window
          </p>
        )}
      </div>
    </div>
  )
}

export default PomodoroView