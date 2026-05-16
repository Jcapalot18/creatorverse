import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
        setForm({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
        })
      }
      setLoading(false)
    }

    fetchCreator()
  }, [id])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('creators')
      .update({
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL || null,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating creator:', error)
      alert('Something went wrong. Please try again.')
    } else {
      navigate(`/creator/${id}`)
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete "${form.name}"? This cannot be undone.`)) return

    setDeleting(true)
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting creator:', error)
      alert('Something went wrong. Please try again.')
      setDeleting(false)
    } else {
      navigate('/')
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page">
      <Link to={`/creator/${id}`} className="back-link">← Back to creator</Link>

      <div className="page-header fade-up">
        <h1>Edit Creator</h1>
        <p>Update this creator's information.</p>
      </div>

      <form className="form-card fade-up" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name *</label>
          <input
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Channel / Page URL *</label>
          <input
            className="form-input"
            name="url"
            value={form.url}
            onChange={handleChange}
            type="url"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            className="form-input"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL (optional)</label>
          <input
            className="form-input"
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            type="url"
          />
        </div>

        <div className="form-actions-end">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : '🗑 Delete Creator'}
          </button>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to={`/creator/${id}`} className="btn btn-outline">Cancel</Link>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : '✦ Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
