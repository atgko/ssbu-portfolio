import styles from './SkillsPage.module.css'

interface SkillRow {
  icon: string
  label: string
  proficiency: 'Expert' | 'Advanced' | 'Intermediate'
  color: string
}

interface ExpEntry {
  title: string
  org: string
  period: string
  summary: string
  color: string
}

const SKILLS: SkillRow[] = [
  { icon: '◈', label: 'Product & Delivery',       proficiency: 'Expert',       color: '#2a78ff' },
  { icon: '↻', label: 'Agile / Scrum',             proficiency: 'Expert',       color: '#22aa55' },
  { icon: '▦', label: 'Data & Analytics',          proficiency: 'Advanced',     color: '#f5c518' },
  { icon: '⬢', label: 'Program Execution',         proficiency: 'Expert',       color: '#efa322' },
  { icon: '△', label: 'Cloud / Azure',             proficiency: 'Intermediate', color: '#6c3ad1' },
  { icon: '⬡', label: 'Engineering Foundations',  proficiency: 'Intermediate', color: '#d4377d' },
]

const PROF_COLOR: Record<string, string> = {
  Expert:       '#22cc66',
  Advanced:     '#f5c518',
  Intermediate: '#2a78ff',
}

const EXPERIENCE: ExpEntry[] = [
  {
    title: 'Scrum Master, Wealth Management',
    org: 'TD',
    period: 'March 2024 – Present',
    summary: 'Launched four agile teams supporting ~$100M annual net asset growth; –25% release cycle time.',
    color: '#2a78ff',
  },
  {
    title: 'Project Manager, Wealth Technology',
    org: 'TD',
    period: 'Apr 2022 – Mar 2024',
    summary: 'Managed cross-functional delivery for wealth management platform upgrades and digital initiatives.',
    color: '#22aa55',
  },
  {
    title: 'Senior Project Analyst',
    org: 'TD',
    period: 'Apr 2019 – Apr 2022',
    summary: 'Led analysis and coordinated execution across enterprise-scale programs in wealth operations.',
    color: '#efa322',
  },
]

export function SkillsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>

        <header className={styles.header}>
          <span className={styles.headerLabel}>SKILLS &amp; EXPERIENCE</span>
          <div className={styles.headerAccent} />
        </header>

        <ul className={styles.skillList}>
          {SKILLS.map(s => (
            <li key={s.label} className={styles.skillRow}>
              <span className={styles.skillIcon} style={{ color: s.color }}>{s.icon}</span>
              <span className={styles.skillLabel}>{s.label}</span>
              <span
                className={styles.profBadge}
                style={{ color: PROF_COLOR[s.proficiency], borderColor: PROF_COLOR[s.proficiency] }}
              >
                {s.proficiency}
              </span>
            </li>
          ))}
        </ul>

        <p className={styles.expHeading}>RECENT EXPERIENCE</p>

        <div className={styles.expList}>
          {EXPERIENCE.map(e => (
            <div key={e.title} className={styles.expEntry}>
              <div className={styles.expAccent} style={{ background: e.color }} />
              <div className={styles.expBody}>
                <span className={styles.expTitle}>{e.title}</span>
                <span className={styles.expMeta}>{e.org} · {e.period}</span>
                <span className={styles.expSummary}>{e.summary}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
