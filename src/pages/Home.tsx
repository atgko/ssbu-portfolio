import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HomeMenu } from '../components/HomeMenu/HomeMenu.tsx'
import { MENU } from '../components/HomeMenu/menu.ts'
import { PressStart } from '../components/PressStart/PressStart.tsx'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import styles from './Home.module.css'

function formatTime(d: Date): string {
  const hh = d.getHours().toString().padStart(2, '0')
  const mm = d.getMinutes().toString().padStart(2, '0')
  return `${hh}:${mm}`
}

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const active = MENU[activeIndex] ?? MENU[0]
  if (!active) return null

  return (
    <>
      <StarsBackground />
      <PressStart />
      <motion.main
        className={styles.home}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <header className={styles.topBar}>
          <span className={styles.brand}>
            Athavan <em>Elangko</em>
          </span>
          <span className={styles.topRight}>
            <span>P1</span>
            <span className={styles.battery} aria-hidden="true" />
          </span>
        </header>

        <section className={styles.stage}>
          <HomeMenu activeIndex={activeIndex} onActiveChange={setActiveIndex} />
        </section>

        <footer className={styles.bottomBar}>
          <span className={styles.activeSection}>
            {active.section}
          </span>
          <span className={styles.tagline}>{active.tagline}</span>
          <span className={styles.clock}>{formatTime(now)}</span>
        </footer>
      </motion.main>
    </>
  )
}
