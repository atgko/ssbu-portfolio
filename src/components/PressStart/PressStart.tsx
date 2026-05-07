import { useEffect, useRef, useState } from 'react'
import styles from './PressStart.module.css'

const STORAGE_KEY = 'ssbu.pressStart.dismissed'
const FLASH_DURATION_MS = 320

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function writeDismissed(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* sessionStorage may be unavailable; splash will simply re-show next load. */
  }
}

export function PressStart() {
  const [visible, setVisible] = useState<boolean>(() => !readDismissed())
  const [dismissing, setDismissing] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (visible && !dismissing) {
      buttonRef.current?.focus()
    }
  }, [visible, dismissing])

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
    writeDismissed()
    setDismissing(true)
    window.setTimeout(() => setVisible(false), FLASH_DURATION_MS)
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
