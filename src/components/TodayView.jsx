import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'
import ArchivesView from './ArchivesView'
import { Archive } from './Icons'

function TodayView({ user, isAdmin, showArchivesOnLoad = false }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showArchives, setShowArchives] = useState(false)
  const archivesRef = useRef(null)

  const handleNewActivity = (newActivity) => {
    // Check if it's from today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const activityDate = new Date(newActivity.created_at)

    if (activityDate >= today) {
      setActivities((prev) => [newActivity, ...prev])
    }
  }

  const fetchTodayActivities = async () => {
    setLoading(true)

    // Get start of today in user's timezone
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .gte('created_at', today.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching activities:', error)
    } else {
      setActivities(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTodayActivities()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('activities-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activities'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            handleNewActivity(payload.new)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])



  const handleActivityAdded = (newActivity) => {
    // Optimistically add to list
    setActivities((prev) => [newActivity, ...prev])
  }

  const handleShowArchives = () => {
    setShowArchives(true)
    window.setTimeout(() => {
      archivesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const archivesVisible = showArchives || showArchivesOnLoad

  return (
    <div className="mx-auto max-w-2xl">
      {/* Show form only on admin site when logged in */}
      {isAdmin && user && (
        <ActivityForm onActivityAdded={handleActivityAdded} />
      )}

      {/* Activity List - visible to everyone */}
      <div>
        <ActivityList activities={activities} loading={loading} />
      </div>

      <button
        type="button"
        onClick={handleShowArchives}
        aria-expanded={archivesVisible}
        className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--text-secondary)] underline decoration-[var(--border-accent)] underline-offset-4 transition-colors duration-150 hover:text-[var(--accent)]"
      >
        <span>Archives</span>
        <Archive size={16} />
      </button>

      {archivesVisible && (
        <div ref={archivesRef} className="mt-8">
          <ArchivesView excludeToday />
        </div>
      )}
    </div>
  )
}

export default TodayView
