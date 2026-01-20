function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="text-xs text-[var(--text-secondary)] text-center">
          © 2026 Gayathri Perumal • Built with{' '}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--text-primary)] transition-colors"
          >
            Claude
          </a>
          {' '}•{' '}
          <a
            href="https://twitter.com/gayathrithedev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--text-primary)] transition-colors"
          >
            Twitter
          </a>
          {' '}•{' '}
          <a
            href="https://hashnode.com/@gayathrithedev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--text-primary)] transition-colors"
          >
            Hashnode
          </a>
          {' '}•{' '}
          <a
            href="https://github.com/gayathrithedev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer