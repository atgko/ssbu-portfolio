import { Link } from 'react-router-dom'

export function BuildStory() {
  return (
    <main>
      <p style={{ opacity: 0.6, margin: 0 }}>Build Story</p>
      <h1>Patch Notes</h1>
      <ul>
        <li>
          <strong>v0.1</strong> — M0 scaffold: Vite + React + TS, React Router, ESLint + Prettier,
          design tokens, public repo, Vercel auto-deploy.
        </li>
      </ul>
      <Link to="/">← Home</Link>
    </main>
  )
}
