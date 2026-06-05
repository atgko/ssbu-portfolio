import styles from './ResumePage.module.css'

const TILES = [
  { icon: '📋', label: 'Experience' },
  { icon: '🎓', label: 'Education' },
  { icon: '🏅', label: 'Certifications' },
  { icon: '⚡', label: 'Skills' },
]

export function ResumePage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>

        <header className={styles.header}>
          <span className={styles.headerLabel}>ARCHIVE</span>
          <div className={styles.headerAccent} />
        </header>

        <div className={styles.tilesGrid}>
          {TILES.map(t => (
            <div key={t.label} className={styles.tile}>
              <span className={styles.tileIcon}>{t.icon}</span>
              <span className={styles.tileLabel}>{t.label}</span>
            </div>
          ))}
        </div>

        <a
          href="/resume.pdf"
          download
          className={styles.downloadBtn}
        >
          <span className={styles.downloadIcon}>↓</span>
          DOWNLOAD PDF
        </a>

        <p className={styles.tagline}>
          Battle record — career history and professional achievements.
        </p>

      </div>
    </div>
  )
}
