import GitHubContributions from './GitHubContributions'
import BlogPosts from './BlogPosts'

function HomeView() {
    return (
        <div className="w-full">
            <div className="mb-10 text-[16px] space-y-5 text-[var(--text-secondary)] leading-relaxed">
                <p>
                    I document my everyday activities to identify patterns and understand myself better.
                </p>
                <p>
                    This log tracks what I do, when I do it, and how my energy levels fluctuate throughout the day. A personal experiment in self-awareness and productivity.
                </p>
            </div>

            <div className="pt-8 border-t border-[var(--border)]">
                <h2 className="text-[24px] font-semibold text-[var(--text-primary)] mb-5">Say hello</h2>
                <p className="text-[16px] text-[var(--text-secondary)] mb-6">
                    I'm always open to discussing tech, side projects, or interesting ideas. Feel free to reach out!
                </p>

                <div className="flex items-center flex-wrap gap-3 sm:gap-5 text-[16px]">
                    <a href="mailto:gayathrithedev@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150" aria-label="Email">
                        Email ↗
                    </a>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <a href="https://twitter.com/gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150">
                        Twitter ↗
                    </a>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <a href="https://linkedin.com/in/gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150">
                        LinkedIn ↗
                    </a>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <a href="https://github.com/gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150">
                        GitHub ↗
                    </a>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <a href="https://hashnode.com/@gayathrithedev" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150">
                        Hashnode ↗
                    </a>
                </div>
            </div>

            <div className="mt-10">
                <GitHubContributions />
            </div>

            <div className="mt-10">
                <BlogPosts />
            </div>
        </div>
    )
}

export default HomeView