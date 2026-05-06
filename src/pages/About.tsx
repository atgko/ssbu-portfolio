import { Link } from 'react-router-dom'

export function About() {
  return (
    <main>
      <p style={{ opacity: 0.6, margin: 0 }}>Smash</p>
      <h1>About</h1>
      <p>Fighter Info text panel arrives in M2.</p>
      <Link to="/">← Home</Link>
    </main>
  )
}
