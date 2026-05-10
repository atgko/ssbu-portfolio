import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import { audioManager } from '../audio/audioManager.ts'
import styles from './Contact.module.css'

type PlatformIcon = 'linkedin' | 'email' | 'github' | 'location'

interface Platform {
  id: string
  label: string
  subtitle: string
  cta: string
  href: string | null
  icon: PlatformIcon
  bgGlow: string
}

const PLATFORMS: Platform[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    subtitle: 'in/athavan-elangko',
    cta: 'View Profile →',
    href: 'https://www.linkedin.com/in/athavan-elangko',
    icon: 'linkedin',
    bgGlow: 'rgba(10, 102, 194, 0.32)',
  },
  {
    id: 'email',
    label: 'Email',
    subtitle: 'athavan.elangko@gmail.com',
    cta: 'Send Message →',
    href: 'mailto:athavan.elangko@gmail.com',
    icon: 'email',
    bgGlow: 'rgba(239, 163, 34, 0.28)',
  },
  {
    id: 'github',
    label: 'GitHub',
    subtitle: '@atgko',
    cta: 'See Repositories →',
    href: 'https://github.com/atgko',
    icon: 'github',
    bgGlow: 'rgba(200, 200, 230, 0.16)',
  },
  {
    id: 'location',
    label: 'Home Stage',
    subtitle: 'Salt Lake City, UT',
    cta: '⌖  Mountain West · MST (UTC−7)',
    href: null,
    icon: 'location',
    bgGlow: 'rgba(55, 85, 210, 0.24)',
  },
]

function MountainSvg() {
  return (
    <svg className={styles.mountainIcon} width="72" height="50" viewBox="0 0 72 50" fill="none">
      <path
        d="M0 50 L8 36 L15 43 L23 24 L31 36 L37 16 L43 30 L51 20 L59 34 L65 26 L72 38 L72 50 Z"
        fill="rgba(180,205,255,0.45)"
      />
      <path d="M37 16 L32 27 L42 27 Z" fill="rgba(235,245,255,0.85)" />
      <path d="M51 20 L48 27 L54 27 Z" fill="rgba(235,245,255,0.65)" />
    </svg>
  )
}

function CardIcon({ type }: { type: PlatformIcon }) {
  if (type === 'linkedin') {
    return (
      <span className={styles.liIcon}>
        <span className={styles.liIconText}>in</span>
      </span>
    )
  }
  if (type === 'email') {
    return <span className={styles.atIcon}>@</span>
  }
  if (type === 'github') {
    return <span className={styles.codeIcon}>{'</>'}</span>
  }
  return <MountainSvg />
}

