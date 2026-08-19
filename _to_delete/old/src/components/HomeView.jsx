import { useState, useEffect, useRef, useEffectEvent } from 'react'
import { ChevronLeft, ChevronRight, Github } from 'lucide-react'
import GitHubContributions from './GitHubContributions'
import BlogPosts from './BlogPosts'
import { BookOpen, Github as GithubSocial, Linkedin, Mail, XSocial } from './Icons'

const PROJECT_MOTION_MS = 640

const githubProjects = [
    {
        name: 'scam-shield',
        label: 'Privacy-first safety tool',
        description: [
            'Scam Shield protects unknown calls and WhatsApp messages without pushing personal data away from the device.',
            'The project is built around quick signal, calm UI copy, and the kind of trust that safety products usually miss.',
        ],
        status: 'Public repo',
        href: 'https://github.com/gayathrithedev/scam-shield',
        initials: 'SS',
        surface: '#FFF1B8',
        avatar: 'linear-gradient(135deg, #F0C84B 0%, #FFF7D6 100%)',
        avatarImage: 'https://github.com/gayathrithedev.png?size=160',
    },
    {
        name: 'diwali-blessings',
        label: 'Festive web experiment',
        description: [
            'Diwali Blessings turns a simple greeting into a small interactive moment, with thoughtful motion and a warmer visual rhythm.',
            'It stays intentionally lightweight while still feeling personal, celebratory, and handcrafted from the first frame.',
        ],
        status: 'Public repo',
        href: 'https://github.com/gayathrithedev/diwali-blessings',
        initials: 'DB',
        surface: '#E8F2C8',
        avatar: 'linear-gradient(135deg, #BFD984 0%, #F4F8DB 100%)',
        avatarImage: 'https://github.com/gayathrithedev.png?size=160',
    },
    {
        name: 'gayas-log',
        label: 'Personal logbook',
        description: [
            'Gayas Log combines a portfolio, day log, and small toolbox into one place that feels quiet, useful, and easy to revisit.',
            'The focus is on everyday rhythm: writing down patterns, surfacing work clearly, and making personal systems feel approachable.',
        ],
        status: 'Live site',
        href: 'https://github.com/gayathrithedev/gayas-log',
        initials: 'GL',
        surface: '#FCFAF1',
        avatar: 'linear-gradient(135deg, #CAC7BB 0%, #FFF9EA 100%)',
        avatarImage: 'https://github.com/gayathrithedev.png?size=160',
    },
]

const projectBookPositionClasses = {
    active: 'project-book-card-active',
    previous: 'project-book-card-previous',
    next: 'project-book-card-next',
    'hidden-left': 'project-book-card-hidden-left',
    'hidden-right': 'project-book-card-hidden-right',
}

const helloLinks = [
    { label: 'Gmail', href: 'mailto:gayathrithedev@gmail.com', icon: <Mail size={22} /> },
    { label: 'X (Twitter)', href: 'https://twitter.com/gayathrithedev', icon: <XSocial size={22} /> },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/gayathrithedev', icon: <Linkedin size={22} /> },
    { label: 'Hashnode', href: 'https://hashnode.com/@gayathrithedev', icon: <BookOpen size={22} /> },
    { label: 'GitHub', href: 'https://github.com/gayathrithedev', icon: <GithubSocial size={22} /> },
]

const playgroundItems = [
    {
        title: 'zero to one',
        description: 'Peter Thiel',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg',
        progressLabel: 'In progress · 2 chapters completed',
        progress: 20,
    },
    {
        title: 'psychology of money',
        description: 'Morgan Housel',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg',
        progressLabel: 'In progress · 1 chapter completed',
        progress: 10,
    },
    {
        title: 'Deep work',
        description: 'Cal Newport',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
        progressLabel: 'In progress · 1 chapter completed',
        progress: 12,
    },
    {
        title: 'Atomic habits',
        description: 'James Clear',
        coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
        progressLabel: 'Not started',
        progress: 0,
    },
]

