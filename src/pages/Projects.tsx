import { Link } from 'react-router-dom'

export function Projects() {
  return (
    <main>
      <p style={{ opacity: 0.6, margin: 0 }}>Spirits</p>
      <h1>Projects</h1>
      <p>Spirit grid (Wayfound + 2 Support Spirits) arrives in M3.</p>
      <Link to="/">← Home</Link>
    </main>
  )
}
