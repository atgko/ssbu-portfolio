import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { About } from './pages/About.tsx'
import { Projects } from './pages/Projects.tsx'
import { Skills } from './pages/Skills.tsx'
import { Resume } from './pages/Resume.tsx'
import { Contact } from './pages/Contact.tsx'
import { BuildStory } from './pages/BuildStory.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { useSecretCombo } from './hooks/useSecretCombo.ts'
import styles from './App.module.css'

export function App() {
  const [meleeMode, setMeleeMode] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const handleCombo = useCallback(() => {
    setMeleeMode(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'melee' : '')
      setToast(next ? 'MELEE MODE' : 'ULTIMATE MODE')
      setTimeout(() => setToast(null), 1800)
      return next
    })
  }, [])

  useSecretCombo(handleCombo)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/build-story" element={<BuildStory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {toast && (
        <div key={toast} className={styles.toast}>
          <span className={styles.toastTitle}>{toast}</span>
          <span className={styles.toastSub}>L → R → A → SPACE</span>
        </div>
      )}
    </>
  )
}
