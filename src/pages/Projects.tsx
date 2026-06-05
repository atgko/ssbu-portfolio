import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StarsBackground } from '../components/StarsBackground/StarsBackground.tsx'
import { audioManager } from '../audio/audioManager.ts'
import styles from './Projects.module.css'

import {
  type ProjectStatus, type Project,
  TYPE_COLOR, TYPE_SYMBOL, STATUS_COLOR, PROJECTS,
} from '../data/projects.ts'

type SortMode = 'status' | 'power-desc' | 'power-asc' | 'name-asc'
type FilterStatus = ProjectStatus | 'all'

const SORT_LABEL: Record<SortMode, string> = {
  'status':     'By Status',
  'power-desc': 'By Power ↓',
  'power-asc':  'By Power ↑',
  'name-asc':   'By Name (A–Z)',
}

const SORT_NEXT: Record<SortMode, SortMode> = {
  'status':     'power-desc',
  'power-desc': 'power-asc',
  'power-asc':  'name-asc',
  'name-asc':   'status',
}

const FILTER_NEXT: Record<FilterStatus, FilterStatus> = {
  'all':          'Shipped',
  'Shipped':      'In Progress',
  'In Progress':  'Coming Soon',
  'Coming Soon':  'all',
}

const FILTER_LABEL: Record<FilterStatus, string> = {
  'all':          'All',
  'Shipped':      'Shipped',
  'In Progress':  'In Progress',
  'Coming Soon':  'Coming Soon',
}

const STATUS_ORDER: Record<ProjectStatus, number> = {
  'Shipped':      0,
  'In Progress':  1,
  'Coming Soon':  2,
}

function sortProjects(projects: Project[], mode: SortMode): Project[] {
  return [...projects].sort((a, b) => {
    if (mode === 'status') {
      const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      return statusDiff !== 0 ? statusDiff : b.power - a.power
    }
    if (mode === 'power-desc') return b.power - a.power
    if (mode === 'power-asc')  return a.power - b.power
    return a.name.localeCompare(b.name)
  })
}

function HexSlot({ filled }: { filled: boolean }) {
  return <span className={[styles.hexSlot, filled ? styles.hexFilled : styles.hexEmpty].join(' ')} />
}

const CAROUSEL_WINDOW = 3

