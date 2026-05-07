import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { About } from './pages/About.tsx'
import { Projects } from './pages/Projects.tsx'
import { Skills } from './pages/Skills.tsx'
import { Resume } from './pages/Resume.tsx'
import { Contact } from './pages/Contact.tsx'
import { BuildStory } from './pages/BuildStory.tsx'
import { NotFound } from './pages/NotFound.tsx'

export function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/build-story" element={<BuildStory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}
