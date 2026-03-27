import { useState, useEffect } from 'react'

const API = 'https://restcountries.com/v3.1'

/**
 * Fetch all countries (lightweight fields for the grid).
 */
export function useAllCountries() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`${API}/all?fields=name,flags,population,region,subregion,capital,cca3`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} — Could not fetch countries`)
        return res.json()
      })
      .then((data) => {
        // Sort alphabetically by common name
        const sorted = [...data].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
        setCountries(sorted)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { countries, loading, error }
}

/**
 * Fetch full details for a single country by its common name.
 */
export function useCountryDetail(name) {
  const [country, setCountry]   = useState(null)
  const [borders, setBorders]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    if (!name) return
    setLoading(true)
    setError(null)
    setCountry(null)
    setBorders([])

    fetch(`${API}/name/${encodeURIComponent(name)}?fullText=true`)
      .then((res) => {
        if (!res.ok) throw new Error('Country not found')
        return res.json()
      })
      .then(async (data) => {
        const c = data[0]
        setCountry(c)

        // Fetch border country names + flags
        if (c.borders?.length) {
          const codes = c.borders.join(',')
          const borderData = await fetch(
            `${API}/alpha?codes=${codes}&fields=name,flags,cca3`
          ).then((r) => r.json())
          setBorders(borderData)
        }

        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [name])

  return { country, borders, loading, error }
}
