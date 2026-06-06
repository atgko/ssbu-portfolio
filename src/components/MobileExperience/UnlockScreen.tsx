import { motion } from 'framer-motion'
import fighterImg from '../../assets/personal/fighter.jpg'
import styles from './UnlockScreen.module.css'

interface Props {
  onTap: () => void
}

export function UnlockScreen({ onTap }: Props) {
  return (
    <div className={styles.screen} onClick={onTap}>
      <div className={styles.burst} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.challenger}>NEW CHALLENGER APPROACHING</p>
      <motion.img
        src={fighterImg}
        alt=""
        className={styles.silhouette}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <p className={styles.tapHint}>TAP TO UNLOCK</p>
    </div>
  )
}
