import { useNavigate, useParams, Link } from 'react-router-dom'
import { useCountryDetail } from '../hooks/useCountries.js'

// Format numbers with commas
const fmt = (n) => (n ? new Intl.NumberFormat().format(n) : 'N/A')

export default function CountryPage() {
  const { name }    = useParams()
  const navigate    = useNavigate()
  const { country, borders, loading, error } = useCountryDetail(
    decodeURIComponent(name)
  )

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <main>
        <div className="loading-screen">
          <div className="spinner" />
          <p>Loading Country Data…</p>
        </div>
      </main>
    )
  }

  /* ---------- Error ---------- */
  if (error || !country) {
    return (
      <main>
        <div className="error-screen">
          <h2>Country Not Found</h2>
          <p>{error || 'No data available for this country.'}</p>
          <button className="btn-gold" onClick={() => navigate('/')}>
            Back to Atlas
          </button>
        </div>
      </main>
    )
  }

  /* ---------- Derived data ---------- */
  const languages  = country.languages  ? Object.values(country.languages)  : []
  const currencies = country.currencies
    ? Object.values(country.currencies).map(
        (c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`
      )
    : []

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : null

  const callingCode = country.idd?.root
    ? `${country.idd.root}${country.idd.suffixes?.[0] ?? ''}`
    : 'N/A'

  const gini = country.gini ? Object.values(country.gini)[0] : null
  const area = country.area ? `${fmt(Math.round(country.area))} km²` : 'N/A'
  const timezones = country.timezones ?? []

  /* ---------- Render ---------- */
  return (
    <main>
      {/* Back button */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        <svg
          width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      {/* Hero card */}
      <div className="detail-hero">
        {/* Flag */}
        <div className="detail-flag-panel">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.flags?.alt || `Flag of ${country.name.common}`}
          />
        </div>

        {/* Info */}
        <div className="detail-info-panel">
          <h1 className="detail-country-name">{country.name.common}</h1>
          {nativeName && nativeName !== country.name.common && (
            <p className="detail-native-name">
              {nativeName} — {country.name.official}
            </p>
          )}

          {/* Quick stats */}
          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-value">{fmt(country.population)}</div>
              <div className="hstat-label">Population</div>
            </div>
            <div className="hstat">
              <div className="hstat-value">{area}</div>
              <div className="hstat-label">Area</div>
            </div>
            <div className="hstat">
              <div className="hstat-value">{gini ? `${gini}%` : 'N/A'}</div>
              <div className="hstat-label">Gini Index</div>
            </div>
          </div>

          {/* Detail grid */}
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Capital</span>
              <span className="detail-value">
                {country.capital?.join(', ') || 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Region</span>
              <span className="detail-value">{country.region || 'N/A'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Subregion</span>
              <span className="detail-value">{country.subregion || 'N/A'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">UN Member</span>
              <span className="detail-value">
                {country.unMember ? '✓ Yes' : '✗ No'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Driving Side</span>
              <span
                className="detail-value"
                style={{ textTransform: 'capitalize' }}
              >
                {country.car?.side || 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Calling Code</span>
              <span className="detail-value">{callingCode}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Top-Level Domain</span>
              <span className="detail-value">
                {country.tld?.join(', ') || 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Start of Week</span>
              <span
                className="detail-value"
                style={{ textTransform: 'capitalize' }}
              >
                {country.startOfWeek || 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Timezone(s)</span>
              <span className="detail-value" style={{ fontSize: '0.83rem' }}>
                {timezones.length
                  ? `${timezones.slice(0, 2).join(', ')}${timezones.length > 2 ? ` +${timezones.length - 2} more` : ''}`
                  : 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Landlocked</span>
              <span className="detail-value">
                {country.landlocked ? '✓ Yes' : '✗ No'}
              </span>
            </div>

            {/* Full-width: Languages */}
            <div className="detail-item full">
              <span className="detail-label">Languages</span>
              {languages.length ? (
                <div className="tag-list">
                  {languages.map((l) => (
                    <span key={l} className="tag">{l}</span>
                  ))}
                </div>
              ) : (
                <span className="detail-value">N/A</span>
              )}
            </div>

            {/* Full-width: Currencies */}
            <div className="detail-item full">
              <span className="detail-label">Currencies</span>
              {currencies.length ? (
                <div className="tag-list">
                  {currencies.map((c) => (
                    <span key={c} className="tag">{c}</span>
                  ))}
                </div>
              ) : (
                <span className="detail-value">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Border nations */}
      {borders.length > 0 && (
        <div className="borders-section">
          <h3>Border Nations</h3>
          <div className="borders-grid">
            {borders.map((b) => (
              <Link
                key={b.cca3}
                to={`/country/${encodeURIComponent(b.name.common)}`}
                className="border-card"
              >
                <img
                  className="border-flag"
                  src={b.flags?.svg || b.flags?.png}
                  alt={`Flag of ${b.name.common}`}
                />
                <span className="border-name">{b.name.common}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
