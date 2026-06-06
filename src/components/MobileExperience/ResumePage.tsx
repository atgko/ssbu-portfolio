import styles from './ResumePage.module.css'

const EDU_ENTRIES = [
  {
    degree: 'Master of Science in Information Systems',
    school: 'University of Utah',
    sub: 'David Eccles School of Business',
    period: 'Dec 2026 (Expected)',
    color: '#6c3ad1',
  },
  {
    degree: 'Honors Bachelor of Science',
    school: 'University of Toronto',
    sub: 'Computer Science and Statistics',
    period: 'May 2016',
    color: '#2a78ff',
  },
]

const CERT_ENTRIES = [
  { code: 'PMP',    name: 'Project Management Professional', issuer: 'PMI',           status: 'Earned',      statusColor: '#22cc66', color: '#2a78ff' },
  { code: 'CSPO',   name: 'Certified Scrum Product Owner',   issuer: 'Scrum Alliance', status: 'Earned',      statusColor: '#22cc66', color: '#22aa55' },
  { code: 'SAFe 6', name: 'Certified SAFe 6 Scrum Master',   issuer: 'Scaled Agile',  status: 'Earned',      statusColor: '#22cc66', color: '#f5c518' },
  { code: 'LSSGB',  name: 'Lean Six Sigma Green Belt',       issuer: 'IASSC',         status: 'Earned',      statusColor: '#22cc66', color: '#efa322' },
  { code: 'AZ-900', name: 'Azure Fundamentals',              issuer: 'Microsoft',     status: 'In Progress', statusColor: '#f5c518', color: '#6c3ad1' },
]

export function ResumePage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>

        <header className={styles.header}>
          <span className={styles.headerLabel}>ARCHIVE</span>
          <div className={styles.headerAccent} />
        </header>

        <p className={styles.sectionHeading}>EDUCATION</p>

        <div className={styles.eduList}>
          {EDU_ENTRIES.map(e => (
            <div key={e.degree} className={styles.eduEntry}>
              <div className={styles.eduAccent} style={{ background: e.color }} />
              <div className={styles.eduBody}>
                <span className={styles.eduDegree}>{e.degree}</span>
                <span className={styles.eduSchool}>{e.school}</span>
                {e.sub && <span className={styles.eduSub}>{e.sub}</span>}
                <span className={styles.eduPeriod}>{e.period}</span>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.sectionHeading}>CERTIFICATIONS</p>

        <div className={styles.certList}>
          {CERT_ENTRIES.map(c => (
            <div key={c.code} className={styles.certEntry}>
              <div className={styles.certCode} style={{ background: c.color }}>{c.code}</div>
              <div className={styles.certBody}>
                <span className={styles.certName}>{c.name}</span>
                <span className={styles.certIssuer}>{c.issuer}</span>
              </div>
              <span
                className={styles.certStatus}
                style={{ color: c.statusColor, borderColor: c.statusColor }}
              >
                {c.status === 'Earned' ? '✓' : '⟳'}
              </span>
            </div>
          ))}
        </div>

        <a href="/resume.pdf" download className={styles.downloadBtn}>
          <span className={styles.downloadIcon}>↓</span>
          DOWNLOAD RESUME
        </a>

      </div>
    </div>
  )
}
