import { Link } from 'react-router-dom'

export function Resume() {
  return (
    <main>
      <p style={{ opacity: 0.6, margin: 0 }}>Vault</p>
      <h1>Resume</h1>
      <p>Trophy-case archive + PDF download arrive in M4.</p>
      <Link to="/">← Home</Link>
    </main>
  )
}
