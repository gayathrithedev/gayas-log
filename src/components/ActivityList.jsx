import { Clock, Zap } from './Icons'

function ActivityList({ activities, loading }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[var(--border)] border-t-[var(--text-primary)]"></div>
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

  const getLabelDisplay = (label) => {
    return label.replace('_', ' & ')
  }

  const getEnergyColor = (energy) => {
    switch (energy.toLowerCase()) {
      case 'high':
        return 'text-[#D99061]'
      case 'medium':
        return 'text-[#F59E0B]'
      case 'low':
        return 'text-[#EF4444]'
      default:
        return 'text-[var(--text-secondary)]'
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="card group">
          {/* Activity text */}
          <p className="text-[var(--text-primary)] text-base leading-relaxed mb-3">
            {activity.activity_text}
          </p>

          {/* Resource Link - Show if link exists */}
          {activity.resource_link && (
            <div className="mb-4">
              <a
                href={activity.resource_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity inline-flex items-center gap-1"
              >
                <span>↗</span>
                View Resource
              </a>
            </div>
          )}

          {/* Metadata line */}
          <div className="text-xs text-[var(--text-secondary)] flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatTime(activity.created_at)}
            </span>
            <span className="text-[var(--border)]">•</span>
            <span className="capitalize">{getLabelDisplay(activity.label)}</span>
            <span className="text-[var(--border)]">•</span>
            <span className={`capitalize flex items-center gap-1 font-medium ${getEnergyColor(activity.energy_level)}`}>
              <Zap size={14} />
              {activity.energy_level}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityList