# 🌍 World Atlas — Country Details Platform

A React app built with **React Router DOM v6** (`createBrowserRouter`) that lets you explore all 195 countries with flags, search, region filtering, pagination, and full detail pages.

---

## Features

| Feature | Details |
|---|---|
| **Home Page** | Grid of all 195 country flags, alphabetically sorted |
| **Search** | Live search by country name or official name |
| **Region Filter** | Dropdown to filter by continent/region |
| **Pagination** | 20 countries per page with smart ellipsis |
| **Country Detail** | Full info — capital, population, area, languages, currencies, timezones, calling code, TLD, and more |
| **Border Nations** | Clickable border country cards with flags |
| **Loading State** | Animated spinner while fetching |
| **Error State** | Error message with retry button |
| **404 Page** | "Terra Incognita" not-found page |
| **Responsive** | Works on mobile, tablet, and desktop |
| **Animations** | Fade-in cards with staggered delays, hover lifts |

---

## Tech Stack

- **React 18** + **Vite**
- **React Router DOM v6** (`createBrowserRouter`)
- **REST Countries API** — `https://restcountries.com/v3.1`
- **Google Fonts** — Cinzel (headings) + Nunito (body)
- Pure **CSS** (no UI library)

---

## Project Structure

```
world-atlas/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          # ReactDOM.createRoot entry
    ├── App.jsx           # createBrowserRouter + Layout
    ├── index.css         # All global styles
    ├── hooks/
    │   └── useCountries.js   # Custom hooks for API calls
    ├── components/
    │   └── Navbar.jsx
    └── pages/
        ├── HomePage.jsx      # Grid + search + pagination
        ├── CountryPage.jsx   # /country/:name detail page
        └── NotFound.jsx      # 404
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Build for Production

```bash
npm run build
npm run preview
```

> **Note:** `createBrowserRouter` requires your server to redirect all routes to `index.html`.  
> For Vite preview this works automatically. For Nginx, add `try_files $uri /index.html;`.
