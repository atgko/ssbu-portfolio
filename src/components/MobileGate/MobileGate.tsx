import { useState } from 'react'
import { motion } from 'framer-motion'
import { StarsBackground } from '../StarsBackground/StarsBackground.tsx'
import fighterImg from '../../assets/personal/fighter.jpg'
import styles from './MobileGate.module.css'

const STATS = [
  { label: 'Strategy',      value: 90 },
  { label: 'Execution',     value: 85 },
  { label: 'Comms',         value: 88 },
  { label: 'Technical',     value: 78 },
  { label: 'Leadership',    value: 83 },
]

const SEGMENTS = 12

function StatBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const filled = Math.round((value / 100) * SEGMENTS)
  return (
    <div className={styles.statRow}>
      <span className={styles.statLabel}>{label}</span>
      <div className={styles.statBar}>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <motion.span
            key={i}
            className={[styles.segment, i < filled ? styles.segOn : styles.segOff].join(' ')}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: delay + i * 0.03, duration: 0.09 }}
          />
        ))}
      </div>
    </div>
  )
}

export function MobileGate() {
  const [flipped, setFlipped] = useState(false)

  function toggle() {
    setFlipped(f => !f)
  }

  return (
    <div className={styles.gate}>
      <StarsBackground />
      <div className={styles.inner}>

        {/* 3-D flip card */}
        <div
          className={styles.cardScene}
          onClick={toggle}
          role="button"
          aria-pressed={flipped}
          aria-label={flipped ? 'Show fighter photo' : 'Reveal fighter stats'}
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggle() }}
        >
          <motion.div
            className={styles.card}
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
          >

            {/* ── FRONT: red P1 victory panel ── */}
            <div className={styles.cardFront}>
              <div className={styles.p1Row}>
                <span className={styles.p1Num}>P1</span>
                <div className={styles.p1Info}>
                  <span className={styles.p1Name}>Athavan Elangko</span>
                  <span className={styles.p1Tag}>Player 1</span>
                </div>
              </div>
              <img src={fighterImg} alt="Athavan" className={styles.fighterPhoto} />
              <div className={styles.frontFooter}>
                <span className={styles.tapHint}>TAP TO REVEAL STATS</span>
              </div>
            </div>

            {/* ── BACK: name + stats ── */}
            <div className={styles.cardBack}>
              <div className={styles.nameBanner}>
                <span className={styles.fighterNum}>#01</span>
                <span className={styles.fighterName}>Athavan Elangko</span>
              </div>
              <p className={styles.fighterTitle}>Product Manager · TPM</p>

              <p className={styles.bio}>
                Athavan enjoys building and improving things—taking something ambiguous and shaping
                it into something that works. His current focus is exploring how AI tools can help
                bring ideas to life faster and more practically. Athavan is driven by curiosity,
                iteration, and the process of making things better over time.
              </p>

              <div className={styles.metaBox}>
                <span className={styles.metaLine}>M.S. Information Systems · University of Utah</span>
                <span className={styles.metaLine}>8+ Years · Banking &amp; Fintech</span>
                <span className={[styles.metaLine, styles.metaAvail].join(' ')}>Available Jan 2027</span>
              </div>

              <div className={styles.statsSection}>
                <p className={styles.statsHeading}>FIGHTER STATS</p>
                {flipped && STATS.map((s, i) => (
                  <StatBar key={s.label} {...s} delay={0.28 + i * 0.09} />
                ))}
              </div>

              <div className={styles.backFooter}>
                <span className={styles.tapHint}>TAP TO FLIP</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Location */}
        <p className={styles.location}>
          <span className={styles.locationLabel}>LOCATION </span>
          Salt Lake City · Open to Seattle &amp; Bay Area
        </p>

        {/* Contact links */}
        <div className={styles.contactRow}>
          <a
            href="https://www.linkedin.com/in/athavan-elangko"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactBtn}
          >
            <span className={styles.contactIcon}>💼</span>
            LinkedIn
          </a>
          <a href="mailto:athavan.elangko@gmail.com" className={styles.contactBtn}>
            <span className={styles.contactIcon}>✉</span>
            Email
          </a>
          <a
            href="https://github.com/atgko"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactBtn}
          >
            <span className={styles.contactIcon}>🐙</span>
            GitHub
          </a>
        </div>

        {/* Desktop redirect */}
        <p className={styles.footer}>
          This arena was built for the Desktop Stage.{' '}
          Visit{' '}
          <a href="https://athavan.gg" className={styles.url}>athavan.gg</a>
          {' '}on a larger screen for the full experience.
        </p>

      </div>
    </div>
  )
}