const FORMSPREE = 'https://formspree.io/f/mwvywaag'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => { document.title = 'Contact · Athavan Elangko' }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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
          <Link to="/" className={styles.backBtn} onClick={() => audioManager.playEffect('back')}>← MAIN MENU</Link>
          <span className={styles.screenTitle}>ONLINE</span>
          <span className={styles.p1Badge}>P1</span>
        </header>

        {/* ── Matchmaking status bar ── */}
        <div className={styles.matchBar}>
          <span className={styles.pulseDot} />
          <div className={styles.connBars}>
            {[8, 12, 16, 20].map(h => (
              <span key={h} className={styles.connBar} style={{ height: `${h}px` }} />
            ))}
          </div>
          <span className={styles.matchText}>Searching for Opponent…</span>
          <span className={styles.matchDivider}>·</span>
          <span className={styles.matchSub}>Open to New Opportunities</span>
        </div>

        {/* ── Player card ── */}
        <div className={styles.playerCard}>
          <div className={styles.playerBadge}>P1</div>
          <div className={styles.playerInfo}>
            <span className={styles.playerName}>Athavan Elangko</span>
            <span className={styles.playerTitle}>Product Manager · Technical Program Manager</span>
          </div>
          <div className={styles.playerStatus}>
            <span className={styles.statusDot} />
            Available Jan 2027
          </div>
        </div>

        {/* ── Match preferences / rules bar ── */}
        <div className={styles.rulesBar}>
          <span className={styles.rulesLabel}>Preferred Rules</span>
          <span className={styles.rulesVDivider} />
          <div className={styles.rulesRow}>
            <span className={styles.ruleKey}>Stock</span>
            <span className={styles.ruleVal}>Full-time</span>
            <span className={styles.ruleDot}>·</span>
            <span className={styles.ruleKey}>Stage</span>
            <span className={styles.ruleVal}>Seattle or Bay Area</span>
            <span className={styles.ruleDot}>·</span>
            <span className={styles.ruleKey}>Items</span>
            <span className={styles.ruleVal}>Remote-friendly</span>
            <span className={styles.ruleDot}>·</span>
            <span className={styles.ruleKey}>FS Meter</span>
            <span className={styles.ruleVal}>Open to Relocation</span>
          </div>
        </div>

        {/* ── Arena ── */}
        <div className={styles.arena}>
          <div className={styles.sunGlow} aria-hidden="true" />

          <div className={styles.arenaInner}>
          <div className={styles.cardGrid}>
            {PLATFORMS.map((p, i) => {
              const inner = (
                <>
                  <div className={styles.cardIconWrap}>
                    <CardIcon type={p.icon} />
                  </div>
                  <div className={styles.cardLabelGroup}>
                    <span className={styles.cardLabel}>{p.label}</span>
                    <span className={styles.cardSubtitle}>{p.subtitle}</span>
                  </div>
                  {p.id === 'location' && <div className={styles.mountainBg} aria-hidden="true" />}
                  <div className={styles.cardCta}>{p.cta}</div>
                </>
              )

              const cardClass = [styles.card, p.href ? '' : styles.cardStatic].filter(Boolean).join(' ')

              if (!p.href) {
                return (
                  <motion.div
                    key={p.id}
                    className={cardClass}
                    style={{ background: `radial-gradient(ellipse at 50% 40%, ${p.bgGlow} 0%, #0d0d1c 65%)` }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    {inner}
                  </motion.div>
                )
              }

              return (
                <motion.a
                  key={p.id}
                  href={p.href}
                  target={p.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={p.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className={cardClass}
                  style={{ background: `radial-gradient(ellipse at 50% 40%, ${p.bgGlow} 0%, #0d0d1c 65%)` }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {inner}
                </motion.a>
              )
            })}
          </div>

          {/* ── Battle Request form ── */}
          <motion.div
            className={styles.requestPanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className={styles.formTitle}>SEND BATTLE REQUEST</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="name">Fighter Tag</label>
                <input id="name" name="name" type="text" className={styles.fieldInput} placeholder="Your name" required />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="email">Home Stage</label>
                <input id="email" name="email" type="email" className={styles.fieldInput} placeholder="your@email.com" required />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="message">Challenge Message</label>
                <textarea id="message" name="message" className={styles.fieldTextarea} rows={4} placeholder="Your message..." required />
              </div>
              <button type="submit" className={styles.submitBtn} disabled={status === 'sending' || status === 'success'}>
                {status === 'sending' ? '▶ SENDING…' : status === 'success' ? '✓ REQUEST SENT' : '▶ SEND REQUEST'}
              </button>
              {status === 'success' && (
                <p className={styles.formSuccess}>Battle request received — I'll be in touch soon.</p>
              )}
              {status === 'error' && (
                <p className={styles.formError}>Connection failed. Try emailing directly instead.</p>
              )}
            </form>
          </motion.div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className={styles.statusBar}>
          <span className={styles.closerText}>P1 has entered the arena</span>
          <span className={styles.statusSep}>·</span>
          <span className={styles.creditText}>© Athavan Elangko · Built with React + Claude Code</span>
        </footer>
      </motion.main>
    </>
  )
}
