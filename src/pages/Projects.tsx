import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import { audioManager } from '../audio/audioManager.ts'
import styles from './Projects.module.css'

type SpiritType = 'shield' | 'attack' | 'neutral'
type ProjectStatus = 'Shipped' | 'In Progress' | 'Coming Soon'
type SortMode = 'power-desc' | 'power-asc' | 'name-asc'

interface Project {
  id: string
  name: string
  type: SpiritType
  level: number
  power: number
  role: string
  status: ProjectStatus
  slots: number
  skill: string
  isNew: boolean
  starred: boolean
  description: string
  tags: string[]
  demoUrl: string | null
  githubUrl: string | null
  buildStoryUrl: string | null
  artGradient: [string, string, string]
  artLetter: string
}

const TYPE_COLOR: Record<SpiritType, string> = {
  shield:  '#2a78ff',
  attack:  '#cc2200',
  neutral: '#666688',
}

const TYPE_SYMBOL: Record<SpiritType, string> = {
  shield:  '🛡',
  attack:  '△',
  neutral: '○',
}

const STATUS_COLOR: Record<ProjectStatus, string> = {
  'Shipped':      '#22cc66',
  'In Progress':  '#f5c518',
  'Coming Soon':  '#888899',
}

const SORT_LABEL: Record<SortMode, string> = {
  'power-desc': 'By Power (Descending)',
  'power-asc':  'By Power (Ascending)',
  'name-asc':   'By Name (A–Z)',
}

const SORT_NEXT: Record<SortMode, SortMode> = {
  'power-desc': 'power-asc',
  'power-asc':  'name-asc',
  'name-asc':   'power-desc',
}

function sortProjects(projects: Project[], mode: SortMode): Project[] {
  return [...projects].sort((a, b) => {
    if (mode === 'power-desc') return b.power - a.power
    if (mode === 'power-asc')  return a.power - b.power
    return a.name.localeCompare(b.name)
  })
}

const PROJECTS: Project[] = [
  {
    id: 'wayfound',
    name: 'Wayfound',
    type: 'shield',
    level: 34,
    power: 9800,
    role: 'PM Lead',
    status: 'In Progress',
    slots: 3,
    skill: 'Product Strategy ↑',
    isNew: false,
    starred: true,
    description:
      'AI-powered platform enabling organizations to capture, surface, and communicate institutional knowledge. Led product roadmap, stakeholder alignment, and go-to-market strategy across cross-functional teams.',
    tags: ['AI', 'B2B SaaS', 'Product Management', 'Roadmap'],
    demoUrl: 'https://wayfound-chi.vercel.app/',
    githubUrl: null,
    buildStoryUrl: null,
    artGradient: ['#060e24', '#0a2a6e', '#1a6fff'],
    artLetter: 'W',
  },
  {
    id: 'ssbu-portfolio',
    name: 'SSBU Portfolio',
    type: 'attack',
    level: 15,
    power: 7420,
    role: 'Solo Developer',
    status: 'In Progress',
    slots: 2,
    skill: 'Frontend Craft ↑',
    isNew: false,
    starred: false,
    description:
      'A personal portfolio website built as a pixel-faithful recreation of the Super Smash Bros. Ultimate UI. Demonstrates frontend craft, design fidelity, and product thinking applied to a personal project.',
    tags: ['React', 'Vite', 'TypeScript', 'Framer Motion'],
    demoUrl: null,
    githubUrl: null,
    buildStoryUrl: '/build-story',
    artGradient: ['#1a0505', '#6e0a0a', '#cc3300'],
    artLetter: 'S',
  },
  {
    id: 'capstone',
    name: 'Capstone',
    type: 'neutral',
    level: 1,
    power: 1200,
    role: 'TBD',
    status: 'Coming Soon',
    slots: 1,
    skill: '??? ↑',
    isNew: true,
    starred: false,
    description:
      'University of Utah M.S. Information Systems capstone project. Direction and details TBD — watch this space.',
    tags: ['Coming Soon', 'U of U', 'MSIS'],
    demoUrl: null,
    githubUrl: null,
    buildStoryUrl: null,
    artGradient: ['#0d0d14', '#1a1a28', '#2a2a44'],
    artLetter: '?',
  },
]

