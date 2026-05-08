import { useEffect, useRef } from 'react'

const COMBO = ['l', 'r', 'a', ' ']
const TIMEOUT_MS = 2000

export function useSecretCombo(onMatch: () => void): void {
  const onMatchRef = useRef(onMatch)
  onMatchRef.current = onMatch

  useEffect(() => {
    let idx = 0
    let timer: ReturnType<typeof setTimeout>

    function advance(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (['shift', 'control', 'alt', 'meta', 'capslock', 'tab'].includes(key)) return

      if (key === COMBO[idx]) {
        clearTimeout(timer)
        idx++
        if (idx === COMBO.length) {
          idx = 0
          onMatchRef.current()
          return
        }
        timer = setTimeout(() => { idx = 0 }, TIMEOUT_MS)
      } else {
        clearTimeout(timer)
        idx = key === COMBO[0] ? 1 : 0
        if (idx === 1) {
          timer = setTimeout(() => { idx = 0 }, TIMEOUT_MS)
        }
      }
    }

    window.addEventListener('keydown', advance)
    return () => {
      window.removeEventListener('keydown', advance)
      clearTimeout(timer)
    }
  }, [])
}
