import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import { audioManager } from '../audio/audioManager.ts'
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
    version: 'DAY 4',
    date: 'May 9, 2026',
    codename: 'Mobile Fighter',
    milestone: 'Mobile M1',
    changes: [
      'Replaced "desktop only" mobile gate with an interactive SSBU fighter flip card',
      'Card front: full-body fighter photo, name, title (Product Manager · TPM), university badge',
      'Card back: full bio, Universe/Series meta block, location badge, LinkedIn + email icon links',
      'Gold divider between meta block and bio; space-between layout distributes content to card edges',
      'Tap-to-flip interaction with CSS 3D perspective — no JS animation library needed',
    ],
  },
  {
    version: 'DAY 3',
    date: 'May 8, 2026',
    codename: 'Full Roster',
    milestone: 'M4–M6',
    changes: [
      'Skills page as Games & More expandable submenu — 6 categories with real experience data',
      'Resume page as Vault archive — tabbed sections, PMP/CSPO/SAFe certs, download button',
      'Contact page as Online lobby — player card, matchmaking bar, 4-card grid with slide-up CTA panels',
      'Home Stage card: inline Wasatch Range SVG + clip-path mountain terrain, per-icon hover animations',
      'Easter egg: L → R → A → Space toggles Melee palette (monochromatic navy/gold, flat tiles)',
      'Screen flash on tile click; 404 page styled as Nintendo Switch error dialog',
    ],
  },
  {
    version: 'DAY 2',
    date: 'May 7, 2026',
    codename: 'Character Select',
    milestone: 'M2–M3',
    changes: [
      'About page as Character Select — fighter photo (P1), 5 animated stat bars (Strategy → Leadership)',
      'Fighter metadata: Universe (U of Utah MSIS), Series (Banking & Fintech, 8+ yrs), short bio',
      'Projects page as Spirits Collection — 3 spirits with power ratings, nebula gradient art panels',
      'Spirit detail panel: hex SCOPE slots, type badge (Shield/Attack/Neutral), sort by Power/Name',
      'Press Start splash persists across page navigation via sessionStorage',
    ],
  },
  {
    version: 'DAY 1',
    date: 'May 6, 2026',
    codename: 'Press Start',
    milestone: 'M0–M1',
    changes: [
      'Vite + React + TypeScript scaffold — Vercel auto-deploy wired to GitHub on day one',
      'SSBU design token system: tile colors, Rajdhani/Exo 2 typography, CSS custom properties',
      'SSBU main menu layout — 5 tiles in angled grid, per-tile color theming + animated star background',
      'Perimeter light animation along tile edges; hover: gold border glow + scale + brightness',
      'Press Start splash overlay with flash-dismiss; Framer Motion slide-in page transitions',
    ],
  },
]

const TOTAL_CHANGES = PATCHES.reduce((n, p) => n + p.changes.length, 0)

export function BuildStory() {
  useEffect(() => { document.title = 'Build Story · Athavan Elangko' }, [])

  return (
    <>
      <StarsBackground />
      <motion.main
        className={styles.page}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Top bar ── */}
        <header className={styles.topBar}>
          <Link to="/projects" className={styles.backBtn} onClick={() => audioManager.playEffect('back')}>← PROJECTS</Link>
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

            <div className={styles.intro}>
              <p className={styles.introParagraph}>
                I recently designed and built my personal portfolio to replicate the menu experience from Super Smash Bros. Ultimate. 🎮
              </p>
              <p className={styles.introParagraph}>
                I wanted to create something interactive and memorable—something that goes beyond a traditional portfolio and reflects both my work and a bit of my personality. In a market where many candidates have strong credentials, I saw this as an opportunity to differentiate through experience and design.
              </p>
              <p className={styles.introParagraph}>
                I used Claude Code to bring the idea to life, breaking the build into structured phases and iterating quickly across each section. With reference images and detailed prompting, I was able to prototype, refine the UI, and ship a working version in just a few days.
              </p>
              <p className={styles.introParagraph}>
                One of the most interesting parts of the process was balancing creativity with usability—staying true to the Smash Bros. inspiration while ensuring the site remained intuitive. It also meant making tradeoffs, particularly between desktop and mobile experiences, and being intentional about what made it into the initial version versus the backlog.
              </p>

              <div className={styles.introLinks}>
                <span className={styles.introLinkRow}>
                  <span className={styles.introLinkLabel}>Live site</span>
                  <a href="https://athavan.gg" target="_blank" rel="noopener noreferrer" className={styles.introLink}>athavan.gg</a>
                </span>
                <span className={styles.introLinkRow}>
                  <span className={styles.introLinkLabel}>GitHub</span>
                  <a href="https://github.com/atgko" target="_blank" rel="noopener noreferrer" className={styles.introLink}>github.com/atgko</a>
                </span>
              </div>
              <p className={styles.introNote}>(Desktop offers the full experience.)</p>

              <p className={styles.introPS}>
                <span className={styles.introPSLabel}>P.S.</span> If you're a Super Smash Bros. Melee fan, try the L + R + A + Spacebar sequence — there's a small Easter egg built in.
              </p>
            </div>

            <p className={styles.patchesLabel}>Version History</p>
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
            4 days · {TOTAL_CHANGES} changes · Built with React + Claude Code
          </span>
        </footer>
      </motion.main>
    </>
  )
}
