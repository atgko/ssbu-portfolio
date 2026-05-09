import { StarsBackground } from '../StarsBackground/StarsBackground.tsx'
import styles from './MobileGate.module.css'

export function MobileGate() {
  return (
    <div className={styles.gate}>
      <StarsBackground />
      <div className={styles.inner}>
        <div className={styles.iconRow}>
          <span className={styles.icon}>⬡</span>
          <span className={styles.icon}>◈</span>
          <span className={styles.icon}>⬡</span>
        </div>
        <p className={styles.eyebrow}>STAGE INCOMPATIBLE</p>
        <h1 className={styles.heading}>Desktop Stage Required</h1>
        <p className={styles.body}>
          This arena was built for the Desktop Stage.<br />
          Visit <span className={styles.url}>athavan.gg</span> on a larger screen for the full experience.
        </p>
        <div className={styles.hint}>
          <span className={styles.hintKey}>PC</span>
          <span className={styles.hintText}>or</span>
          <span className={styles.hintKey}>Laptop</span>
          <span className={styles.hintText}>recommended</span>
        </div>
        <div className={styles.links}>
          <a href="https://www.linkedin.com/in/athavan-elangko" target="_blank" rel="noopener noreferrer" className={styles.link}>
            LinkedIn
          </a>
          <span className={styles.linkDivider}>·</span>
          <a href="mailto:athavan.elangko@gmail.com" className={styles.link}>
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
