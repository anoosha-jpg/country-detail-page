import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      {/* Brand — click to go home */}
      <div className="nav-brand" onClick={() => navigate('/')}>
        ATLAS
        <span>World Countries Explorer</span>
      </div>

      {/* Right badge */}
      <div className="nav-badge">
        <svg
          width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
        195 Nations
      </div>
    </nav>
  )
}
