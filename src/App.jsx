import { useRoutes, Link } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ✦ <span>Creator</span>verse
      </Link>
      <div className="navbar-actions">
        <Link to="/new" className="btn btn-primary">
          + Add Creator
        </Link>
      </div>
    </nav>
  )
}

function App() {
  const routes = useRoutes([
    { path: '/',           element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator /> },
    { path: '/new',        element: <AddCreator /> },
  ])

  return (
    <>
      <Navbar />
      {routes}
    </>
  )
}

export default App
