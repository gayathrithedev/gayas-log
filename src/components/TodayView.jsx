import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'

function TodayView({ user, isAdmin }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  const handleNewActivity = (newActivity) => {
    // Check if it's from today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const activityDate = new Date(newActivity.created_at)
    
    if (activityDate >= today) {
      setActivities((prev) => [newActivity, ...prev])
    }
  }

  const handleActivityAdded = (newActivity) => {
    // Optimistically add to list
    setActivities((prev) => [newActivity, ...prev])
  }

  return (
    <div>
      {/* Show form only on admin site when logged in */}
      {isAdmin && user && (
        <ActivityForm onActivityAdded={handleActivityAdded} />
      )}
      
      {/* Activity List - visible to everyone */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
          Today's Activities
        </h2>
        <ActivityList activities={activities} loading={loading} />
      </div>
    </div>
  )
}

export default TodayView