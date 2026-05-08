import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <div className={styles.screen}>
      <StarsBackground />
      <motion.div
        className={styles.dialog}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        <p className={styles.errorCode}>Error Code: 404-0001</p>
        <p className={styles.message}>
          A connection error has occurred.{'\n'}
          Fighter data not found in this stage.
        </p>
        <Link to="/" className={styles.okBtn}>
          Return to Main Menu
        </Link>
      </motion.div>
    </div>
  )
}
