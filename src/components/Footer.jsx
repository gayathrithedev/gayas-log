import { Twitter, BookOpen, Sparkles } from 'lucide-react'

function Footer() {
  return (
    <footer className="sticky bottom-0 bg-[var(--content-bg)] border-t border-[var(--border)] mt-auto">
      <div className="w-full max-w-[60%] mx-auto px-4 py-4 flex justify-between items-center text-sm text-[var(--text-secondary)] md:max-w-[60%] sm:max-w-full sm:flex-col sm:gap-2">
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/gayathrithedev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors duration-claude"
          >
            <Twitter size={18} />
            <span>Twitter</span>
          </a>
          <a
            href="https://hashnode.com/@gayathrithedev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors duration-claude"
          >
            <BookOpen size={18} />
            <span>Hashnode</span>
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <span>© 2025 Gayathri Perumal</span>
          <span>•</span>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors duration-claude"
          >
            <span>Built with</span>
            <Sparkles size={14} className="text-[var(--accent)]" />
            <span>Claude</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer