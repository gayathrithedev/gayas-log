import { useState, useEffect, useRef, useCallback } from 'react'

const SENTENCES = [
    "the quick brown fox jumps over the lazy dog near the river bank",
    "react hooks changed the way we build user interfaces forever",
    "every developer should learn to debug before writing new code",
    "git commit and push your changes before the end of the day",
    "the best code is the code you never have to write at all",
    "a good api design makes the frontend developer life easier",
    "javascript runs everywhere from browsers to servers to robots",
    "clean code reads like well written prose that tells a story",
    "deploy early deploy often and always monitor your production logs",
    "the cloud is just someone else computer running your application",
    "writing tests saves more time than it takes in the long run",
    "open source software powers most of the modern internet today",
    "learn one new thing every day and you will grow as a developer",
    "typescript adds safety to javascript without losing its flexibility",
    "containers changed how we ship and run software in production",
    "the command line is a developer most powerful tool after coffee",
    "pair programming helps catch bugs and share knowledge faster",
    "a well structured database makes your queries run much faster",
    "responsive design ensures your website works on every screen size",
    "version control is not optional it is essential for every project",
]

// Confetti particle
class Particle {
    constructor(canvas) {
        this.canvas = canvas
        this.reset()
    }
    reset() {
        this.x = Math.random() * this.canvas.width
        this.y = -10 - Math.random() * 40
        this.size = 4 + Math.random() * 6
        this.speedY = 2 + Math.random() * 3
        this.speedX = (Math.random() - 0.5) * 4
        this.rotation = Math.random() * 360
        this.rotationSpeed = (Math.random() - 0.5) * 10
        this.opacity = 1
        this.color = ['#00E676', '#00C853', '#69F0AE', '#A5D6A7', '#ffffff'][Math.floor(Math.random() * 5)]
    }
    update() {
        this.y += this.speedY
        this.x += this.speedX
        this.rotation += this.rotationSpeed
        this.speedY += 0.05 // gravity
        this.opacity -= 0.005
    }
    draw(ctx) {
        ctx.save()
        ctx.globalAlpha = Math.max(0, this.opacity)
        ctx.translate(this.x, this.y)
        ctx.rotate((this.rotation * Math.PI) / 180)
        ctx.fillStyle = this.color
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6)
        ctx.restore()
    }
}

function Confetti({ active }) {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const animFrameRef = useRef(null)

    useEffect(() => {
        if (!active) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Create particles
        particlesRef.current = Array.from({ length: 120 }, () => new Particle(canvas))

        let running = true
        const animate = () => {
            if (!running) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current.forEach(p => {
                p.update()
                p.draw(ctx)
            })

            // Check if all particles are done
            const allDone = particlesRef.current.every(p => p.opacity <= 0)
            if (!allDone) {
                animFrameRef.current = requestAnimationFrame(animate)
            }
        }

        animate()

        return () => {
            running = false
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        }
    }, [active])

    if (!active) return null

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
        />
    )
}

