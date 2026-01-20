import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { ChevronDown, ChevronRight } from 'lucide-react'
import ActivityList from './ActivityList'

function ArchivesView() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [weekGroups, setWeekGroups] = useState([])
  const [expandedWeek, setExpandedWeek] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [filteredActivities, setFilteredActivities] = useState([])

  useEffect(() => {
    fetchAllActivities()
  }, [])

  const fetchAllActivities = async () => {
    setLoading(true)
    
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching activities:', error)
    } else {
      setActivities(data || [])
      groupByWeek(data || [])
    }
    
    setLoading(false)
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
  }

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
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">
        Archives
      </h2>

      <div className="space-y-4">
        {weekGroups.map(week => (
          <div key={week.weekKey} className="border border-[var(--border)] rounded-lg overflow-hidden">
            {/* Week Header */}
            <button
              onClick={() => handleWeekClick(week.weekKey)}
              className="w-full px-6 py-4 bg-[var(--content-bg)] hover:bg-[var(--hover)] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {expandedWeek === week.weekKey ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <span className="font-medium text-[var(--text-primary)]">
                  Week {week.weekNumber}, {week.year}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                  {formatWeekRange(week.weekStart, week.weekEnd)}
                </span>
              </div>
              <span className="text-sm text-[var(--text-secondary)]">
                {Object.values(week.dates).reduce((sum, d) => sum + d.activities.length, 0)} {Object.values(week.dates).reduce((sum, d) => sum + d.activities.length, 0) === 1 ? 'activity' : 'activities'}
              </span>
            </button>

            {/* Dates List */}
            {expandedWeek === week.weekKey && (
              <div className="border-t border-[var(--border)]">
                {Object.entries(week.dates).sort((a, b) => b[1].date - a[1].date).map(([dateKey, dateData]) => (
                  <div key={dateKey}>
                    <button
                      onClick={() => handleDateClick(dateKey, dateData.activities)}
                      className={`w-full px-8 py-3 text-left hover:bg-[var(--hover)] transition-colors flex items-center justify-between ${
                        selectedDate === dateKey ? 'bg-[var(--hover)]' : ''
                      }`}
                    >
                      <span className="text-[var(--text-primary)]">
                        {formatDateFull(dateData.date)}
                      </span>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {dateData.activities.length} {dateData.activities.length === 1 ? 'activity' : 'activities'}
                      </span>
                    </button>

                    {/* Activities for selected date */}
                    {selectedDate === dateKey && (
                      <div className="px-8 py-6 bg-[var(--bg)]">
                        <ActivityList activities={filteredActivities} loading={false} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchivesView