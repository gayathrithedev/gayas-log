import { useState, useEffect, useRef } from 'react'

const GITHUB_USERNAME = 'gayathrithedev'

// Theme-aligned contribution colors (dark mode green accent)
const LEVEL_COLORS = {
    0: 'rgba(255, 255, 255, 0.04)',  // empty - very subtle
    1: '#00E67633',                   // level 1 - light green
    2: '#00E67666',                   // level 2 - medium green  
    3: '#00E67699',                   // level 3 - dark green
    4: '#00E676',                     // level 4 - full green (accent)
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['Mon', 'Wed', 'Fri']

function GitHubContributions() {
    const [contributions, setContributions] = useState([])
    const [totalContributions, setTotalContributions] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tooltip, setTooltip] = useState(null)
    const gridRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        fetchContributions()
    }, [])

    // Scroll to the end (most recent) on load
    useEffect(() => {
        if (!loading && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
        }
    }, [loading])

    const fetchContributions = async () => {
        try {
            setLoading(true)
            // Use GitHub's contributions page which returns an SVG
            const response = await fetch(
                `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
            )

            if (!response.ok) throw new Error('Failed to fetch contributions')

            const data = await response.json()

            if (data.contributions && data.contributions.length > 0) {
                setContributions(data.contributions)
                setTotalContributions(data.total?.lastYear || data.contributions.reduce((sum, d) => sum + d.count, 0))
            } else {
                throw new Error('No contribution data')
            }
        } catch (err) {
            console.error('GitHub contributions error:', err)
            setError(err.message)
            // Generate fallback empty data
            generateFallbackData()
        } finally {
            setLoading(false)
        }
    }

    const generateFallbackData = () => {
        const today = new Date()
        const days = []
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            days.push({
                date: date.toISOString().split('T')[0],
                count: 0,
                level: 0,
            })
        }
        setContributions(days)
        setTotalContributions(0)
    }

    const getLevel = (count) => {
        if (count === 0) return 0
        if (count <= 2) return 1
        if (count <= 5) return 2
        if (count <= 9) return 3
        return 4
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    // Organize contributions into weeks (columns)
    const getWeeks = () => {
        if (contributions.length === 0) return []

        const weeks = []
        let currentWeek = []

        contributions.forEach((day) => {
            const date = new Date(day.date)
            const dayOfWeek = date.getDay() // 0=Sun, 6=Sat

            if (dayOfWeek === 0 && currentWeek.length > 0) {
                weeks.push(currentWeek)
                currentWeek = []
            }

            currentWeek.push({
                ...day,
                level: day.level !== undefined ? day.level : getLevel(day.count),
                dayOfWeek,
            })
        })

        if (currentWeek.length > 0) {
            weeks.push(currentWeek)
        }

        return weeks
    }

    // Get month labels with their positions
    const getMonthPositions = (weeks) => {
        const months = []
        let lastMonth = -1

        weeks.forEach((week, weekIndex) => {
            const firstDay = week[0]
            if (firstDay) {
                const date = new Date(firstDay.date)
                const month = date.getMonth()
                if (month !== lastMonth) {
                    months.push({
                        label: MONTH_LABELS[month],
                        position: weekIndex,
                    })
                    lastMonth = month
                }
            }
        })

        return months
    }

    const cellSize = 12
    const cellGap = 3
    const weeks = getWeeks()
    const monthPositions = getMonthPositions(weeks)

    if (loading) {
        return (
            <div className="pt-8 border-t border-[var(--border)]">
                <h2 className="text-[24px] font-semibold text-[var(--text-primary)] mb-5">Contributions</h2>
                <div className="flex items-center gap-3 text-[var(--text-secondary)] text-[14px]">
                    <div className="w-4 h-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
                    Loading contributions...
                </div>
            </div>
        )
    }

    return (
        <div className="pt-8 border-t border-[var(--border)]">
            <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">Contributions</h2>
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150"
                >
                    @{GITHUB_USERNAME} ↗
                </a>
            </div>

            {/* Contribution count */}
            <p className="text-[14px] text-[var(--text-secondary)] mb-4">
                <span className="text-[var(--text-primary)] font-medium">{totalContributions.toLocaleString()}</span>
                {' '}contributions in the last year
            </p>

            {/* Grid container */}
            <div
                ref={scrollRef}
                className="overflow-x-auto no-scrollbar"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                <div ref={gridRef} className="relative" style={{ minWidth: 'fit-content' }}>
                    {/* Month labels */}
                    <div className="flex mb-2 ml-[32px]" style={{ gap: 0 }}>
                        {monthPositions.map((month, i) => (
                            <div
                                key={i}
                                className="text-[11px] text-[var(--text-secondary)] absolute"
                                style={{
                                    left: 32 + month.position * (cellSize + cellGap),
                                    top: 0,
                                }}
                            >
                                {month.label}
                            </div>
                        ))}
                    </div>

                    {/* Grid with day labels */}
                    <div className="flex" style={{ paddingTop: 20 }}>
                        {/* Day labels */}
                        <div
                            className="flex flex-col justify-between mr-2"
                            style={{ height: 7 * (cellSize + cellGap) - cellGap }}
                        >
                            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
                                <span
                                    key={i}
                                    className="text-[11px] text-[var(--text-secondary)] leading-none"
                                    style={{ height: cellSize, display: 'flex', alignItems: 'center' }}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>

                        {/* Contribution cells */}
                        <div className="flex" style={{ gap: cellGap }}>
                            {weeks.map((week, weekIdx) => (
                                <div key={weekIdx} className="flex flex-col" style={{ gap: cellGap }}>
                                    {/* Pad the first week if it doesn't start on Sunday */}
                                    {weekIdx === 0 &&
                                        Array.from({ length: week[0]?.dayOfWeek || 0 }).map((_, i) => (
                                            <div
                                                key={`pad-${i}`}
                                                style={{
                                                    width: cellSize,
                                                    height: cellSize,
                                                    borderRadius: 2,
                                                }}
                                            />
                                        ))}
                                    {week.map((day, dayIdx) => (
                                        <div
                                            key={dayIdx}
                                            className="contribution-cell"
                                            style={{
                                                width: cellSize,
                                                height: cellSize,
                                                borderRadius: 2,
                                                backgroundColor: LEVEL_COLORS[day.level] || LEVEL_COLORS[0],
                                                cursor: 'pointer',
                                                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                const rect = e.target.getBoundingClientRect()
                                                setTooltip({
                                                    count: day.count,
                                                    date: formatDate(day.date),
                                                    x: rect.left + rect.width / 2,
                                                    y: rect.top,
                                                })
                                            }}
                                            onMouseLeave={() => setTooltip(null)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-[11px] text-[var(--text-secondary)]">Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        style={{
                            width: cellSize,
                            height: cellSize,
                            borderRadius: 2,
                            backgroundColor: LEVEL_COLORS[level],
                        }}
                    />
                ))}
                <span className="text-[11px] text-[var(--text-secondary)]">More</span>
            </div>

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="fixed z-50 pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 40,
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div
                        className="px-3 py-1.5 rounded-md text-[12px] font-medium whitespace-nowrap"
                        style={{
                            backgroundColor: 'var(--text-primary)',
                            color: 'var(--bg)',
                        }}
                    >
                        {tooltip.count === 0
                            ? 'No contributions'
                            : `${tooltip.count} contribution${tooltip.count !== 1 ? 's' : ''}`}{' '}
                        on {tooltip.date}
                    </div>
                </div>
            )}

            {error && (
                <p className="text-[12px] text-[var(--text-secondary)] mt-2 opacity-60">
                    Unable to load live data — showing placeholder
                </p>
            )}
        </div>
    )
}

export default GitHubContributions
