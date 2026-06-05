import { motion } from 'framer-motion'
import fighterImg from '../../assets/personal/fighter.jpg'
import styles from './FighterPage.module.css'

const STATS = [
  { label: 'Strategy',   value: 90 },
  { label: 'Execution',  value: 85 },
  { label: 'Comms',      value: 88 },
  { label: 'Technical',  value: 78 },
  { label: 'Leadership', value: 83 },
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

export function FighterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <img src={fighterImg} alt="Athavan" className={styles.photo} />

        <div className={styles.nameBanner}>
          <span className={styles.fighterNum}>#01</span>
          <span className={styles.fighterName}>Athavan Elangko</span>
        </div>
        <p className={styles.fighterTitle}>Product Manager · TPM</p>

        <div className={styles.divider} />

        <div className={styles.metaBox}>
          <span className={styles.metaLine}>M.S. Information Systems · University of Utah</span>
          <span className={styles.metaLine}>8+ Years · Banking &amp; Fintech</span>
          <span className={[styles.metaLine, styles.metaAvail].join(' ')}>Available Jan 2027</span>
        </div>

        <div className={styles.divider} />

        <p className={styles.bio}>
          Athavan enjoys building and improving things, taking something ambiguous and shaping
          it into something that works. His current focus is exploring how AI tools can help
          bring ideas to life faster and more practically. Athavan is driven by curiosity,
          iteration, and the process of making things better over time.
        </p>

        <div className={styles.divider} />

        <div className={styles.statsSection}>
          <p className={styles.statsHeading}>FIGHTER STATS</p>
          {STATS.map((s, i) => (
            <StatBar key={s.label} {...s} delay={0.3 + i * 0.09} />
          ))}
        </div>
      </div>
    </div>
  )
}
