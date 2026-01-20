import {
    Twitter, BookOpen, GithubIcon
} from 'lucide-react'

function HomeView() {
    return (
        <div className="max-w-3xl">
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">
                    👋 Welcome to Gaya's Log
                </h1>

                <p className="text-md text-[var(--text-secondary)] leading-relaxed">
                    Hi, This is Gayathri. I am documenting my everyday activities and identifying my patterns.

                    This log helps me track what I do, when I do it, and how my energy levels fluctuate throughout the day.
                    It's a personal experiment in self-awareness and productivity.
                </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <a
                    href="https://twitter.com/gayathrithedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--text-primary)] transition-colors"
                    aria-label="Twitter"
                >
                    <Twitter size={24} />
                </a>
                <a
                    href="https://hashnode.com/@gayathrithedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--text-primary)] transition-colors"
                    aria-label="Hashnode"
                >
                    <BookOpen size={24} />
                </a>
                <a
                    href="https://github.com/gayathrithedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--text-primary)] transition-colors"
                    aria-label="GitHub"
                >
                    <GithubIcon size={24} />
                </a>
            </div>
        </div>
    )
}

export default HomeView