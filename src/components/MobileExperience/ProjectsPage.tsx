import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS, TYPE_SYMBOL, STATUS_COLOR, type Project } from '../../data/projects.ts'
import styles from './ProjectsPage.module.css'

export function ProjectsPage() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [expanded, setExpanded] = useState<Project | null>(null)

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchMoved = useRef(false)

  function handleCarouselTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]
    if (!t) return
    touchStartX.current = t.clientX
    touchStartY.current = t.clientY
    touchMoved.current = false
  }

  function handleCarouselTouchEnd(e: React.TouchEvent) {
    const t = e.changedTouches[0]
    if (!t) return
    const dx = touchStartX.current - t.clientX
    const dy = touchStartY.current - t.clientY

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= 50) {
      e.stopPropagation()
      touchMoved.current = true
      if (dx > 0) setCarouselIndex(i => Math.min(PROJECTS.length - 1, i + 1))
      else setCarouselIndex(i => Math.max(0, i - 1))
    }
  }

  function handleCardClick(project: Project) {
    if (!touchMoved.current) setExpanded(project)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.headerLabel}>SPIRIT COLLECTION</span>
        <div className={styles.headerAccent} />
      </header>

      <div
        className={styles.carouselViewport}
        onTouchStart={handleCarouselTouchStart}
        onTouchEnd={handleCarouselTouchEnd}
      >
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(calc(-${carouselIndex} * (76vw + 12px)))` }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className={styles.card}
              onClick={() => handleCardClick(p)}
              style={{ background: `linear-gradient(160deg, ${p.artGradient[0]}, ${p.artGradient[1]} 50%, ${p.artGradient[2]})` }}
            >
              <span
                className={styles.cardLetter}
                style={{ color: p.artGradient[2] }}
              >
                {p.artLetter}
              </span>

              <div className={styles.cardBody}>
                <div className={styles.cardBadges}>
                  <span className={styles.typeBadge}>{TYPE_SYMBOL[p.type]} {p.type}</span>
                  {p.isNew && <span className={styles.newBadge}>NEW</span>}
                </div>

                <p className={styles.cardName}>{p.name}</p>

                <div className={styles.cardMeta}>
                  <span className={styles.roleBadge}>{p.role}</span>
                  <span
                    className={styles.statusBadge}
                    style={{ color: STATUS_COLOR[p.status], borderColor: STATUS_COLOR[p.status] }}
                  >
                    {p.status}
                  </span>
                </div>

                <p className={styles.cardDesc}>{p.description}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.cardPower}>{p.power.toLocaleString()} PWR</span>
                  <span className={styles.tapHint}>TAP FOR DETAILS</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dotRow}>
        {PROJECTS.map((_, idx) => (
          <span
            key={idx}
            className={[styles.dot, idx === carouselIndex ? styles.dotActive : ''].join(' ')}
          />
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              className={styles.overlayBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setExpanded(null)}
            />
            <motion.div
              className={styles.overlayPanel}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setExpanded(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <p className={styles.overlayName}>{expanded.name}</p>
              <p className={styles.overlayRole}>{expanded.role}</p>

              <p className={styles.overlayDesc}>{expanded.description}</p>

              <div className={styles.overlayTags}>
                {expanded.tags.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>

              <div className={styles.overlayActions}>
                {expanded.demoUrl && (
                  <a
                    href={expanded.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtn}
                  >
                    Visit Site
                  </a>
                )}
                {expanded.githubUrl && (
                  <a
                    href={expanded.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[styles.actionBtn, styles.actionBtnGhost].join(' ')}
                  >
                    GitHub
                  </a>
                )}
                {expanded.buildStoryUrl && (
                  <a
                    href={expanded.buildStoryUrl}
                    className={[styles.actionBtn, styles.actionBtnGhost].join(' ')}
                  >
                    Build Story
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