export function Projects() {
  const [sortMode, setSortMode] = useState<SortMode>('status')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [carouselStart, setCarouselStart] = useState(0)

  const allVisible = sortProjects(
    filterStatus === 'all' ? PROJECTS : PROJECTS.filter(p => p.status === filterStatus),
    sortMode,
  )

  useEffect(() => { setCarouselStart(0) }, [sortMode, filterStatus])

  const carouselCards = allVisible.slice(carouselStart, carouselStart + CAROUSEL_WINDOW)
  const canPrev = carouselStart > 0
  const canNext = carouselStart + CAROUSEL_WINDOW < allVisible.length

  const [selected, setSelected] = useState<Project>(() => sortProjects(PROJECTS, 'status')[0]!)

  useEffect(() => { document.title = 'Projects · Athavan Elangko' }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      switch (e.key.toLowerCase()) {
        case 'y': audioManager.playEffect('forward'); setSortMode(m => SORT_NEXT[m]); break
        case 'x': audioManager.playEffect('forward'); setFilterStatus(f => FILTER_NEXT[f]); break
        case 'l': audioManager.playEffect('forward'); setCarouselStart(s => Math.max(0, s - 1)); break
        case 'r': audioManager.playEffect('forward'); setCarouselStart(s => Math.min(s + 1, allVisible.length - CAROUSEL_WINDOW)); break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [allVisible.length])

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

                {selected.artImage
                  ? <img src={selected.artImage} alt={selected.name} className={styles.artImage} />
                  : (
                    <span
                      className={styles.artLetter}
                      style={{ color: selected.artGradient[2], textShadow: `0 0 60px ${selected.artGradient[2]}, 0 0 120px ${selected.artGradient[1]}` }}
                    >
                      {selected.artLetter}
                    </span>
                  )
                }
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

                {/* Description — only shown on large screens (>1920px) */}
                <p className={styles.infoDesc}>{selected.description}</p>
              </div>

              {/* Bottom controls */}
              <div className={styles.controls}>
                <span className={styles.controlHint}>
                  <span className={styles.controlBtn}>ZL</span> Favorite
                </span>
                <span className={styles.controlDivider} />
                <span className={styles.controlHint}>
                  <span className={styles.controlBtn}>ZR</span>
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
                onClick={() => { audioManager.playEffect('forward'); setSortMode(SORT_NEXT[sortMode]) }}
              >
                <span className={styles.sortBtnIcon}>Y</span>
                {SORT_LABEL[sortMode]}
              </button>
              <button
                className={[styles.filterBtn, filterStatus !== 'all' ? styles.filterActive : ''].join(' ')}
                type="button"
                onClick={() => { audioManager.playEffect('forward'); setFilterStatus(FILTER_NEXT[filterStatus]) }}
              >
                <span className={styles.sortBtnIcon}>X</span>
                Filter
                <span className={filterStatus !== 'all' ? styles.filterOn : styles.filterOff}>
                  {FILTER_LABEL[filterStatus]}
                </span>
              </button>
              <div className={styles.carouselNav}>
                <button
                  className={[styles.carouselBtn, !canPrev ? styles.carouselBtnDisabled : ''].join(' ')}
                  type="button"
                  disabled={!canPrev}
                  onClick={() => { audioManager.playEffect('forward'); setCarouselStart(s => s - 1) }}
                >
                  <span className={styles.sortBtnIcon}>L</span>
                </button>
                <span className={styles.carouselCount}>
                  {carouselStart + 1}–{Math.min(carouselStart + CAROUSEL_WINDOW, allVisible.length)}{' '}
                  / {allVisible.length}
                </span>
                <button
                  className={[styles.carouselBtn, !canNext ? styles.carouselBtnDisabled : ''].join(' ')}
                  type="button"
                  disabled={!canNext}
                  onClick={() => { audioManager.playEffect('forward'); setCarouselStart(s => s + 1) }}
                >
                  <span className={styles.sortBtnIcon}>R</span>
                </button>
              </div>
            </div>

            {/* Card grid */}
            <div className={styles.cardGrid}>
              {carouselCards.map(p => (
                <motion.button
                  key={p.id}
                  type="button"
                  className={[styles.card, selected.id === p.id ? styles.cardSelected : ''].join(' ')}
                  onClick={() => { audioManager.playEffect('forward'); setSelected(p) }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div
                    className={styles.cardArt}
                    style={{ background: `radial-gradient(ellipse at 50% 55%, ${p.artGradient[1]}88 0%, ${p.artGradient[0]} 80%)` }}
                  >
                    {p.artImage
                      ? <img src={p.artImage} alt={p.name} className={styles.cardArtImage} />
                      : <span className={styles.cardArtLetter} style={{ color: p.artGradient[2] }}>{p.artLetter}</span>
                    }
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

                  <div className={styles.cardStripe} style={{ background: p.stripeColor ?? TYPE_COLOR[p.type] }} />
                </motion.button>
              ))}
            </div>

            {/* Side navigation arrows */}
            {canPrev && (
              <button
                className={styles.gridArrowLeft}
                type="button"
                onClick={() => { audioManager.playEffect('forward'); setCarouselStart(s => s - 1) }}
                aria-label="Previous projects"
              >
                ‹
              </button>
            )}
            {canNext && (
              <button
                className={styles.gridArrowRight}
                type="button"
                onClick={() => { audioManager.playEffect('forward'); setCarouselStart(s => s + 1) }}
                aria-label="Next projects"
              >
                ›
              </button>
            )}

            {/* Description overlay — slides in at bottom of grid panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                className={styles.descPanel}
                aria-live="polite"
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
      </motion.main>
    </>
  )
}
