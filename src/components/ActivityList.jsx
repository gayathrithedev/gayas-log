import { Clock } from 'lucide-react'

function ActivityList({ activities, loading }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--border)] border-t-[var(--accent)]"></div>
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--text-secondary)]">
        <p>No activities logged today.</p>
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getLabelDisplay = (label) => {
    return label.replace('_', ' & ')
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-[var(--content-bg)] rounded-lg p-6">
          {/* Activity text */}
          <p className="text-[var(--text-primary)] text-base leading-relaxed mb-4">
            {activity.activity_text}
          </p>

          {/* Metadata line - removed date */}
          <div className="text-xs text-[var(--text-secondary)] flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {formatTime(activity.created_at)}
            </span>
            <span>|</span>
            <span className="capitalize">{getLabelDisplay(activity.label)}</span>
            <span>|</span>
            <span className="capitalize">{activity.energy_level} energy</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityList