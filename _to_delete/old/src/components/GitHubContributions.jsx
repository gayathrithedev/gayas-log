import { useState, useEffect, useRef } from 'react'

const GITHUB_USERNAME = 'gayathrithedev'

// Theme-aligned contribution colors (theme-aware dim orange accent)
const LEVEL_COLORS = {
    0: 'var(--contrib-0)',
    1: 'var(--contrib-1)',
    2: 'var(--contrib-2)',
    3: 'var(--contrib-3)',
    4: 'var(--contrib-4)',
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['Mon', 'Wed', 'Fri']

const getLevel = (count) => {
    if (count === 0) return 0
    if (count <= 2) return 1
    if (count <= 5) return 2
    if (count <= 9) return 3
    return 4
}

const formatDateKey = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getPublicPushCountsByDate = (events) => {
    const countsByDate = new Map()

    events
        .filter((event) => event.type === 'PushEvent')
        .forEach((event) => {
            const dateKey = formatDateKey(new Date(event.created_at))
            countsByDate.set(dateKey, (countsByDate.get(dateKey) || 0) + 1)
        })

    return countsByDate
}

const normalizeContributionsThroughToday = (apiContributions, publicPushCountsByDate = new Map()) => {
    const byDate = new Map(apiContributions.map((day) => [day.date, day]))
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const start = new Date(today)
    start.setDate(start.getDate() - 364)

    const days = []
    for (const date = new Date(start); date <= today; date.setDate(date.getDate() + 1)) {
        const dateKey = formatDateKey(date)
        const apiDay = byDate.get(dateKey)
        const apiCount = apiDay?.count || 0
        const publicPushCount = publicPushCountsByDate.get(dateKey) || 0
        const count = apiCount > 0 ? apiCount : publicPushCount

        days.push({
            date: dateKey,
            count,
            level: getLevel(count),
        })
    }

    return days
}

function GitHubContributions({ lastPushDate = null }) {
    const [contributions, setContributions] = useState([])
    const [totalContributions, setTotalContributions] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tooltip, setTooltip] = useState(null)
    const gridRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        let isActive = true

        const getSeededPublicPushCounts = () => {
            const countsByDate = new Map()
            if (lastPushDate) {
                countsByDate.set(formatDateKey(lastPushDate), 1)
            }
            return countsByDate
        }

        const mergePushCounts = (baseCounts, fetchedCounts) => {
            const merged = new Map(baseCounts)
            fetchedCounts.forEach((count, dateKey) => {
                merged.set(dateKey, Math.max(merged.get(dateKey) || 0, count))
            })
            return merged
        }

        const generateFallbackData = (publicPushCountsByDate = new Map()) => {
            const days = normalizeContributionsThroughToday([], publicPushCountsByDate)
            setContributions(days)
            setTotalContributions(days.reduce((sum, day) => sum + day.count, 0))
        }

        const fetchPublicPushCounts = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`)
                if (!response.ok) return new Map()

                const events = await response.json()
                return getPublicPushCountsByDate(Array.isArray(events) ? events : [])
            } catch {
                return new Map()
            }
        }

        const fetchContributions = async () => {
            try {
                setLoading(true)
                const [response, publicPushCountsByDate] = await Promise.all([
                    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`),
                    fetchPublicPushCounts(),
                ])
                const mergedPushCountsByDate = mergePushCounts(getSeededPublicPushCounts(), publicPushCountsByDate)

                if (!response.ok) throw new Error('Failed to fetch contributions')

                const data = await response.json()
                if (!isActive) return

                if (data.contributions && data.contributions.length > 0) {
                    const normalized = normalizeContributionsThroughToday(data.contributions, mergedPushCountsByDate)
                    setContributions(normalized)
                    setTotalContributions(normalized.reduce((sum, day) => sum + day.count, 0))
                } else {
                    throw new Error('No contribution data')
                }
            } catch (err) {
                if (!isActive) return
                console.error('GitHub contributions error:', err)
                setError(err.message)
                generateFallbackData(mergePushCounts(getSeededPublicPushCounts(), await fetchPublicPushCounts()))
            } finally {
                if (isActive) {
                    setLoading(false)
                }
            }
        }

        fetchContributions()

        return () => {
            isActive = false
        }
    }, [lastPushDate])

    // Scroll to the end (most recent) on load
    useEffect(() => {
        if (!loading && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
        }
    }, [loading])

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
                    const previous = months[months.length - 1]
                    if (!previous || weekIndex - previous.position >= 4) {
                        months.push({
                            label: MONTH_LABELS[month],
                            position: weekIndex,
                        })
                    }
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
            <div className="pt-0">
                <h2 className="text-[24px] font-semibold text-[var(--text-primary)] mb-5">Contributions</h2>
                <div className="flex items-center gap-3 text-[var(--text-secondary)] text-[14px]">
                    <div className="w-4 h-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
                    Loading contributions...
                </div>
            </div>
        )
    }

    return (
        <div className="pt-0">
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
