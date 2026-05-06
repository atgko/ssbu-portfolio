import { Link } from 'react-router-dom'

type MenuItem = {
  ssbu: string
  label: string
  path: string
}

const menu: readonly MenuItem[] = [
  { ssbu: 'Smash', label: 'About', path: '/about' },
  { ssbu: 'Spirits', label: 'Projects', path: '/projects' },
  { ssbu: 'Games & More', label: 'Skills', path: '/skills' },
  { ssbu: 'Vault', label: 'Resume', path: '/resume' },
  { ssbu: 'Online', label: 'Contact', path: '/contact' },
  { ssbu: 'Build Story', label: 'Build Story', path: '/build-story' },
]

export function Home() {
  return (
    <main>
      <h1>SSBU Portfolio — Athavan Elangko</h1>
      <p>M0 scaffold. The SSBU home screen replica arrives in M1.</p>
      <ul>
        {menu.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>
              <strong>{item.ssbu}</strong> → {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
