import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching creators:', error)
      } else {
        setCreators(data)
      }
      setLoading(false)
    }

    fetchCreators()
  }, [])

  if (loading) {
    return <div className="loading">Loading creators...</div>
  }

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>The ✦ Creatorverse</h1>
        <p>Creators worth your time and attention.</p>
      </div>

      {creators.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🌌</div>
          <h2>No creators yet</h2>
          <p>Add your first content creator to get started.</p>
          <Link to="/new" className="btn btn-primary">+ Add Creator</Link>
        </div>
      ) : (
        <div className="creators-grid">
          {creators.map(creator => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  )
}
