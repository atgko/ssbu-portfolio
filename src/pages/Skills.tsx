import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import { audioManager } from '../audio/audioManager.ts'
import styles from './Skills.module.css'

type Proficiency = 'Expert' | 'Advanced' | 'Intermediate'

interface SkillCategory {
  id: string
  label: string
  icon: string
  color: string
  skills: string[]
  proficiency: Proficiency
  years: string
}

interface ExperienceEntry {
  id: string
  title: string
  org: string
  period: string
  details: string
  color: string
}

const PROF_COLOR: Record<Proficiency, string> = {
  Expert:       '#22cc66',
  Advanced:     '#f5c518',
  Intermediate: '#2a78ff',
}

const CATEGORIES: SkillCategory[] = [
  {
    id: 'product',
    label: 'Product & Delivery',
    icon: '◈',
    color: '#2a78ff',
    skills: [
      'Product Roadmapping', 'Backlog Prioritization', 'PI Planning',
      'Stakeholder Management', 'Cross-functional Leadership',
      'Requirements Analysis', 'PRDs', 'Go-to-Market',
    ],
    proficiency: 'Expert',
    years: '8+',
  },
  {
    id: 'agile',
    label: 'Agile / Scrum',
    icon: '↻',
    color: '#22aa55',
    skills: [
      'Scrum Master', 'SAFe 6 Certified', 'Sprint Planning',
      'Retrospectives', 'Jira', 'Confluence', 'PI Planning', 'Backlog Grooming',
    ],
    proficiency: 'Expert',
    years: '6+',
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    icon: '▦',
    color: '#f5c518',
    skills: [
      'SQL', 'Relational DB Design', 'Data Modelling', 'Data Analysis',
      'Python (OOP)', 'Tableau', 'R',
    ],
    proficiency: 'Advanced',
    years: '5+',
  },
  {
    id: 'program',
    label: 'Program Execution',
    icon: '⬢',
    color: '#efa322',
    skills: [
      'SDLC', 'Program Governance', 'Risk & Dependency Mgmt',
      'Lean Six Sigma', 'Process Improvement', 'PMO', 'Executive Reporting',
    ],
    proficiency: 'Expert',
    years: '8+',
  },
  {
    id: 'cloud',
    label: 'Cloud / Azure',
    icon: '△',
    color: '#6c3ad1',
    skills: [
      'Azure Fundamentals (in progress)', 'Azure Portal',
      'Cloud Concepts', 'Resource Groups',
    ],
    proficiency: 'Intermediate',
    years: '1+',
  },
  {
    id: 'engineering',
    label: 'Engineering Foundations',
    icon: '⬡',
    color: '#d4377d',
    skills: [
      'Computer Science', 'Statistics', 'Python (OOP)',
      'SQL', 'Relational Databases', 'Systems Design',
    ],
    proficiency: 'Intermediate',
    years: '3+',
  },
  {
    id: 'ai-tools',
    label: 'AI Tools & Prompting',
    icon: '✦',
    color: '#9966ff',
    skills: [
      'Claude / Claude Code', 'Prompt Engineering',
      'ChatGPT / GPT-4', 'AI-assisted Workflows',
    ],
    proficiency: 'Intermediate',
    years: '2+',
  },
]

const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'uofutah-ta',
    title: 'Teaching Assistant, Eccles School of Business',
    org: 'University of Utah',
    period: 'Feb 2026 – Aug 2026',
    details:
      'Supporting coursework in Project Management (Feb–May 2026) and Python Programming (May–Aug 2026). Facilitating labs, holding office hours, and grading student work.',
    color: '#00bbcc',
  },
  {
    id: 'make-slc',
    title: 'Event Committee Chair',
    org: 'Make Salt Lake',
    period: 'Jan 2026 – Present',
    details:
      'Coordinating planning and execution of monthly makerspace programming, supporting multi-session events (4+ concurrent classes) with ~60+ attendees. Leading biweekly planning meetings, managing on-site operations, and tracking schedules and resource needs across recurring programming.',
    color: '#e86b1a',
  },
  {
    id: 'td-sm',
    title: 'Scrum Master, Wealth Management',
    org: 'TD',
    period: 'March 2024 – Present',
    details:
      'Launched and coached four agile product teams supporting ~$100M in annual net asset growth. Reduced release cycle time by ~25–30% through improved backlog prioritization and PI planning.',
    color: '#2a78ff',
  },
  {
    id: 'td-pm',
    title: 'Project Manager, Wealth Management',
    org: 'TD',
    period: 'April 2022 – March 2024',
    details:
      'Delivered $3M+ in concurrent enterprise technology initiatives across Canada and the U.S., including regulatory modernization and wealth data platform enhancements.',
    color: '#22aa55',
  },
  {
    id: 'td-pa',
    title: 'Project Analyst, Wealth Management',
    org: 'TD',
    period: 'April 2019 – April 2022',
    details:
      'Managed financial planning for a $20M+ enterprise data strategy portfolio (~12 projects). Built PMO governance artifacts and executive reporting for monthly steering committees.',
    color: '#f5c518',
  },
  {
    id: 'rbc',
    title: 'Project Coordinator, Finance IT',
    org: 'RBC',
    period: 'December 2019 – April 2022',
    details:
      'Supported delivery of data strategy initiatives, managed financial forecasts, and designed an intake workflow for the data modeling team to improve throughput.',
    color: '#cc2200',
  },
]

export function Skills() {
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0]!.id)
  const active = CATEGORIES.find(c => c.id === activeId)!
  const navigate = useNavigate()

  useEffect(() => { document.title = 'Skills · Athavan Elangko' }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const idx = CATEGORIES.findIndex(c => c.id === activeId)
      switch (e.key) {
        case 'ArrowUp': {
          e.preventDefault()
          const prev = CATEGORIES[idx - 1]
          if (prev) { audioManager.playEffect('forward'); setActiveId(prev.id) }
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          const next = CATEGORIES[idx + 1]
          if (next) { audioManager.playEffect('forward'); setActiveId(next.id) }
          break
        }
        case 'a':
        case 'A':
          break
        case 'b':
        case 'B':
          audioManager.playEffect('back')
          navigate('/')
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeId, navigate])

  return (
    <>
      <StarsBackground />
      <motion.main
        className={styles.page}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <header className={styles.topBar}>
          <Link to="/" className={styles.backBtn} onClick={() => audioManager.playEffect('back')}>← MAIN MENU</Link>
          <span className={styles.screenTitle}>SKILLS &amp; EXPERIENCE</span>
          <span className={styles.p1Badge}>P1</span>
        </header>

        <div className={styles.content}>
          {/* ── Left: category menu ── */}
          <aside className={styles.menuPanel}>
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.id}
                type="button"
                className={[
                  styles.menuRow,
                  activeId === cat.id ? styles.menuRowActive : '',
                ].join(' ')}
                onClick={() => { audioManager.playEffect('forward'); setActiveId(cat.id) }}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.24 }}
              >
                <span className={styles.menuIcon} style={{ background: cat.color }}>
                  {cat.icon}
                </span>
                <span className={styles.menuLabel}>{cat.label}</span>
                <span className={styles.menuProf} style={{ color: PROF_COLOR[cat.proficiency] }}>
                  {cat.proficiency}
                </span>
                <span className={styles.menuArrow}>›</span>
              </motion.button>
            ))}
          </aside>

          {/* ── Right: skill detail + experience ── */}
          <div className={styles.detailArea}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                className={styles.categoryDetail}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <div className={styles.categoryHeader} style={{ borderLeftColor: active.color }}>
                  <span className={styles.categoryIcon} style={{ background: active.color }}>
                    {active.icon}
                  </span>
                  <div className={styles.categoryTitles}>
                    <h2 className={styles.categoryName}>{active.label}</h2>
                    <span className={styles.categoryMeta}>
                      <span style={{ color: PROF_COLOR[active.proficiency] }}>{active.proficiency}</span>
                      &nbsp;·&nbsp;{active.years} yrs
                    </span>
                  </div>
                </div>

                <div className={styles.chipGrid}>
                  {active.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className={styles.chip}
                      style={{ borderColor: `${active.color}88` }}
                      initial={{ opacity: 0, scale: 0.86 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.038, duration: 0.16 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Experience timeline */}
            <div className={styles.expSection}>
              <p className={styles.expHeading}>MATCH HISTORY</p>
              <div className={styles.expList}>
                {EXPERIENCE.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    className={styles.expEntry}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32 + i * 0.08, duration: 0.24 }}
                  >
                    <div className={styles.expStripe} style={{ background: exp.color }} />
                    <div className={styles.expContent}>
                      <div className={styles.expTopRow}>
                        <span className={styles.expTitle}>{exp.title}</span>
                        <span className={styles.expPeriod}>{exp.period}</span>
                      </div>
                      <span className={styles.expOrg}>{exp.org}</span>
                      <p className={styles.expDetails}>{exp.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className={styles.bottomBar}>
          <span className={styles.hint}>
            <kbd>↑↓</kbd> Browse &nbsp;·&nbsp; <kbd>A</kbd> Select &nbsp;·&nbsp; <kbd>B</kbd> Back
          </span>
        </footer>
      </motion.main>
    </>
  )
}
