import { Twitter, BookOpen } from 'lucide-react'

function Footer() {
  return (
    <footer className="sticky bottom-0 bg-[var(--content-bg)] border-t border-[var(--border)] mt-auto">
      <div className="w-full max-w-[60%] mx-auto px-4 py-4 flex justify-between items-center text-sm text-[var(--text-secondary)] md:max-w-[60%] sm:max-w-full sm:flex-col sm:gap-2">
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors duration-claude"
          >
            <Twitter size={18} />
            <span>Twitter</span>
          </a>
          <a
            href="https://hashnode.com/@yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors duration-claude"
          >
            <BookOpen size={18} />
            <span>Hashnode</span>
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <span>© 2026 Gayathri Perumal</span>
          <span>•</span>
          <span>Built with Claude</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer