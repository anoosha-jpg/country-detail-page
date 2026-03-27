import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAllCountries } from '../hooks/useCountries.js'

const PER_PAGE = 20

// Format large numbers with commas
const fmt = (n) =>
  n ? new Intl.NumberFormat().format(n) : 'N/A'

export default function HomePage() {
  const { countries, loading, error } = useAllCountries()

  const [search, setSearch]   = useState('')
  const [region, setRegion]   = useState('')
  const [page, setPage]       = useState(1)

  // Unique region list
  const regions = useMemo(
    () => [...new Set(countries.map((c) => c.region).filter(Boolean))].sort(),
    [countries]
  )

  // Filtered list based on search + region
  const filtered = useMemo(() => {
    let list = countries
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (c) =>
          c.name.common.toLowerCase().includes(q) ||
          c.name.official.toLowerCase().includes(q)
      )
    }
    if (region) list = list.filter((c) => c.region === region)
    return list
  }, [countries, search, region])

  // Reset to page 1 whenever filters change
  useEffect(() => setPage(1), [search, region])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const pageSlice  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Build smart page number list (with ellipsis)
  const pageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const nums = [1]
    if (page > 3) nums.push('…')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++)
      nums.push(i)
    if (page < totalPages - 2) nums.push('…')
    nums.push(totalPages)
    return nums
  }

  /* ---------- Render states ---------- */
  if (loading) {
    return (
      <main>
        <div className="loading-screen">
          <div className="spinner" />
          <p>Loading Nations…</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <div className="error-screen">
          <h2>Connection Error</h2>
          <p>{error}</p>
          <button className="btn-gold" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">World Nations</h1>
        <p className="count-badge">
          {filtered.length} countr{filtered.length === 1 ? 'y' : 'ies'}
          {region ? ` in ${region}` : ''}
          {search ? ` matching "${search}"` : ''}
        </p>
      </div>

      {/* Search + Filter */}
      <div className="search-section">
        <div className="search-wrap">
          {/* Search icon */}
          <svg
            className="search-icon"
            width="16" height="16" fill="none"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search by country name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="region-wrap">
          <select
            className="region-select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {/* Chevron icon */}
          <svg
            className="chevron"
            width="14" height="14" fill="none"
            stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Empty state */}
      {pageSlice.length === 0 ? (
        <div className="empty-state">
          <svg
            width="52" height="52" fill="none"
            stroke="var(--gold)" strokeWidth="1.4" viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
          <p>No countries found{search ? ` for "${search}"` : ''}</p>
        </div>
      ) : (
        /* Country cards grid */
        <div className="countries-grid">
          {pageSlice.map((country, index) => (
            <Link
              key={country.cca3}
              to={`/country/${encodeURIComponent(country.name.common)}`}
            >
              <div
                className="country-card"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flag-wrap">
                  <img
                    className="flag-img"
                    src={country.flags?.svg || country.flags?.png}
                    alt={country.flags?.alt || `Flag of ${country.name.common}`}
                    loading="lazy"
                  />
                </div>
                <div className="card-body">
                  <div className="card-name">{country.name.common}</div>
                  <div className="card-meta">
                    <span>
                      <strong>{fmt(country.population)}</strong> population
                    </span>
                    {country.capital?.[0] && (
                      <span>🏛 {country.capital[0]}</span>
                    )}
                  </div>
                  <span className="card-region-badge">
                    {country.region || 'Unknown'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pg-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Prev
          </button>

          {pageNumbers().map((p, i) =>
            p === '…' ? (
              <span key={`ellipsis-${i}`} className="pg-ellipsis">…</span>
            ) : (
              <button
                key={p}
                className={`pg-btn${page === p ? ' active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            )
          )}

          <button
            className="pg-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </main>
  )
}
