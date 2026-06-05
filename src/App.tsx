import { useState, useCallback, useRef } from 'react'
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
import { audioManager } from './audio/audioManager.ts'
import { MobileExperience } from './components/MobileExperience/MobileExperience.tsx'
import styles from './App.module.css'

export function App() {
  const isMelee = useRef(false)
  const [toast, setToast] = useState<string | null>(null)

  const handleCombo = useCallback(() => {
    isMelee.current = !isMelee.current
    const next = isMelee.current
    document.documentElement.setAttribute('data-theme', next ? 'melee' : '')
    audioManager.setTheme(next ? 'melee' : 'ssbu')
    setToast(next ? 'MELEE MODE' : 'ULTIMATE MODE')
    setTimeout(() => setToast(null), 1800)
  }, [])

  useSecretCombo(handleCombo)

  return (
    <>
      <MobileExperience />
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
