import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main>
      <p style={{ opacity: 0.6, margin: 0 }}>404</p>
      <h1>Connection Lost</h1>
      <p>Lost connection to the host.</p>
      <Link to="/">← Return to Home</Link>
    </main>
  )
}
