import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main>
      <div className="not-found">
        <div className="not-found-code">404</div>

        <h2>Terra Incognita</h2>

        <p>
          This territory is uncharted. The page you're looking for doesn't
          exist on our map — it may have moved or never existed.
        </p>

        <button
          className="btn-gold"
          style={{ marginTop: '8px' }}
          onClick={() => navigate('/')}
        >
          Return to Atlas
        </button>
      </div>
    </main>
  )
}
