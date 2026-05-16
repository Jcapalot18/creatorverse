import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.url || !form.description) return

    setLoading(true)
    const { error } = await supabase.from('creators').insert([
      {
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL || null,
      },
    ])

    if (error) {
      console.error('Error adding creator:', error)
      alert('Something went wrong. Please try again.')
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to all creators</Link>

      <div className="page-header fade-up">
        <h1>Add a Creator</h1>
        <p>Share a creator you think is worth following.</p>
      </div>

      <form className="form-card fade-up" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name *</label>
          <input
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. CoryxKenshin"
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
            placeholder="https://youtube.com/@..."
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
            placeholder="What kind of content do they make?"
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
            placeholder="https://..."
            type="url"
          />
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adding...' : '✦ Add Creator'}
          </button>
          <Link to="/" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
