import styles from './ContactPage.module.css'

export function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>

        <header className={styles.header}>
          <span className={styles.headerLabel}>CONTACT</span>
          <div className={styles.headerAccent} />
        </header>

        <div className={styles.statusBar}>
          <div className={styles.statusMain}>
            <span className={styles.statusPulse} aria-hidden="true">
              <span className={styles.statusPulseRing} />
              <span className={styles.statusPulseCore} />
            </span>
            <span className={styles.statusText}>SEARCHING FOR OPPONENT…</span>
          </div>
          <span className={styles.statusSub}>Open to New Opportunities in Seattle or Bay Area</span>
        </div>

        <div className={styles.playerCard}>
          <span className={styles.p1Badge}>P1</span>
          <div className={styles.playerInfo}>
            <span className={styles.playerName}>Athavan Elangko</span>
            <span className={styles.playerTitle}>Product Manager · TPM</span>
            <span className={styles.playerAvail}>Available Jan 2027</span>
          </div>
        </div>

        <div className={styles.contactBtns}>
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

        <p className={styles.desktopNudge}>
          This arena was built for the Desktop Stage.{' '}
          Visit{' '}
          <a href="https://athavan.gg" className={styles.nudgeLink}>athavan.gg</a>
          {' '}on a larger screen for the full experience.
        </p>

        <a href="/resume.pdf" download className={styles.downloadBtn}>
          <span className={styles.downloadIcon}>↓</span>
          DOWNLOAD RESUME
        </a>

      </div>
    </div>
  )
}
