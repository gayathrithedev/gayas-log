import { useState, useEffect } from 'react'

const HASHNODE_HOST = 'gayathri.hashnode.dev'
const HASHNODE_GQL = 'https://gql.hashnode.com'
const HASHNODE_PROFILE = 'https://hashnode.com/@gayathrithedev'

const QUERY = `
  query Publication {
    publication(host: "${HASHNODE_HOST}") {
      title
      posts(first: 4) {
        edges {
          node {
            title
            brief
            slug
            url
            publishedAt
            coverImage {
              url
            }
          }
        }
      }
    }
  }
`

function BlogPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const response = await fetch(HASHNODE_GQL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: QUERY }),
            })

            if (!response.ok) throw new Error('Failed to fetch blog posts')

            const data = await response.json()
            const edges = data?.data?.publication?.posts?.edges || []
            setPosts(edges.map((edge) => edge.node))
        } catch (err) {
            console.error('Hashnode fetch error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    if (loading) {
        return (
            <div className="pt-8 border-t border-[var(--border)]">
                <h2 className="text-[24px] font-semibold text-[var(--text-primary)] mb-5">Blog</h2>
                <div className="flex items-center gap-3 text-[var(--text-secondary)] text-[14px]">
                    <div className="w-4 h-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
                    Loading posts...
                </div>
            </div>
        )
    }

    if (error || posts.length === 0) {
        return (
            <div className="pt-8 border-t border-[var(--border)]">
                <h2 className="text-[24px] font-semibold text-[var(--text-primary)] mb-5">Blog</h2>
                <p className="text-[14px] text-[var(--text-secondary)]">
                    Unable to load blog posts.{' '}
                    <a
                        href={HASHNODE_PROFILE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline"
                    >
                        Visit Hashnode ↗
                    </a>
                </p>
            </div>
        )
    }

    return (
        <div className="pt-8 border-t border-[var(--border)]">
            <h2 className="text-[24px] font-semibold text-[var(--text-primary)] mb-6">Blog</h2>

            {/* 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[10px] overflow-hidden">
                {posts.map((post, index) => (
                    <a
                        key={index}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-[var(--bg)] p-5 group transition-colors duration-150 hover:bg-[var(--hover)]"
                    >
                        <h3 className="text-[15px] font-semibold text-[var(--text-primary)] leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors duration-150">
                            {post.title}
                        </h3>
                        <span className="text-[13px] text-[var(--text-secondary)]">
                            {formatDate(post.publishedAt)}
                        </span>
                    </a>
                ))}
            </div>

            {/* "All Posts" button */}
            <div className="flex justify-center mt-6">
                <a
                    href={`https://${HASHNODE_HOST}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--border)] text-[14px] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-150 group"
                >
                    All Posts
                    <svg
                        className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default BlogPosts