function HexSlot({ filled }: { filled: boolean }) {
  return <span className={[styles.hexSlot, filled ? styles.hexFilled : styles.hexEmpty].join(' ')} />
}

export function Projects() {
  const [sortMode, setSortMode] = useState<SortMode>('power-desc')
  const sorted = sortProjects(PROJECTS, sortMode)
  const [selected, setSelected] = useState<Project>(PROJECTS[0]!)

  return (
    <>
      <StarsBackground />
      <motion.div
        className={styles.page}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Top bar ── */}
        <header className={styles.topBar}>
          <Link to="/" className={styles.backBtn} onClick={() => audioManager.playEffect('back')}>← MAIN MENU</Link>
          <span className={styles.screenTitle}>SPIRIT COLLECTION</span>
          <span className={styles.p1Badge}>P1</span>
        </header>

        {/* ── Main content ── */}
        <div className={styles.content}>

          {/* ── Detail panel (left) ── */}
          <AnimatePresence mode="wait">
            <motion.aside
              key={selected.id}
              className={styles.detailPanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* Art area */}
              <div
                className={styles.artArea}
                style={{ background: `radial-gradient(ellipse at 48% 58%, ${selected.artGradient[1]}cc 0%, ${selected.artGradient[0]} 72%)` }}
              >
                <div className={styles.nebula1} style={{ background: `radial-gradient(ellipse at 30% 40%, ${selected.artGradient[2]}44 0%, transparent 55%)` }} />
                <div className={styles.nebula2} style={{ background: `radial-gradient(ellipse at 70% 65%, ${selected.artGradient[1]}33 0%, transparent 50%)` }} />

                <div className={styles.powerOverlay}>
                  <span className={styles.powerNum}>{selected.power.toLocaleString()}</span>
                  <span className={styles.powerLabel}>Power</span>
                </div>

                <span
                  className={styles.artLetter}
                  style={{ color: selected.artGradient[2], textShadow: `0 0 60px ${selected.artGradient[2]}, 0 0 120px ${selected.artGradient[1]}` }}
                >
                  {selected.artLetter}
                </span>
              </div>

              {/* Info area */}
              <div className={styles.infoArea}>
                {/* Name row */}
                <div className={styles.nameRow}>
                  {selected.starred && <span className={styles.nameStar}>★</span>}
                  <span className={styles.nameTypeIcon} style={{ color: TYPE_COLOR[selected.type] }}>
                    {TYPE_SYMBOL[selected.type]}
                  </span>
                  <h2 className={styles.spiritName}>{selected.name}</h2>
                </div>

                {/* Level + team slots */}
                <div className={styles.levelSlotRow}>
                  <div className={styles.levelPill} style={{ background: TYPE_COLOR[selected.type] }}>
                    <span className={styles.levelTypeIcon}>{TYPE_SYMBOL[selected.type]}</span>
                    <span className={styles.levelText}>Lv. {selected.level}</span>
                  </div>
                  <div className={styles.slotsGroup}>
                    <span className={styles.slotsLabel}>SCOPE</span>
                    <div className={styles.hexRow}>
                      {Array.from({ length: 3 }, (_, i) => (
                        <HexSlot key={i} filled={i < selected.slots} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metadata: role + status */}
                <dl className={styles.metaBox}>
                  <dt className={styles.metaKey}>ROLE</dt>
                  <dd className={styles.metaVal}>{selected.role}</dd>
                  <dt className={styles.metaKey}>STATUS</dt>
                  <dd className={styles.metaVal} style={{ color: STATUS_COLOR[selected.status] }}>
                    {selected.status === 'Shipped' ? `${selected.status} ✓` : selected.status}
                  </dd>
                </dl>

                {/* Skill bar */}
                <div className={styles.skillBar}>
                  <span className={styles.skillIcon}>⚔</span>
                  <span className={styles.skillText}>{selected.skill}</span>
                  <span className={styles.skillArrow}>↑</span>
                </div>
              </div>

              {/* Bottom controls */}
              <div className={styles.controls}>
                <span className={styles.controlHint}>
                  <span className={styles.controlBtn}>ZL</span> Favorite
                </span>
                <span className={styles.controlDivider} />
                <span className={styles.controlHint}>
                  <span className={styles.controlBtn}>X</span>
                  {selected.buildStoryUrl
                    ? <Link to={selected.buildStoryUrl} className={styles.controlLink}>Patch Notes</Link>
                    : selected.demoUrl
                      ? <a href={selected.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.controlLink}>Visit Site</a>
                      : selected.githubUrl
                        ? <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.controlLink}>GitHub</a>
                        : <span className={styles.controlDimmed}>Details</span>
                  }
                </span>
              </div>
            </motion.aside>
          </AnimatePresence>

          {/* ── Grid panel (right) ── */}
          <div className={styles.gridPanel}>
            {/* Sort bar */}
            <div className={styles.sortBar}>
              <button
                className={styles.sortBtn}
                type="button"
                onClick={() => setSortMode(SORT_NEXT[sortMode])}
              >
                <span className={styles.sortBtnIcon}>Y</span>
                {SORT_LABEL[sortMode]}
              </button>
              <div className={styles.filterBtn}>
                <span className={styles.sortBtnIcon}>R</span>
                Filter
                <span className={styles.filterOff}>Off</span>
              </div>
            </div>

            {/* Card grid */}
            <div className={styles.cardGrid}>
              {sorted.map(p => (
                <motion.button
                  key={p.id}
                  type="button"
                  className={[styles.card, selected.id === p.id ? styles.cardSelected : ''].join(' ')}
                  onClick={() => setSelected(p)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div
                    className={styles.cardArt}
                    style={{ background: `radial-gradient(ellipse at 50% 55%, ${p.artGradient[1]}88 0%, ${p.artGradient[0]} 80%)` }}
                  >
                    <span className={styles.cardArtLetter} style={{ color: p.artGradient[2] }}>
                      {p.artLetter}
                    </span>
                  </div>

                  <span className={styles.cardTypeIcon} style={{ background: TYPE_COLOR[p.type] }}>
                    {TYPE_SYMBOL[p.type]}
                  </span>

                  {p.starred && <span className={styles.cardStar}>★</span>}

                  <span className={styles.cardLevel}>Lv. {p.level}</span>

                  {p.isNew && <span className={styles.cardNew}>NEW</span>}

                  <div className={styles.cardBottom}>
                    <span className={styles.cardPower}>{p.power.toLocaleString()}</span>
                    <div className={styles.cardHexRow}>
                      {Array.from({ length: p.slots }, (_, i) => (
                        <span key={i} className={styles.cardHex} />
                      ))}
                    </div>
                  </div>

                  <div className={styles.cardStripe} style={{ background: TYPE_COLOR[p.type] }} />
                </motion.button>
              ))}
            </div>

            {/* Description overlay — slides in at bottom of grid panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                className={styles.descPanel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className={styles.descAccent} style={{ background: TYPE_COLOR[selected.type] }} />
                <div className={styles.descBody}>
                  <p className={styles.descText}>{selected.description}</p>
                  <div className={styles.descFooter}>
                    <div className={styles.descTags}>
                      {selected.tags.map(t => (
                        <span key={t} className={styles.descTag}>{t}</span>
                      ))}
                    </div>
                    {(selected.demoUrl || selected.githubUrl || selected.buildStoryUrl) && (
                      <div className={styles.descLinks}>
                        {selected.demoUrl && (
                          <a href={selected.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.descLink}>
                            ▶ Visit Site
                          </a>
                        )}
                        {selected.githubUrl && (
                          <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.descLink}>
                            GitHub
                          </a>
                        )}
                        {selected.buildStoryUrl && (
                          <Link to={selected.buildStoryUrl} className={styles.descLink}>
                            ▶ Patch Notes
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  )
}
