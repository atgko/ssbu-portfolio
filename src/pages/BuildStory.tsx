import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import styles from './BuildStory.module.css'

interface PatchEntry {
  version: string
  date: string
  codename: string
  milestone: string
  changes: string[]
}

const PATCHES: PatchEntry[] = [
  {
    version: 'v1.6.0',
    date: 'May 8, 2026',
    codename: 'Contact Overhaul',
    milestone: 'M5+',
    changes: [
      'Rebuilt Contact page as a full Online lobby screen',
      'Player card banner: P1 badge, name, title, availability status',
      'Pulsing matchmaking status bar with animated signal-strength bars',
      'Match Preferences rules panel: Stock / Stage / Items / FS Meter',
      '2×2 card grid — LinkedIn, Email, GitHub, Home Stage — all equal size',
      'Slide-up CTA panel on each card hover (View Profile, Send Message, etc.)',
      'Home Stage: inline Wasatch Range SVG + clip-path mountain terrain background',
      'Per-icon hover animations: LinkedIn bounce, Email wobble, GitHub glitch, Mountain float',
      'Footer replaced with thematic closer + build credit',
    ],
  },
  {
    version: 'v1.5.0',
    date: 'May 8, 2026',
    codename: 'Online & Error Screens',
    milestone: 'M5',
    changes: [
      'Contact page: LinkedIn, Email, GitHub tiles with per-tile ambient glow gradients',
      'Sun glow gradient applied to Contact arena (SSBU Online lobby warmth)',
      '404 page styled as Nintendo Switch error dialog — Error Code: 404-0001',
      'Patch Notes link wired to SSBU Portfolio spirit on the Projects page',
      'Green color theming on power numbers and skill bars in Projects',
      'Back buttons unified to ← MAIN MENU across all pages',
      'SCOPE label added to hex slot indicator on spirit detail panel',
    ],
  },
  {
    version: 'v1.4.0',
    date: 'May 8, 2026',
    codename: 'Skills & Vault',
    milestone: 'M4',
    changes: [
      'Skills page styled as Games & More expandable submenu',
      '6 skill categories: Product & Delivery, Agile/Scrum, Data & Analytics, Program Execution, Cloud/Azure, Engineering Foundations',
      'Resume page styled as Vault archive with 4 tabbed sections',
      'Real resume data: TD (Scrum Master, PM, Project Analyst) + RBC (Project Coordinator)',
      'Education: U of Utah MSIS (exp. Dec 2026) + U of Toronto BSc CS & Stats (2016)',
      'Certifications: PMP, CSPO, SAFe 6, LSSGB — AZ-900 in progress',
      'Resume download button with angled clip-path treatment',
      'Tile color theming: blue for Skills, pink for Resume',
    ],
  },
  {
    version: 'v1.3.0',
    date: 'May 7, 2026',
    codename: 'Spirit Board',
    milestone: 'M3',
    changes: [
      'Projects page styled as Spirits Collection screen',
      '3 spirits: Wayfound (Power 9,800), SSBU Portfolio (Power 7,420), Capstone (Power 1,200)',
      'Detail panel: nebula gradient art area, power overlay, type badge, hex SCOPE slots',
      'Spirit types: Shield (blue), Attack (red), Neutral (gray)',
      'Sort modes: By Power Desc/Asc, By Name A–Z',
      'Animated description panel slides in at bottom of grid panel',
      'Wayfound starred as featured primary spirit',
    ],
  },
  {
    version: 'v1.2.0',
    date: 'May 7, 2026',
    codename: 'Fighter Select',
    milestone: 'M2',
    changes: [
      'About page styled as Character Select screen',
      'Fighter photo (Athavan Elangko as P1) with profile framing',
      '5 animated stat bars: Strategy, Execution, Communication, Technical, Leadership',
      'Fighter metadata: Universe (U of Utah MSIS), Series (Banking & Fintech, 8+ yrs)',
      'Press Start splash persists across page navigation via sessionStorage',
      'Home fade-in transition: opacity + y-axis slide on enter',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'May 6, 2026',
    codename: 'Home Screen',
    milestone: 'M1',
    changes: [
      'SSBU main menu layout — 6 tiles in angled grid',
      'Per-tile color theming: red (Smash), green (Spirits), blue (Games), pink (Vault), amber (Online), purple (Build)',
      'Animated star/galaxy canvas background',
      'Perimeter light animation along tile edges',
      'Hover: gold border glow + scale 1.02 + brightness shift',
      'Press Start splash overlay with flash-dismiss animation',
      'Framer Motion page transitions: x:50 slide-in on all routes',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'May 6, 2026',
    codename: 'Scaffold',
    milestone: 'M0',
    changes: [
      'Vite + React + TypeScript project scaffold',
      'React Router v6 with 7 routes: /, /about, /projects, /skills, /resume, /contact, /build-story',
      'SSBU design token system: colors, typography, tile colors, transitions',
      'Framer Motion installed for animations; CSS Modules as styling strategy',
      'Vercel auto-deploy connected to GitHub (atgko/ssbu-portfolio)',
      'ESLint + Prettier configured',
    ],
  },
]

const TOTAL_CHANGES = PATCHES.reduce((n, p) => n + p.changes.length, 0)

export function BuildStory() {
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
          <Link to="/projects" className={styles.backBtn}>← SPIRITS</Link>
          <span className={styles.screenTitle}>PATCH NOTES</span>
          <span className={styles.buildBadge}>BUILD</span>
        </header>

        {/* ── Scrollable content ── */}
        <div className={styles.scroll}>
          <div className={styles.inner}>

            <div className={styles.pageHeading}>
              <h1 className={styles.pageTitle}>SSBU Portfolio</h1>
              <p className={styles.pageSubtitle}>
                A personal portfolio built as a pixel-faithful recreation of the Super Smash Bros. Ultimate UI.
                Full version history — scaffold to ship.
              </p>
            </div>

            <div className={styles.patches}>
              {PATCHES.map((p, i) => (
                <motion.article
                  key={p.version}
                  className={styles.patch}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.28 }}
                >
                  <div className={styles.patchAccent} />
                  <div className={styles.patchHeader}>
                    <span className={styles.patchVersion}>{p.version}</span>
                    <span className={styles.patchCodename}>{p.codename}</span>
                    <span className={styles.patchMeta}>
                      <span className={styles.patchMilestone}>{p.milestone}</span>
                      <span className={styles.patchDate}>{p.date}</span>
                    </span>
                  </div>
                  <ul className={styles.changeList}>
                    {p.changes.map(c => (
                      <li key={c} className={styles.changeItem}>
                        <span className={styles.changeBullet} aria-hidden="true">►</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>

          </div>
        </div>

        {/* ── Footer ── */}
        <footer className={styles.statusBar}>
          <span className={styles.statusText}>
            {PATCHES.length} versions · {TOTAL_CHANGES} changes · Built in 3 days
          </span>
        </footer>
      </motion.div>
    </>
  )
}