function FunView() {
    const [gameState, setGameState] = useState('idle') // idle, playing, finished
    const [text, setText] = useState('')
    const [typed, setTyped] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [timeLeft, setTimeLeft] = useState(30)
    const [duration] = useState(30) // 30 second test
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [correctChars, setCorrectChars] = useState(0)
    const [totalChars, setTotalChars] = useState(0)
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('typingHighScore') || '0')
    })
    const [showConfetti, setShowConfetti] = useState(false)
    const [cursorVisible, setCursorVisible] = useState(true)

    const inputRef = useRef(null)
    const timerRef = useRef(null)
    const cursorRef = useRef(null)

    // Blinking cursor
    useEffect(() => {
        cursorRef.current = setInterval(() => {
            setCursorVisible(v => !v)
        }, 530)
        return () => clearInterval(cursorRef.current)
    }, [])

    // Generate random text
    const generateText = useCallback(() => {
        const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, 4).join(' ')
    }, [])

    // Timer countdown
    useEffect(() => {
        if (gameState === 'playing' && startTime) {
            timerRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000)
                const remaining = duration - elapsed

                if (remaining <= 0) {
                    finishGame()
                } else {
                    setTimeLeft(remaining)
                }
            }, 200)
        }
        return () => clearInterval(timerRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState, startTime, duration])

    const startGame = () => {
        const newText = generateText()
        setText(newText)
        setTyped('')
        setCorrectChars(0)
        setTotalChars(0)
        setWpm(0)
        setAccuracy(100)
        setTimeLeft(duration)
        setStartTime(null)
        setGameState('playing')
        setShowConfetti(false)
        setTimeout(() => inputRef.current?.focus(), 50)
    }

    const finishGame = useCallback(() => {
        clearInterval(timerRef.current)
        setGameState('finished')
        setTimeLeft(0)

        // Calculate final WPM
        const elapsed = (Date.now() - startTime) / 1000 / 60 // minutes
        const words = correctChars / 5
        const finalWpm = Math.round(words / elapsed) || 0
        setWpm(finalWpm)

        // Check high score
        if (finalWpm > highScore) {
            setHighScore(finalWpm)
            localStorage.setItem('typingHighScore', finalWpm.toString())
            setShowConfetti(true)
            // Auto-hide confetti
            setTimeout(() => setShowConfetti(false), 4000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTime, correctChars, highScore])

    const handleInput = (e) => {
        if (gameState !== 'playing') return

        const value = e.target.value

        // Start timer on first keystroke
        if (!startTime) {
            setStartTime(Date.now())
        }

        setTyped(value)

        // Calculate stats
        let correct = 0
        for (let i = 0; i < value.length; i++) {
            if (value[i] === text[i]) correct++
        }

        setCorrectChars(correct)
        setTotalChars(value.length)
        setAccuracy(value.length > 0 ? Math.round((correct / value.length) * 100) : 100)

        // Live WPM
        if (startTime) {
            const elapsed = (Date.now() - startTime) / 1000 / 60
            if (elapsed > 0) {
                setWpm(Math.round((correct / 5) / elapsed))
            }
        }

        // If typed all text, finish
        if (value.length >= text.length) {
            finishGame()
        }
    }

    // Render the text with coloring
    const renderText = () => {
        return text.split('').map((char, i) => {
            let color = 'var(--text-secondary)' // untyped
            let bg = 'transparent'

            if (i < typed.length) {
                if (typed[i] === char) {
                    color = '#00E676' // correct
                } else {
                    color = '#FF5252' // wrong
                    bg = 'rgba(255, 82, 82, 0.1)'
                }
            }

            const isCursor = i === typed.length

            return (
                <span
                    key={i}
                    style={{
                        color,
                        backgroundColor: bg,
                        borderLeft: isCursor && cursorVisible ? '2px solid #00E676' : '2px solid transparent',
                        transition: 'color 0.05s',
                    }}
                >
                    {char}
                </span>
            )
        })
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Confetti active={showConfetti} />

            <p className="text-center mb-8 text-[var(--text-secondary)]">
                Test your typing speed! Start typing when you're ready — the timer begins on your first keystroke.
            </p>

            {/* Stats bar */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-5">
                    <div className="text-center">
                        <div
                            className="text-[28px] font-bold tabular-nums"
                            style={{ color: gameState === 'finished' ? '#00E676' : 'var(--text-primary)' }}
                        >
                            {wpm}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">WPM</div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-[28px] font-bold tabular-nums"
                            style={{ color: accuracy >= 95 ? '#00E676' : accuracy >= 80 ? '#FFB74D' : '#FF5252' }}
                        >
                            {accuracy}%
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">Accuracy</div>
                    </div>
                </div>
                <div className="text-center">
                    <div
                        className="text-[28px] font-bold tabular-nums"
                        style={{ color: timeLeft <= 5 && gameState === 'playing' ? '#FF5252' : 'var(--text-primary)' }}
                    >
                        {timeLeft}s
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">Time</div>
                </div>
            </div>

            {/* Best score */}
            <div className="flex items-center justify-center mb-4">
                <span className="text-[13px] text-[var(--text-secondary)]">
                    Personal Best:{' '}
                    <span className="text-[var(--text-primary)] font-medium">{highScore} WPM</span>
                </span>
            </div>

            {/* Typing area */}
            <div
                className="relative border border-[var(--border)] rounded-[10px] p-5 sm:p-6 mb-6 cursor-text min-h-[180px]"
                style={{
                    background: gameState === 'playing' ? 'rgba(0, 230, 118, 0.02)' : 'transparent',
                    borderColor: gameState === 'playing' ? 'rgba(0, 230, 118, 0.15)' : 'var(--border)',
                    transition: 'all 0.2s ease',
                }}
                onClick={() => inputRef.current?.focus()}
            >
                {gameState === 'idle' ? (
                    <div className="flex flex-col items-center justify-center h-[180px] gap-4">
                        <p className="text-[var(--text-secondary)] text-center text-[15px]">
                            Ready to test your typing speed?
                        </p>
                        <button
                            onClick={startGame}
                            className="px-6 py-2.5 rounded-[10px] font-medium text-sm transition-all duration-150 active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #00E676 0%, #00C853 100%)',
                                color: '#000',
                            }}
                        >
                            Start Typing Test
                        </button>
                    </div>
                ) : (
                    <>
                        <div
                            className="text-[17px] sm:text-[18px] leading-[1.8] font-mono select-none"
                            style={{ wordBreak: 'break-all' }}
                        >
                            {renderText()}
                        </div>
                        {/* Hidden input */}
                        <input
                            ref={inputRef}
                            type="text"
                            value={typed}
                            onChange={handleInput}
                            className="absolute opacity-0 top-0 left-0 w-full h-full"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            disabled={gameState === 'finished'}
                        />
                    </>
                )}

                {/* Finished overlay */}
                {gameState === 'finished' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg)]/90 backdrop-blur-sm rounded-[10px]">
                        <div className="text-center mb-6">
                            <div
                                className="text-[48px] font-bold mb-1"
                                style={{ color: '#00E676' }}
                            >
                                {wpm} WPM
                            </div>
                            <p className="text-[var(--text-secondary)] text-[14px]">
                                {accuracy}% accuracy · {correctChars} correct characters
                            </p>
                            {wpm >= highScore && wpm > 0 && (
                                <p
                                    className="mt-2 text-[14px] font-medium"
                                    style={{ color: '#00E676' }}
                                >
                                    🎉 New personal best!
                                </p>
                            )}
                        </div>
                        <button
                            onClick={startGame}
                            className="px-6 py-2.5 rounded-[10px] font-medium text-sm transition-all duration-150 active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #00E676 0%, #00C853 100%)',
                                color: '#000',
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            {gameState === 'playing' && (
                <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-150"
                        style={{
                            width: `${Math.min(100, (typed.length / text.length) * 100)}%`,
                            background: 'linear-gradient(90deg, #00C853, #00E676)',
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default FunView