function HomeView({ setActiveTab }) {
    const [lastPushDate, setLastPushDate] = useState(null)
    const [projectIndex, setProjectIndex] = useState(0)
    const [projectMotion, setProjectMotion] = useState('idle')
    const [dragOffset, setDragOffset] = useState(0)
    const [isDraggingProject, setIsDraggingProject] = useState(false)
    const [isProjectAnimating, setIsProjectAnimating] = useState(false)
    const projectDragRef = useRef({ startX: 0, pointerId: null, hasMoved: false, offset: 0, sourceElement: null })
    const projectMotionResetRef = useRef(null)
    const activeProjectCardRef = useRef(null)

    const getProjectPosition = (index) => {
        const total = githubProjects.length
        let offset = (index - projectIndex + total) % total

        if (offset > total / 2) {
            offset -= total
        }

        if (offset === 0) return 'active'
        if (offset === -1) return 'previous'
        if (offset === 1) return 'next'
        return offset < 0 ? 'hidden-left' : 'hidden-right'
    }

    const getProjectDirection = (nextIndex) => {
        const total = githubProjects.length
        const normalizedIndex = (nextIndex + total) % total
        const forwardDistance = (normalizedIndex - projectIndex + total) % total
        const backwardDistance = (projectIndex - normalizedIndex + total) % total

        if (forwardDistance === 0) return 'idle'
        return forwardDistance <= backwardDistance ? 'next' : 'previous'
    }

    const moveToProject = (nextIndex, direction = getProjectDirection(nextIndex)) => {
        const normalizedIndex = (nextIndex + githubProjects.length) % githubProjects.length

        if (direction === 'idle' || normalizedIndex === projectIndex || isProjectAnimating) return

        window.clearTimeout(projectMotionResetRef.current)
        setProjectMotion(direction)
        setProjectIndex(normalizedIndex)
        setIsProjectAnimating(true)
        projectMotionResetRef.current = window.setTimeout(() => {
            setProjectMotion('idle')
            setIsProjectAnimating(false)
        }, PROJECT_MOTION_MS)
    }

    const goToPreviousProject = () => {
        moveToProject(projectIndex - 1, 'previous')
    }

    const goToNextProject = () => {
        moveToProject(projectIndex + 1, 'next')
    }

    const handleProjectArrowKey = useEffectEvent((event) => {
        const target = event.target
        const tagName = target?.tagName
        const isTypingTarget = target?.isContentEditable || tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT'

        if (isTypingTarget) return

        if (event.key === 'ArrowLeft') {
            event.preventDefault()
            moveToProject(projectIndex - 1, 'previous')
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault()
            moveToProject(projectIndex + 1, 'next')
        }
    })

    const handleProjectPointerDown = (event, position) => {
        if (position !== 'active' || isProjectAnimating) return
        if (event.pointerType === 'mouse' && event.button !== 0) return

        projectDragRef.current = {
            startX: event.clientX,
            pointerId: event.pointerId,
            hasMoved: false,
            offset: 0,
            sourceElement: event.currentTarget,
        }
        setIsDraggingProject(true)
        setDragOffset(0)
        try {
            event.currentTarget.setPointerCapture?.(event.pointerId)
        } catch {
            // Some synthetic/browser-test pointer events cannot be captured.
        }
    }

    const handleProjectPointerMove = (event) => {
        if (projectDragRef.current.pointerId !== event.pointerId) return

        const cardWidth = activeProjectCardRef.current?.offsetWidth ?? 420
        const maxOffset = Math.min(180, cardWidth * 0.34)
        const nextOffset = event.clientX - projectDragRef.current.startX
        const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, nextOffset))
        if (Math.abs(nextOffset) > 4) {
            projectDragRef.current.hasMoved = true
        }
        projectDragRef.current.offset = clampedOffset
        setDragOffset(clampedOffset)
    }

    const handleProjectPointerEnd = (event) => {
        if (projectDragRef.current.pointerId !== event.pointerId) return

        const finalOffset = projectDragRef.current.offset
        setIsDraggingProject(false)
        setDragOffset(0)
        try {
            projectDragRef.current.sourceElement?.releasePointerCapture?.(event.pointerId)
        } catch {
            // Pointer capture may not exist for synthetic/browser-test events.
        }

        const cardWidth = activeProjectCardRef.current?.offsetWidth ?? 420
        const threshold = Math.max(48, Math.min(96, cardWidth * 0.18))
        if (finalOffset <= -threshold) {
            goToNextProject()
        } else if (finalOffset >= threshold) {
            goToPreviousProject()
        }

        window.setTimeout(() => {
            projectDragRef.current = { startX: 0, pointerId: null, hasMoved: false, offset: 0, sourceElement: null }
        }, 0)
    }

    const handleProjectPointerMoveEvent = useEffectEvent((event) => {
        handleProjectPointerMove(event)
    })

    const handleProjectPointerEndEvent = useEffectEvent((event) => {
        handleProjectPointerEnd(event)
    })

    useEffect(() => {
        window.addEventListener('keydown', handleProjectArrowKey)

        return () => {
            window.clearTimeout(projectMotionResetRef.current)
            window.removeEventListener('keydown', handleProjectArrowKey)
        }
    }, [])

    useEffect(() => {
        if (!isDraggingProject) return undefined

        window.addEventListener('pointermove', handleProjectPointerMoveEvent)
        window.addEventListener('pointerup', handleProjectPointerEndEvent)
        window.addEventListener('pointercancel', handleProjectPointerEndEvent)

        return () => {
            window.removeEventListener('pointermove', handleProjectPointerMoveEvent)
            window.removeEventListener('pointerup', handleProjectPointerEndEvent)
            window.removeEventListener('pointercancel', handleProjectPointerEndEvent)
        }
    }, [isDraggingProject])

    useEffect(() => {
        fetch('https://api.github.com/users/gayathrithedev/events/public?per_page=30')
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(events => {
                const pushEvent = events.find(e => e.type === 'PushEvent')
                if (pushEvent) {
                    setLastPushDate(new Date(pushEvent.created_at))
                }
            })
            .catch(() => { })
    }, [])

    const formatPushDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }

    return (
        <div className="w-full space-y-16 sm:space-y-20">
            <section className="section-shell relative overflow-hidden p-6 sm:p-8 lg:p-10">
                <div className="absolute right-8 top-8 hidden h-28 w-28 rounded-full border border-[var(--border)] bg-[var(--accent-soft)] blur-3xl sm:block" />
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="relative z-10">
                        <p className="section-label mb-5">Developer · log keeper · side-project builder</p>
                        <h2 className="max-w-3xl text-[42px] font-semibold leading-[0.98] tracking-[-0.06em] text-[var(--text-primary)] sm:text-[64px] lg:text-[78px]">
                            Building quiet tools for code, clarity, and everyday rhythm.
                        </h2>
                        <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[var(--text-secondary)]">
                            Hi, I’m Gayathri. I build thoughtful interfaces, document my days, and turn small experiments into useful digital things. This space is part portfolio, part logbook, and part playground.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <button type="button" onClick={() => setActiveTab('today')} className="btn-primary">
                                View today’s log
                            </button>
                            <a href="mailto:gayathrithedev@gmail.com" className="btn-secondary">
                                Say hello ↗
                            </a>
                        </div>
                    </div>

                    <div className="relative z-10 rounded-[26px] border border-[var(--border)] bg-[var(--surface-muted)] p-5 shadow-[0_18px_60px_var(--glow)]">
                        <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[12px] text-[var(--text-secondary)]">
                            <span>~/gaya/logbook</span>
                            <span className="rounded-full border border-[var(--border-accent)] bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent-strong)]">online</span>
                        </div>
                        <div className="space-y-3 font-mono text-[13px] leading-7">
                            <p><span className="text-[var(--accent)]">01</span> track energy, not just tasks</p>
                            <p><span className="text-[var(--accent)]">02</span> build tiny tools that compound</p>
                            <p><span className="text-[var(--accent)]">03</span> write notes before they disappear</p>
                            <p><span className="text-[var(--accent)]">04</span> keep the interface honest</p>
                        </div>
                        <div className="mt-6 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                                <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                                <span className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                            </div>
                            <p className="text-[15px] text-[var(--text-secondary)]">
                                Less is more — but the logs remember the details.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-book-carousel relative overflow-hidden">
                <div className="mb-5 text-center sm:mb-6">
                    <h2 className="font-serif text-[28px] leading-[0.98] tracking-[0] text-[#48463D] dark:text-[var(--text-primary)] sm:text-[36px] lg:text-[44px]">
                        <span className="text-[var(--accent)]">Featured projects</span> from GitHub
                    </h2>
                </div>

                <div
                    className="project-book-stage mx-auto"
                    role="region"
                    aria-label="Featured GitHub projects"
                    aria-live="polite"
                    aria-roledescription="carousel"
                >
                    {githubProjects.map((project, index) => {
                        const position = getProjectPosition(index)
                        const isActive = position === 'active'
                        const cardLabel = position === 'previous'
                            ? 'Previous GitHub project'
                            : position === 'next'
                                ? 'Next GitHub project'
                                : 'Open GitHub project'

                        return (
                            <a
                                key={project.name}
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) => {
                                    if (projectDragRef.current.hasMoved) {
                                        event.preventDefault()
                                        return
                                    }

                                    if (position === 'previous') {
                                        event.preventDefault()
                                        goToPreviousProject()
                                    }

                                    if (position === 'next') {
                                        event.preventDefault()
                                        goToNextProject()
                                    }
                                }}
                                onPointerDown={(event) => handleProjectPointerDown(event, position)}
                                className={`project-book-card ${projectBookPositionClasses[position]} ${isActive && projectMotion !== 'idle' ? 'project-book-card-enter-' + projectMotion : ''} ${isActive && isDraggingProject ? 'project-book-card-dragging' : ''} group`}
                                ref={isActive ? activeProjectCardRef : null}
                                style={{
                                    '--project-card-surface': project.surface,
                                    '--project-card-avatar': project.avatar,
                                    ...(isActive && isDraggingProject
                                        ? {
                                            transform: `translateX(-50%) translate3d(${dragOffset}px, 0px, 0px) rotateY(${-dragOffset / 10}deg) rotateZ(${dragOffset / 42}deg)`,
                                        }
                                        : {}),
                                }}
                                aria-label={`${cardLabel}: ${project.name}`}
                                aria-hidden={position === 'hidden-left' || position === 'hidden-right'}
                                tabIndex={position === 'hidden-left' || position === 'hidden-right' ? -1 : 0}
                            >
                                <div>
                                    {project.description.map((paragraph) => (
                                        <p key={paragraph} className="project-book-copy">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="project-book-footer">
                                    <div className="project-book-avatar">
                                        {project.avatarImage ? (
                                            <img src={project.avatarImage} alt="" draggable="false" />
                                        ) : (
                                            project.initials
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="project-book-name">
                                            {project.name}
                                        </h3>
                                        <p className="project-book-meta">
                                            {project.label},<br />{project.status}
                                        </p>
                                    </div>
                                    <span className="project-book-link-icon" aria-hidden="true">
                                        <Github strokeWidth={1.9} />
                                    </span>
                                </div>
                            </a>
                        )
                    })}
                </div>

                <div className="project-book-controls">
                    <button
                        type="button"
                        onClick={goToPreviousProject}
                        className="project-book-control-button"
                        aria-label="Previous GitHub project"
                    >
                        <ChevronLeft strokeWidth={2.4} />
                    </button>
                    <div className="project-book-dots" aria-label="GitHub project carousel pagination">
                        {githubProjects.map((project, index) => (
                            <button
                                key={project.name}
                                type="button"
                                onClick={() => {
                                    const direction = index > projectIndex || (projectIndex === githubProjects.length - 1 && index === 0)
                                        ? 'next'
                                        : 'previous'
                                    moveToProject(index, direction)
                                }}
                                className={`project-book-dot ${projectIndex === index ? 'project-book-dot-active' : ''}`}
                                aria-label={`Show ${project.name}`}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={goToNextProject}
                        className="project-book-control-button"
                        aria-label="Next GitHub project"
                    >
                        <ChevronRight strokeWidth={2.4} />
                    </button>
                </div>
            </section>

            <div className="section-shell p-6 sm:p-7">
                <GitHubContributions lastPushDate={lastPushDate} />
                {lastPushDate && (
                    <p className="mt-4 text-center text-[14px] text-[var(--text-secondary)]">
                        I last pushed code on{' '}
                        <span className="font-medium text-[var(--text-primary)]">{formatPushDate(lastPushDate)}</span>
                    </p>
                )}
            </div>

            <section className="playground-gallery">
                <h2 className="playground-gallery__title">Books</h2>

                <div className="playground-gallery__grid">
                    {playgroundItems.map((item) => (
                        <article key={item.title} className="playground-stamp">
                            <div className="playground-stamp__image">
                                <img
                                    src={item.coverUrl}
                                    alt={`${item.title} book cover`}
                                    className="playground-stamp__cover"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="playground-stamp__title">{item.title}</h3>
                            <p className="playground-stamp__description">{item.description}</p>
                            <div className="playground-stamp__progress" aria-label={`${item.title} reading progress: ${item.progressLabel}`}>
                                <span className="playground-stamp__progress-track">
                                    <span style={{ width: `${item.progress}%` }} />
                                </span>
                                <span className="playground-stamp__progress-label">{item.progressLabel}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <div className="section-shell p-6 sm:p-7">
                <BlogPosts />
            </div>

            <section className="section-shell p-6 sm:p-7">
                <div className="mb-6">
                    <p className="section-label mb-3">Say hello</p>
                    <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">Have a tech idea, side quest, or just want to talk?</h2>
                    <p className="mt-3 max-w-2xl text-[16px] leading-8 text-[var(--text-secondary)]">
                        I’m always open to discussing tech, side projects, or interesting ideas. Feel free to reach out.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 text-[var(--text-secondary)]">
                    {helloLinks.map(({ label, href, icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-[var(--border-accent)] hover:text-[var(--accent)] hover:shadow-[0_0_22px_var(--glow)]"
                            aria-label={label}
                            title={label}
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default HomeView
