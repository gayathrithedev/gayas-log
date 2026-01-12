import { Clock } from 'lucide-react'

function ActivityList({ activities, loading }) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--border)] border-t-[var(--accent)]"></div>
        <p className="mt-4 text-[var(--text-secondary)]">Loading activities...</p>
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--text-secondary)]">
        <p className="text-lg">No activities logged today.</p>
        <p className="mt-2">Start logging! 🌱</p>
      </div>
    )
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    })
  }

  const getEnergyBadgeClass = (level) => {
    switch (level) {
      case 'high': return 'badge-energy-high'
      case 'medium': return 'badge-energy-medium'
      case 'low': return 'badge-energy-low'
      default: return 'bg-[var(--border)] text-[var(--text-secondary)]'
    }
  }

  const getLabelDisplay = (label) => {
    return label.replace('_', ' & ')
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id} 
          className="card hover:shadow-md transition-all duration-200 hover:border-[var(--accent)] hover:border-opacity-20"
        >
          <div className="flex items-start justify-between gap-6">
            {/* Activity text on left */}
            <p className="text-[var(--text-primary)] leading-relaxed text-[15px] flex-1">
              {activity.activity_text}
            </p>
            
            {/* Labels and time on right */}
            <div className="flex flex-col items-end gap-2 min-w-fit">
              <div className="flex items-center gap-2">
                <span className="badge badge-label capitalize">
                  {getLabelDisplay(activity.label)}
                </span>
                <span className={`badge ${getEnergyBadgeClass(activity.energy_level)} capitalize`}>
                  {activity.energy_level}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                <Clock size={11} />
                {formatTime(activity.created_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityList