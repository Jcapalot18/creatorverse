import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error)
        navigate('/')
      } else {
        setCreator(data)
      }
      setLoading(false)
    }

    fetchCreator()
  }, [id])

  if (loading) return <div className="loading">Loading...</div>
  if (!creator) return null

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to all creators</Link>

      <div className="view-hero fade-up">
        <div className="view-image">
          {creator.imageURL ? (
            <img src={creator.imageURL} alt={creator.name} />
          ) : (
            <span>🎬</span>
          )}
        </div>

        <div className="view-info">
          <div className="tag">Content Creator</div>
          <h1 className="view-name">{creator.name}</h1>
          <p className="view-desc">{creator.description}</p>

          <a
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="view-url"
          >
            ↗ Visit Channel
          </a>

          <div className="view-actions">
            <Link to={`/creator/${creator.id}/edit`} className="btn btn-outline">
              ✏️ Edit Creator
            </Link>
            <Link to="/" className="btn btn-outline">
              ← All Creators
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
