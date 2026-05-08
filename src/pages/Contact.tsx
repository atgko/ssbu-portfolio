import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import styles from './Contact.module.css'

type PlatformIcon = 'linkedin' | 'email' | 'github'

interface Platform {
  id: string
  label: string
  desc: string
  href: string
  icon: PlatformIcon
  bgGlow: string
}

const PLATFORMS: Platform[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    desc: 'Connect professionally',
    href: 'https://www.linkedin.com/in/athavan-elangko',
    icon: 'linkedin',
    bgGlow: 'rgba(10, 102, 194, 0.3)',
  },
  {
    id: 'email',
    label: 'Email',
    desc: 'Send a direct message',
    href: 'mailto:athavan.elangko@gmail.com',
    icon: 'email',
    bgGlow: 'rgba(239, 163, 34, 0.28)',
  },
  {
    id: 'github',
    label: 'GitHub',
    desc: 'Browse the code',
    href: 'https://github.com/atgko',
    icon: 'github',
    bgGlow: 'rgba(200, 200, 230, 0.14)',
  },
]

function TileIcon({ type }: { type: PlatformIcon }) {
  if (type === 'linkedin') {
    return (
      <span className={styles.liIcon}>
        <span className={styles.liIconText}>in</span>
      </span>
    )
  }
  if (type === 'email') {
    return <span className={styles.atIcon}>@</span>
  }
  return <span className={styles.codeIcon}>{'</>'}</span>
}

export function Contact() {
  const big = PLATFORMS.filter(p => p.id !== 'github')
  const small = PLATFORMS.filter(p => p.id === 'github')

  return (
    <>
      <StarsBackground />
      <motion.div
        className={styles.page}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <header className={styles.topBar}>
          <Link to="/" className={styles.backBtn}>← MAIN MENU</Link>
          <span className={styles.screenTitle}>ONLINE</span>
          <span className={styles.p1Badge}>P1</span>
        </header>

        <div className={styles.arena}>
          {/* Sun gradient — reference Online screen warm sunburst */}
          <div className={styles.sunGlow} aria-hidden="true" />

          {/* ── Big tiles (LinkedIn + Email) ── */}
          <div className={styles.bigRow}>
            {big.map((p, i) => (
              <motion.a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tile}
                style={{ background: `radial-gradient(ellipse at 50% 38%, ${p.bgGlow} 0%, #0d0d1c 62%)` }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={styles.tileIconWrap}>
                  <TileIcon type={p.icon} />
                </div>
                <div className={styles.tileLabelGroup}>
                  <span className={styles.tileLabel}>{p.label}</span>
                  <span className={styles.tileDesc}>{p.desc}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* ── Small tile row (GitHub) ── */}
          <div className={styles.smallRow}>
            {small.map(p => (
              <motion.a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={[styles.tile, styles.tileSmall].join(' ')}
                style={{ background: `radial-gradient(ellipse at 28% 50%, ${p.bgGlow} 0%, #0d0d1c 65%)` }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.28 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={styles.tileIconWrap}>
                  <TileIcon type={p.icon} />
                </div>
                <div className={styles.tileLabelGroup}>
                  <span className={styles.tileLabel}>{p.label}</span>
                  <span className={styles.tileDesc}>{p.desc}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <footer className={styles.statusBar}>
          <span className={styles.statusText}>Battle players from all over the world!</span>
        </footer>
      </motion.div>
    </>
  )
}
