import { useNavigate } from 'react-router-dom'

function getPlatform(url) {
  if (!url) return 'Creator'
  if (url.includes('youtube')) return 'YouTube'
  if (url.includes('twitch')) return 'Twitch'
  if (url.includes('tiktok')) return 'TikTok'
  if (url.includes('instagram')) return 'Instagram'
  if (url.includes('twitter') || url.includes('x.com')) return 'X / Twitter'
  if (url.includes('spotify')) return 'Podcast'
  return 'Creator'
}

export default function Card({ creator, onEdit }) {
  const navigate = useNavigate()

  function handleCardClick() {
    navigate(`/creator/${creator.id}`)
  }

  function handleEdit(e) {
    e.stopPropagation()
    navigate(`/creator/${creator.id}/edit`)
  }

  function handleLink(e) {
    e.stopPropagation()
  }

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-image">
        {creator.imageURL ? (
          <img src={creator.imageURL} alt={creator.name} onError={e => { e.target.style.display = 'none' }} />
        ) : (
          <span>🎬</span>
        )}
      </div>
      <div className="card-body">
        <div className="card-platform">{getPlatform(creator.url)}</div>
        <div className="card-name">{creator.name}</div>
        <div className="card-desc">{creator.description}</div>
        <div className="card-footer">
          <a
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
            onClick={handleLink}
          >
            ↗ {creator.url?.replace(/https?:\/\/(www\.)?/, '').split('/')[0]}
          </a>
          <div className="card-actions">
            <button className="btn-icon" onClick={handleEdit} title="Edit">✏️</button>
          </div>
        </div>
      </div>
    </div>
  )
}
