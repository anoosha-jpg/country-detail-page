import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import CountryPage from './pages/CountryPage.jsx'
import NotFound from './pages/NotFound.jsx'

// Layout wraps all pages with the sticky navbar
function Layout() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  )
}

// createBrowserRouter — the modern React Router v6 API
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'country/:name',
        element: <CountryPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
