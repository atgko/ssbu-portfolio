import styles from './StarsBackground.module.css'

export function StarsBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={`${styles.layer} ${styles.layerFar}`} />
      <div className={`${styles.layer} ${styles.layerMid}`} />
      <div className={`${styles.layer} ${styles.layerNear}`} />
    </div>
  )
}
