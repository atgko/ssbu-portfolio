import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarsBackground } from '../StarsBackground/StarsBackground.tsx'
import { UnlockScreen } from './UnlockScreen.tsx'
import { FighterPage } from './FighterPage.tsx'
import { ProjectsPage } from './ProjectsPage.tsx'
import { SkillsPage } from './SkillsPage.tsx'
import { ResumePage } from './ResumePage.tsx'
import { ContactPage } from './ContactPage.tsx'
import styles from './MobileExperience.module.css'

const TOTAL_PAGES = 5

function DotNav({ current, onDotClick }: { current: number; onDotClick: (i: number) => void }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: TOTAL_PAGES }, (_, i) => (
        <button
          key={i}
          className={[styles.dot, i === current ? styles.dotActive : ''].join(' ')}
          onClick={() => onDotClick(i)}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  )
}

function SwipeHint({ onDone }: { onDone: () => void }) {
  return (
    <div className={styles.swipeHint} onAnimationEnd={onDone} aria-hidden="true">
      👆
    </div>
  )
}

export function MobileExperience() {
  const [phase, setPhase] = useState<'unlock' | 'flash' | 'pages'>(
    () => sessionStorage.getItem('unlockSeen') ? 'pages' : 'unlock'
  )
  const [currentPage, setCurrentPage] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function goToPage(page: number) {
    const next = Math.max(0, Math.min(TOTAL_PAGES - 1, page))
    setCurrentPage(next)
  }

  function cancelHint() {
    if (hintTimer.current) {
      clearTimeout(hintTimer.current)
      hintTimer.current = null
    }
    if (!sessionStorage.getItem('swipeHintSeen')) {
      sessionStorage.setItem('swipeHintSeen', 'true')
    }
    setShowHint(false)
  }

  useEffect(() => {
    if (phase !== 'pages') return
    if (sessionStorage.getItem('swipeHintSeen')) return

    hintTimer.current = setTimeout(() => {
      setShowHint(true)
      sessionStorage.setItem('swipeHintSeen', 'true')
    }, 5000)

    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'pages') return
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [phase])

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]
    if (!t) return
    touchStartY.current = t.clientY
    touchStartX.current = t.clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const t = e.changedTouches[0]
    if (!t) return
    const deltaY = touchStartY.current - t.clientY
    const deltaX = touchStartX.current - t.clientX

    if (Math.abs(deltaX) > Math.abs(deltaY)) return
    if (Math.abs(deltaY) < 50) return

    cancelHint()
    goToPage(deltaY > 0 ? currentPage + 1 : currentPage - 1)
  }

  function handleUnlockTap() {
    setPhase('flash')
  }

  function completeFlash() {
    sessionStorage.setItem('unlockSeen', 'true')
    setPhase('pages')
  }

  return (
    <div className={styles.container}>
      {phase === 'unlock' && <UnlockScreen onTap={handleUnlockTap} />}

      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            className={styles.flashOverlay}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.35, 0.55, 1], ease: 'easeInOut' }}
            onAnimationComplete={completeFlash}
          />
        )}
      </AnimatePresence>

      {phase === 'pages' && (
        <>
          <StarsBackground />

          <div
            className={styles.track}
            style={{ transform: `translateY(calc(-${currentPage} * 100svh))` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <FighterPage />
            <ProjectsPage />
            <SkillsPage />
            <ResumePage />
            <ContactPage />
          </div>

          <DotNav current={currentPage} onDotClick={goToPage} />

          {showHint && <SwipeHint onDone={() => setShowHint(false)} />}
        </>
      )}
    </div>
  )
}
