import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ResumePage.module.css'

type Section = 'experience' | 'education' | 'certifications' | 'skills'

const SECTIONS: Section[] = ['experience', 'education', 'certifications', 'skills']

const TILES = [
  { id: 'experience' as Section, icon: '📋', label: 'Experience' },
  { id: 'education' as Section, icon: '🎓', label: 'Education' },
  { id: 'certifications' as Section, icon: '🏅', label: 'Certifications' },
  { id: 'skills' as Section, icon: '⚡', label: 'Skills' },
]

const EXP_ENTRIES = [
  { title: 'Scrum Master, Wealth Management', org: 'TD', period: 'March 2024 – Present', color: '#2a78ff' },
  { title: 'Project Manager, Wealth Technology', org: 'TD', period: '2022 – 2024', color: '#22aa55' },
  { title: 'Senior Project Analyst', org: 'TD', period: '2020 – 2022', color: '#efa322' },
]

const EDU_ENTRIES = [
  { degree: 'M.S. Information Systems', school: 'University of Utah', period: '2025 – 2027 (Expected)' },
]

const CERT_ENTRIES = [
  { name: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft', status: 'Completed', statusColor: '#22cc66' },
  { name: 'Azure Administrator (AZ-104)', issuer: 'Microsoft', status: 'In Progress', statusColor: '#f5c518' },
]

const SKILL_ENTRIES = [
  { icon: '◈', label: 'Product & Delivery', color: '#2a78ff' },
  { icon: '↻', label: 'Agile / Scrum', color: '#22aa55' },
  { icon: '▦', label: 'Data & Analytics', color: '#f5c518' },
  { icon: '⬢', label: 'Program Execution', color: '#efa322' },
  { icon: '△', label: 'Cloud / Azure', color: '#6c3ad1' },
  { icon: '⬡', label: 'Engineering Foundations', color: '#d4377d' },
]

const SECTION_LABELS: Record<Section, string> = {
  experience: 'EXPERIENCE',
  education: 'EDUCATION',
  certifications: 'CERTIFICATIONS',
  skills: 'SKILLS',
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

function DetailContent({ section }: { section: Section }) {
  if (section === 'experience') {
    return (
      <div className={styles.detailList}>
        {EXP_ENTRIES.map(e => (
          <div key={e.title} className={styles.expEntry}>
            <div className={styles.expAccent} style={{ background: e.color }} />
            <div className={styles.expBody}>
              <span className={styles.expTitle}>{e.title}</span>
              <span className={styles.expMeta}>{e.org} · {e.period}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section === 'education') {
    return (
      <div className={styles.detailList}>
        {EDU_ENTRIES.map(e => (
          <div key={e.degree} className={styles.expEntry}>
            <div className={styles.expAccent} style={{ background: '#6c3ad1' }} />
            <div className={styles.expBody}>
              <span className={styles.expTitle}>{e.degree}</span>
              <span className={styles.expMeta}>{e.school} · {e.period}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section === 'certifications') {
    return (
      <div className={styles.detailList}>
        {CERT_ENTRIES.map(c => (
          <div key={c.name} className={styles.certEntry}>
            <div className={styles.certName}>{c.name}</div>
            <div className={styles.certMeta}>
              <span className={styles.certIssuer}>{c.issuer}</span>
              <span className={styles.certStatus} style={{ color: c.statusColor, borderColor: c.statusColor }}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <ul className={styles.skillList}>
      {SKILL_ENTRIES.map(s => (
        <li key={s.label} className={styles.skillRow}>
          <span className={styles.skillIcon} style={{ color: s.color }}>{s.icon}</span>
          <span className={styles.skillLabel}>{s.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function ResumePage() {
  const [active, setActive] = useState<Section | null>(null)
  const [dir, setDir] = useState(1)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  function openSection(id: Section) {
    setDir(1)
    setActive(id)
  }

  function navigate(dx: number) {
    if (active === null) {
      if (dx > 0) openSection('experience')
    } else {
      const idx = SECTIONS.indexOf(active)
      if (dx > 0) {
        const next = SECTIONS[idx + 1]
        if (next) { setDir(1); setActive(next) }
      } else {
        const prev = SECTIONS[idx - 1]
        if (prev) { setDir(-1); setActive(prev) }
        else { setDir(-1); setActive(null) }
      }
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]
    if (!t) return
    touchStartX.current = t.clientX
    touchStartY.current = t.clientY
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const t = e.changedTouches[0]
    if (!t) return
    const dx = touchStartX.current - t.clientX
    const dy = touchStartY.current - t.clientY
    if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 50) return
    e.stopPropagation()
    navigate(dx)
  }

  return (
    <div className={styles.page} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={styles.slideWrap}>
        <AnimatePresence custom={dir} mode="wait">
          {active === null ? (
            <motion.div
              key="tiles"
              className={styles.pane}
              custom={dir}
              variants={slideVariants}
              initial={false}
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <header className={styles.header}>
                <span className={styles.headerLabel}>ARCHIVE</span>
                <div className={styles.headerAccent} />
              </header>

              <div className={styles.tilesGrid}>
                {TILES.map(t => (
                  <button
                    key={t.id}
                    className={styles.tile}
                    onClick={() => openSection(t.id)}
                  >
                    <span className={styles.tileIcon}>{t.icon}</span>
                    <span className={styles.tileLabel}>{t.label}</span>
                    <span className={styles.tileArrow}>›</span>
                  </button>
                ))}
              </div>

              <a href="/resume.pdf" download className={styles.downloadBtn}>
                <span className={styles.downloadIcon}>↓</span>
                DOWNLOAD PDF
              </a>

              <p className={styles.swipePrompt}>Tap a section or swipe left to explore</p>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              className={styles.pane}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.detailHeader}>
                <button className={styles.backBtn} onClick={() => { setDir(-1); setActive(null) }}>
                  ‹ ARCHIVE
                </button>
                <div className={styles.sectionDots}>
                  {SECTIONS.map(s => (
                    <span
                      key={s}
                      className={[styles.sectionDot, s === active ? styles.sectionDotActive : ''].join(' ')}
                    />
                  ))}
                </div>
              </div>

              <p className={styles.detailTitle}>{SECTION_LABELS[active]}</p>

              <DetailContent section={active} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
