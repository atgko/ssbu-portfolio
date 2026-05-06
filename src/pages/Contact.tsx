import { Link } from 'react-router-dom'

export function Contact() {
  return (
    <main>
      <p style={{ opacity: 0.6, margin: 0 }}>Online</p>
      <h1>Contact</h1>
      <p>Battle Request form (Vercel Function + Resend) arrives in M5.</p>
      <Link to="/">← Home</Link>
    </main>
  )
}
