import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ChevronRight, Calendar } from './Icons'
import ActivityList from './ActivityList'

function ArchivesView() {
  const [loading, setLoading] = useState(true)
  const [weekGroups, setWeekGroups] = useState([])
  const [expandedWeek, setExpandedWeek] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [filteredActivities, setFilteredActivities] = useState([])

  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  }

  const getWeekStartDate = (date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  const groupByWeek = (data) => {
    if (!data.length) return

    const groups = {}

    data.forEach(activity => {
      const date = new Date(activity.created_at)
      const weekNumber = getWeekNumber(date)
      const year = date.getFullYear()
      const weekKey = `${year}-W${weekNumber}`

      if (!groups[weekKey]) {
        const weekStart = getWeekStartDate(date)
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)

        groups[weekKey] = {
          weekNumber,
          year,
          weekKey,
          weekStart,
          weekEnd,
          dates: {}
        }
      }

      const dateKey = date.toISOString().split('T')[0]
      if (!groups[weekKey].dates[dateKey]) {
        groups[weekKey].dates[dateKey] = {
          date: new Date(dateKey),
          activities: []
        }
      }

      groups[weekKey].dates[dateKey].activities.push(activity)
    })

    const sortedGroups = Object.values(groups).sort((a, b) =>
      b.weekStart - a.weekStart
    )

    setWeekGroups(sortedGroups)

    // Auto-expand the most recent week so users know it's clickable
    if (sortedGroups.length > 0) {
      setExpandedWeek(sortedGroups[0].weekKey)

      // Also auto-open the most recent day so users know dates are clickable too
      const dates = Object.entries(sortedGroups[0].dates).sort((a, b) => b[1].date - a[1].date)
      if (dates.length > 0) {
        const [firstDateKey, firstDateData] = dates[0]
        setSelectedDate(firstDateKey)
        setFilteredActivities(firstDateData.activities)
      }
    }
  }

  const fetchAllActivities = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching activities:', error)
    } else {
      groupByWeek(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchAllActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const formatWeekRange = (weekStart, weekEnd) => {
    const start = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const end = weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    return `${start} - ${end}`
  }

  const formatDateFull = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleWeekClick = (weekKey) => {
    if (expandedWeek === weekKey) {
      setExpandedWeek(null)
      setSelectedDate(null)
      setFilteredActivities([])
    } else {
      setExpandedWeek(weekKey)
      setSelectedDate(null)
      setFilteredActivities([])
    }
  }

  const handleDateClick = (dateKey, activities) => {
    setSelectedDate(dateKey)
    setFilteredActivities(activities)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--border)] border-t-[var(--accent)]"></div>
      </div>
    )
  }

  if (!weekGroups.length) {
    return (
      <div className="text-center py-12 text-[var(--text-secondary)]">
        <p>No archived activities yet.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-2">
        {weekGroups.map((week) => {
          const isExpanded = expandedWeek === week.weekKey
          const totalActivities = Object.values(week.dates).reduce((sum, d) => sum + d.activities.length, 0)

          return (
            <div key={week.weekKey}>
              {/* Week folder */}
              <button
                onClick={() => handleWeekClick(week.weekKey)}
                className="w-full group"
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all duration-150"
                  style={{
                    background: isExpanded ? 'rgba(0, 230, 118, 0.06)' : 'transparent',
                    border: `1px solid ${isExpanded ? 'rgba(0, 230, 118, 0.15)' : 'var(--border)'}`,
                  }}
                >
                  {/* Folder icon */}
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                    style={{
                      background: isExpanded ? 'rgba(0, 230, 118, 0.12)' : 'var(--hover)',
                      color: isExpanded ? '#00E676' : 'var(--text-secondary)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {isExpanded ? (
                        <>
                          <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1" />
                          <path d="M20.5 11.5 17 22H5.5L2 11.5z" fill="currentColor" opacity="0.15" />
                          <path d="M20.5 11.5 17 22H5.5L2 11.5z" />
                        </>
                      ) : (
                        <>
                          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
                        </>
                      )}
                    </svg>
                  </div>

                  {/* Week info */}
                  <div className="flex-1 text-left min-w-0">
                    <span
                      className="font-medium text-[15px] transition-colors duration-150"
                      style={{ color: isExpanded ? '#00E676' : 'var(--text-primary)' }}
                    >
                      Week {week.weekNumber}
                    </span>
                    <span className="text-[13px] text-[var(--text-secondary)] ml-2">
                      {formatWeekRange(week.weekStart, week.weekEnd)}
                    </span>
                  </div>

                  {/* Activity count badge */}
                  <span
                    className="flex-shrink-0 text-[12px] font-medium px-2.5 py-0.5 rounded-full transition-all duration-150"
                    style={{
                      background: isExpanded ? 'rgba(0, 230, 118, 0.1)' : 'var(--hover)',
                      color: isExpanded ? '#00E676' : 'var(--text-secondary)',
                    }}
                  >
                    {totalActivities}
                  </span>

                  {/* Chevron */}
                  <div
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      color: isExpanded ? '#00E676' : 'var(--text-secondary)',
                    }}
                  >
                    <ChevronRight size={16} />
                  </div>
                </div>
              </button>

              {/* Dates list — nested inside */}
              {isExpanded && (
                <div className="ml-4 pl-2 mt-1 space-y-1">
                  {Object.entries(week.dates)
                    .sort((a, b) => b[1].date - a[1].date)
                    .map(([dateKey, dateData], dateIndex) => {
                      const isSelected = selectedDate === dateKey

                      return (
                        <div key={dateKey}>
                          {/* Divider between dates */}
                          {dateIndex > 0 && (
                            <div className="mx-3 my-1 border-t border-[var(--border)]" />
                          )}
                          {/* Date sub-folder */}
                          <button
                            onClick={() => handleDateClick(dateKey, dateData.activities)}
                            className="w-full group"
                          >
                            <div
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
                              style={{
                                background: isSelected ? 'rgba(0, 230, 118, 0.06)' : 'transparent',
                              }}
                            >
                              {/* Date icon */}
                              <div
                                className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150"
                                style={{
                                  color: isSelected ? '#00E676' : 'var(--text-secondary)',
                                }}
                              >
                                <Calendar size={14} />
                              </div>

                              {/* Date label */}
                              <span
                                className="flex-1 text-left text-[14px] transition-colors duration-150"
                                style={{
                                  color: isSelected ? '#00E676' : 'var(--text-primary)',
                                }}
                              >
                                {formatDateFull(dateData.date)}
                              </span>

                              {/* Count */}
                              <span className="flex-shrink-0 text-[12px] text-[var(--text-secondary)]">
                                {dateData.activities.length} {dateData.activities.length === 1 ? 'item' : 'items'}
                              </span>

                              {/* Chevron */}
                              <div
                                className="flex-shrink-0 transition-transform duration-200"
                                style={{
                                  transform: isSelected ? 'rotate(90deg)' : 'rotate(0deg)',
                                  color: isSelected ? '#00E676' : 'var(--text-secondary)',
                                }}
                              >
                                <ChevronRight size={14} />
                              </div>
                            </div>
                          </button>

                          {/* Activities — nested deeper */}
                          {isSelected && (
                            <div className="ml-4 pl-2 py-3">
                              <ActivityList activities={filteredActivities} loading={false} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArchivesView