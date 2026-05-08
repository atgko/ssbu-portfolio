import { useState } from 'react'
import type { ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import { audioManager } from '../audio/audioManager.ts'
import styles from './Resume.module.css'

type SectionId = 'experience' | 'education' | 'certifications' | 'skills'

interface VaultSection {
  id: SectionId
  label: string
  icon: string
  color: string
  count: string
}

interface ExperienceItem {
  id: string
  title: string
  org: string
  period: string
  location: string
  bullets: string[]
  color: string
}

interface EducationItem {
  id: string
  degree: string
  institution: string
  school: string
  period: string
  notes: string
}

interface CertItem {
  id: string
  name: string
  code: string
  issuer: string
  status: 'Earned' | 'In Progress'
  year: string
  color: string
}

interface SkillGroup {
  label: string
  color: string
  skills: string[]
}

const VAULT_SECTIONS: VaultSection[] = [
  { id: 'experience',     label: 'Experience',     icon: '⚔',  color: '#2a78ff', count: '4' },
  { id: 'education',      label: 'Education',      icon: '🎓', color: '#22aa55', count: '2' },
  { id: 'certifications', label: 'Certifications', icon: '★',  color: '#f5c518', count: '5' },
  { id: 'skills',         label: 'Skills',         icon: '◈',  color: '#d4377d', count: '6' },
]

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'td-sm',
    title: 'Scrum Master, Wealth Management',
    org: 'TD',
    period: 'March 2024 – Present',
    location: 'Toronto, ON',
    bullets: [
      'Launched and coached four agile product teams within TD Wealth\'s Acquisition product group, supporting ~$100M in annual net asset growth',
      'Reduced release cycle time by ~25–30% by improving backlog prioritization, restructuring Jira workflows, and implementing roadmap tracking in Confluence',
      'Led quarterly PI planning sessions for 40+ stakeholders across Financial Planning, Insurance, and Private Banking',
      'Enabled delivery of ~15 digital features annually and 2–3 production releases per quarter',
    ],
    color: '#2a78ff',
  },
  {
    id: 'td-pm',
    title: 'Project Manager, Wealth Management',
    org: 'TD',
    period: 'April 2022 – March 2024',
    location: 'Toronto, ON',
    bullets: [
      'Delivered 3–4 concurrent enterprise technology initiatives totaling $3M+ supporting regulatory modernization and wealth data platform enhancements',
      'Directed cross-functional delivery teams across Canada and the U.S., coordinating engineering, data, finance, HR, and vendor partners',
      'Led delivery of a regulatory modernization program (OFI) impacting front-end and back-end systems to meet year-end compliance deadlines',
      'Managed discovery and planning for a $700K variable compensation platform modernization and a $4M data platform enhancement program',
    ],
    color: '#22aa55',
  },
  {
    id: 'td-pa',
    title: 'Project Analyst, Wealth Management',
    org: 'TD',
    period: 'April 2019 – April 2022',
    location: 'Toronto, ON',
    bullets: [
      'Managed financial planning and resource forecasting for a $20M+ enterprise data strategy portfolio spanning ~12 projects',
      'Produced monthly portfolio analytics and forecasts informing hiring plans, prioritization, and risk mitigation',
      'Developed PMO governance artifacts, reporting dashboards, and executive steering committee presentations',
    ],
    color: '#f5c518',
  },
  {
    id: 'rbc',
    title: 'Project Coordinator, Finance IT',
    org: 'RBC',
    period: 'December 2019 – April 2022',
    location: 'Toronto, ON',
    bullets: [
      'Supported delivery of data strategy initiatives by managing financial forecasts, tracking milestones, and maintaining PMO governance artifacts',
      'Designed an intake workflow for the data modeling team, improving throughput and reducing manual effort',
    ],
    color: '#cc2200',
  },
]

const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'ms-msis',
    degree: 'Master of Science in Information Systems',
    institution: 'University of Utah',
    school: 'David Eccles School of Business',
    period: 'December 2026',
    notes: 'Salt Lake City, UT',
  },
  {
    id: 'uoft-bsc',
    degree: 'Honors Bachelor of Science',
    institution: 'University of Toronto',
    school: 'Computer Science and Statistics',
    period: 'May 2016',
    notes: 'Toronto, ON',
  },
]

const CERT_ITEMS: CertItem[] = [
  {
    id: 'pmp',
    name: 'Project Management Professional',
    code: 'PMP',
    issuer: 'PMI',
    status: 'Earned',
    year: '',
    color: '#2a78ff',
  },
  {
    id: 'cspo',
    name: 'Certified Scrum Product Owner',
    code: 'CSPO',
    issuer: 'Scrum Alliance',
    status: 'Earned',
    year: '',
    color: '#22aa55',
  },
  {
    id: 'safe',
    name: 'Certified SAFe 6 Scrum Master',
    code: 'SAFe 6',
    issuer: 'Scaled Agile',
    status: 'Earned',
    year: '',
    color: '#f5c518',
  },
  {
    id: 'lssgb',
    name: 'Lean Six Sigma Green Belt',
    code: 'LSSGB',
    issuer: 'IASSC',
    status: 'Earned',
    year: '',
    color: '#efa322',
  },
  {
    id: 'azure',
    name: 'Azure Fundamentals',
    code: 'AZ-900',
    issuer: 'Microsoft',
    status: 'In Progress',
    year: '',
    color: '#6c3ad1',
  },
]

const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Product',  color: '#2a78ff', skills: ['Product Roadmapping', 'Backlog Prioritization', 'PI Planning', 'Stakeholder Mgmt', 'Go-to-Market'] },
  { label: 'Agile',    color: '#22aa55', skills: ['Scrum Master', 'SAFe 6', 'Sprint Planning', 'Jira', 'Confluence', 'PI Planning'] },
  { label: 'Data',     color: '#f5c518', skills: ['SQL', 'Relational DB Design', 'Data Modelling', 'Python (OOP)', 'Tableau', 'R'] },
  { label: 'Execution',color: '#efa322', skills: ['SDLC', 'Program Governance', 'Risk Mgmt', 'Lean Six Sigma', 'PMO', 'Process Improvement'] },
  { label: 'Cloud',    color: '#6c3ad1', skills: ['Azure Fundamentals (in progress)', 'Azure Portal', 'Cloud Concepts'] },
  { label: 'Delivery', color: '#d4377d', skills: ['Requirements Analysis', 'Cross-functional Leadership', 'Executive Reporting', 'Dependency Mgmt'] },
]

function ExperienceSection() {
  return (
    <div className={styles.sectionContent}>
      {EXPERIENCE_ITEMS.map((item, i) => (
        <motion.div
          key={item.id}
          className={styles.expCard}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.22 }}
        >
          <div className={styles.expCardAccent} style={{ background: item.color }} />
          <div className={styles.expCardBody}>
            <div className={styles.expCardTop}>
              <div className={styles.expCardLeft}>
                <span className={styles.expCardTitle}>{item.title}</span>
                <span className={styles.expCardOrg} style={{ color: item.color }}>{item.org}</span>
              </div>
              <div className={styles.expCardRight}>
                <span className={styles.expCardPeriod}>{item.period}</span>
                <span className={styles.expCardLocation}>{item.location}</span>
              </div>
            </div>
            <ul className={styles.expCardBullets}>
              {item.bullets.map(b => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function EducationSection() {
  return (
    <div className={styles.sectionContent}>
      {EDUCATION_ITEMS.map((item, i) => (
        <motion.div
          key={item.id}
          className={styles.eduCard}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.22 }}
        >
          <div className={styles.eduCardAccent} />
          <div className={styles.eduCardBody}>
            <div className={styles.eduCardDegree}>{item.degree}</div>
            <div className={styles.eduCardInstitution}>{item.institution}</div>
            {item.school && <div className={styles.eduCardSchool}>{item.school}</div>}
            <div className={styles.eduCardMeta}>
              {item.period && <span className={styles.eduCardPeriod}>{item.period}</span>}
              {item.notes && <span className={styles.eduCardNotes}>{item.notes}</span>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function CertificationsSection() {
  return (
    <div className={styles.sectionContent}>
      {CERT_ITEMS.map((item, i) => (
        <motion.div
          key={item.id}
          className={styles.certCard}
          style={{ borderColor: item.status === 'Earned' ? `${item.color}88` : 'rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.22 }}
        >
          <div className={styles.certCode} style={{ background: item.color }}>
            {item.code}
          </div>
          <div className={styles.certInfo}>
            <span className={styles.certName}>{item.name}</span>
            <span className={styles.certIssuer}>{item.issuer}{item.year ? ` · ${item.year}` : ''}</span>
          </div>
          <div
            className={styles.certStatus}
            style={{
              color:       item.status === 'Earned' ? '#22cc66' : '#f5c518',
              borderColor: item.status === 'Earned' ? '#22cc6666' : '#f5c51866',
            }}
          >
            {item.status === 'Earned' ? '✓ Earned' : '⟳ In Progress'}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function SkillsSection() {
  return (
    <div className={styles.sectionContent}>
      {SKILL_GROUPS.map((group, i) => (
        <motion.div
          key={group.label}
          className={styles.skillGroup}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.2 }}
        >
          <span className={styles.skillGroupLabel} style={{ color: group.color }}>
            {group.label}
          </span>
          <div className={styles.skillGroupChips}>
            {group.skills.map(s => (
              <span
                key={s}
                className={styles.skillChip}
                style={{ borderColor: `${group.color}66` }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const SECTION_COMPONENTS: Record<SectionId, () => ReactElement> = {
  experience:     ExperienceSection,
  education:      EducationSection,
  certifications: CertificationsSection,
  skills:         SkillsSection,
}

const SECTION_DESC: Record<SectionId, string> = {
  experience:     'Battle record — career history and professional achievements.',
  education:      'Training grounds — academic credentials and degrees.',
  certifications: 'Unlockables — professional certifications and credentials earned.',
  skills:         'Moveset — technical and professional skill categories.',
}

export function Resume() {
  const [activeSection, setActiveSection] = useState<SectionId>('experience')
  const ActiveContent = SECTION_COMPONENTS[activeSection]

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
          <span className={styles.screenTitle}>ARCHIVE</span>
          <a
            href="/resume.pdf"
            download
            className={styles.downloadBtn}
          >
            ↓ DOWNLOAD PDF
          </a>
        </header>

        {/* ── Main content ── */}
        <div className={styles.content}>

          {/* ── Left: archive tile nav ── */}
          <aside className={styles.vaultNav}>
            <p className={styles.vaultNavLabel}>ARCHIVE SECTIONS</p>
            {VAULT_SECTIONS.map((sec, i) => (
              <motion.button
                key={sec.id}
                type="button"
                className={[
                  styles.vaultTile,
                  activeSection === sec.id ? styles.vaultTileActive : '',
                ].join(' ')}
                onClick={() => setActiveSection(sec.id)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.24 }}
              >
                <span className={styles.vaultTileIcon} style={{ background: sec.color }}>
                  {sec.icon}
                </span>
                <div className={styles.vaultTileText}>
                  <span className={styles.vaultTileLabel}>{sec.label}</span>
                  <span className={styles.vaultTileCount}>{sec.count} entries</span>
                </div>
                <span className={styles.vaultTileArrow}>›</span>
              </motion.button>
            ))}

            {/* Vault flavor text at bottom */}
            <div className={styles.vaultFlavor}>
              <div className={styles.vaultFlavorLine} />
              <p className={styles.vaultFlavorText}>
                {SECTION_DESC[activeSection]}
              </p>
            </div>
          </aside>

          {/* ── Right: section content ── */}
          <div className={styles.contentPanel}>
            {/* Section header stripe */}
            {(() => {
              const sec = VAULT_SECTIONS.find(s => s.id === activeSection)!
              return (
                <div className={styles.contentHeader} style={{ borderLeftColor: sec.color }}>
                  <span className={styles.contentHeaderIcon} style={{ background: sec.color }}>
                    {sec.icon}
                  </span>
                  <div>
                    <h2 className={styles.contentHeaderTitle}>{sec.label}</h2>
                    <span className={styles.contentHeaderSub}>
                      {sec.count} entries in archive
                    </span>
                  </div>
                </div>
              )
            })()}

            {/* Scrollable content */}
            <div className={styles.contentScroll}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  <ActiveContent />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <footer className={styles.bottomBar}>
          <span className={styles.hint}>
            <kbd>↑↓</kbd> Navigate &nbsp;·&nbsp; <kbd>A</kbd> Open &nbsp;·&nbsp; <kbd>B</kbd> Back
          </span>
        </footer>
      </motion.div>
    </>
  )
}
