import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

function PomodoroView() {
    const [focusTime, setFocusTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5)
    const [currentTime, setCurrentTime] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const intervalRef = useRef(null)

    useEffect(() => {
        if (isRunning && currentTime > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev <= 1) {
                        // Timer finished
                        setIsRunning(false)
                        playNotificationSound()

                        // Auto-switch between focus and break
                        if (isBreak) {
                            setIsBreak(false)
                            return focusTime * 60
                        } else {
                            setIsBreak(true)
                            return breakTime * 60
                        }
                    }
                    return prev - 1
                })
            }, 1000)
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
    }, [isRunning, currentTime, isBreak, focusTime, breakTime])

    const playNotificationSound = () => {
        // Simple browser notification sound
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizYIGGS56+mihCA=')
        audio.play().catch(() => { }) // Ignore if autoplay is blocked
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleStart = () => {
        if (!isRunning) {
            setCurrentTime(isBreak ? breakTime * 60 : focusTime * 60)
        }
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        setIsBreak(false)
        setCurrentTime(focusTime * 60)
    }

    const handleFocusChange = (value) => {
        const time = parseInt(value) || 0
        setFocusTime(time)
        if (!isRunning && !isBreak) {
            setCurrentTime(time * 60)
        }
    }

    const handleBreakChange = (value) => {
        const time = parseInt(value) || 0
        setBreakTime(time)
        if (!isRunning && isBreak) {
            setCurrentTime(time * 60)
        }
    }

    const progress = isBreak
        ? ((breakTime * 60 - currentTime) / (breakTime * 60)) * 100
        : ((focusTime * 60 - currentTime) / (focusTime * 60)) * 100

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                Pomodoro Timer
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8">
                I use pomodoro for my daily tasks. If you wanna try it, go ahead and try it for yourself.
                I know you can do at least 3 pomodoros continuously. Let's GO!
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
                        {isBreak ? 'Break Time' : 'Focus Time'}
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
                            className="transition-all duration-1000"
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
            </div>
        </div>
    )
}

export default PomodoroView