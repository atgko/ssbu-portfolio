import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import { audioManager } from '../audio/audioManager.ts'
import fighterImg from '../assets/personal/fighter.jpg'
import styles from './About.module.css'

const STATS = [
  { label: 'Strategy',      value: 90 },
  { label: 'Execution',     value: 85 },
  { label: 'Communication', value: 88 },
  { label: 'Technical',     value: 78 },
  { label: 'Leadership',    value: 83 },
]

const SEGMENTS = 22

function StatBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const filled = Math.round((value / 100) * SEGMENTS)
  return (
    <div className={styles.statRow}>
      <span className={styles.statLabel}>{label}</span>
      <div className={styles.statBar} role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <motion.span
            key={i}
            className={[styles.segment, i < filled ? styles.segOn : styles.segOff].join(' ')}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: delay + i * 0.022, duration: 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}

export function About() {
  const navigate = useNavigate()

  useEffect(() => { document.title = 'About · Athavan Elangko' }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'b') {
        audioManager.playEffect('back')
        navigate('/')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate])

  return (
    <>
      <StarsBackground />
      <motion.main
        className={styles.page}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >

      <header className={styles.topBar}>
        <Link to="/" className={styles.backBtn} onClick={() => audioManager.playEffect('back')}>← MAIN MENU</Link>
        <span className={styles.screenTitle}>FIGHTER SELECT</span>
        <span className={styles.p1Badge}>P1</span>
      </header>

      <section className={styles.stage} aria-label="Fighter profile">
        <motion.div
          className={styles.fighterArea}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={fighterImg}
            alt="Athavan"
            className={styles.fighterImage}
          />
          <div className={styles.spotlight} aria-hidden="true" />
          <div className={styles.scanlines} aria-hidden="true" />
          <div className={styles.platform} aria-hidden="true" />
          <div className={styles.selectedBadge} aria-hidden="true">SELECTED</div>
        </motion.div>

        <motion.div
          className={styles.infoPanel}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.nameBanner}>
            <span className={styles.fighterNum}>#01</span>
            <h1 className={styles.fighterName}>Athavan</h1>
          </div>

          <p className={styles.fighterTitle}>
            Product Manager · Technical Program Manager
          </p>

          <dl className={styles.metaBox}>
            <dt className={styles.metaKey}>UNIVERSE</dt>
            <dd className={styles.metaVal}>University of Utah, M.S. Information Systems</dd>
            <dt className={styles.metaKey}>SERIES</dt>
            <dd className={styles.metaVal}>Banking &amp; Fintech · 8+ Years</dd>
          </dl>

          <p className={styles.bio}>
            Athavan enjoys building and improving things, taking something ambiguous and shaping it
            into something that works. His current focus is exploring how AI tools can help bring
            ideas to life faster and more practically. Athavan is driven by curiosity, iteration,
            and the process of making things better over time.
          </p>

          <div className={styles.statsSection}>
            <p className={styles.statsHeading}>FIGHTER STATS</p>
            {STATS.map((s, i) => (
              <StatBar key={s.label} {...s} delay={0.5 + i * 0.12} />
            ))}
          </div>
        </motion.div>
      </section>

      <footer className={styles.bottomBar}>
        <span className={styles.hint}>
          <kbd>B</kbd> Back
        </span>
      </footer>
      </motion.main>
    </>
  )
}
