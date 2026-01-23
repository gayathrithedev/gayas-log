import { useState } from 'react'
import { supabase } from '../lib/supabase'

const LABELS = [
  { value: 'work', label: 'Work' },
  { value: 'study', label: 'Study' },
  { value: 'workout', label: 'Workout' }
]

const ENERGY_LEVELS = [
  { value: 'high', label: 'High', activeClass: 'energy-btn-high', inactiveClass: 'energy-btn-high-inactive' },
  { value: 'medium', label: 'Medium', activeClass: 'energy-btn-medium', inactiveClass: 'energy-btn-medium-inactive' },
  { value: 'low', label: 'Low', activeClass: 'energy-btn-low', inactiveClass: 'energy-btn-low-inactive' }
]

function ActivityForm({ onActivityAdded }) {
  const [activityText, setActivityText] = useState('')
  const [label, setLabel] = useState('work')
  const [energyLevel, setEnergyLevel] = useState('medium')
  const [resourceLink, setResourceLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: submitError } = await supabase
      .from('activities')
      .insert([
        {
          activity_text: activityText,
          label: label,
          energy_level: energyLevel,
          ...(label === 'study' && resourceLink && { resource_link: resourceLink })
        }
      ])
      .select()

    if (submitError) {
      setError(submitError.message)
      setLoading(false)
    } else {
      // Clear form
      setActivityText('')
      setLabel('work')
      setEnergyLevel('medium')
      setResourceLink('')
      setLoading(false)
      
      // Notify parent to refresh list
      if (onActivityAdded) {
        onActivityAdded(data[0])
      }
    }
  }

  return (
    <div className="card mb-8">
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-primary)]">
        Log Activity
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Activity Text */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            What did you do?
          </label>
          <textarea
            value={activityText}
            onChange={(e) => setActivityText(e.target.value)}
            className="input-field min-h-[120px] resize-none"
            placeholder="Describe your activity..."
            required
          />
        </div>

        {/* Label Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            Category
          </label>
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="input-field cursor-pointer"
          >
            {LABELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Resource Link - Only show for Study category */}
        {label === 'study' && (
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
              Resource Link (Optional)
            </label>
            <input
              type="url"
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
              className="input-field"
              placeholder="https://example.com/video"
            />
          </div>
        )}

        {/* Energy Level */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">
            Energy Level
          </label>
          <div className="grid grid-cols-3 gap-3">
            {ENERGY_LEVELS.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setEnergyLevel(level.value)}
                className={`energy-btn ${
                  energyLevel === level.value 
                    ? level.activeClass
                    : level.inactiveClass
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-sm text-[#DC2626] bg-[#DC2626] bg-opacity-10 p-3 rounded-lg border border-[#DC2626] border-opacity-20">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Posting...' : 'Post Activity'}
        </button>
      </form>
    </div>
  )
}

export default ActivityForm