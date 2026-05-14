import { useEffect, useRef, useState } from 'react'
import { audioManager } from '../../audio/audioManager.ts'
import styles from './PressStart.module.css'

// Module-level flag: resets to false on every page load/refresh,
// but stays true when navigating within the SPA so the splash
// doesn't re-appear when the user returns to Home mid-session.
let hasBeenDismissed = false

const FLASH_DURATION_MS = 320

export function PressStart() {
  const [visible, setVisible] = useState<boolean>(() => !hasBeenDismissed)
  const [dismissing, setDismissing] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (visible && !dismissing) {
      buttonRef.current?.focus()
    }
  }, [visible, dismissing])

  useEffect(() => {
    if (visible) {
      document.documentElement.dataset.splash = 'visible'
    } else {
      delete document.documentElement.dataset.splash
    }
    return () => { delete document.documentElement.dataset.splash }
  }, [visible])

  // If the splash was skipped (navigating back to Home mid-session),
  // re-unlock audio on the first user interaction.
  useEffect(() => {
    if (visible) return
    function onInteract() {
      audioManager.unlock()
      window.removeEventListener('click',   onInteract, true)
      window.removeEventListener('keydown', onInteract, true)
    }
    window.addEventListener('click',   onInteract, true)
    window.addEventListener('keydown', onInteract, true)
    return () => {
      window.removeEventListener('click',   onInteract, true)
      window.removeEventListener('keydown', onInteract, true)
    }
  }, [visible])

  useEffect(() => {
    if (!visible || dismissing) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Tab') return
      e.preventDefault()
      dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, dismissing])

  function dismiss() {
    if (dismissing) return
    audioManager.playEffect('break')
    hasBeenDismissed = true
    setDismissing(true)
    window.setTimeout(() => {
      setVisible(false)
      audioManager.unlock()
    }, FLASH_DURATION_MS)
  }

  if (!visible) return null

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.overlay} ${dismissing ? styles.dismissing : ''}`}
      onClick={dismiss}
      onTouchStart={dismiss}
      aria-label="Press Start to enter the portfolio"
    >
      <h1 className={styles.title}>
        Athavan <em>Elangko</em>
      </h1>
      <p className={styles.prompt}>Press Start</p>
      <p className={styles.hint}>Press any key · Click · Tap</p>
    </button>
  )
}
