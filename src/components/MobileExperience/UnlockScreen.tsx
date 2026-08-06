import styles from './UnlockScreen.module.css'

interface Props {
  onTap: () => void
}

export function UnlockScreen({ onTap }: Props) {
  return (
    <div className={styles.screen} onClick={onTap}>
      <div className={styles.burst} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.star} aria-hidden="true" />
      <p className={styles.challenger}>NEW CHALLENGER APPROACHING</p>
      <p className={styles.tapHint}>TAP TO UNLOCK</p>
    </div>
  )
}
