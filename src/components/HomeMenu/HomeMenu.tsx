import React, { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { audioManager } from '../../audio/audioManager.ts'
import { MENU, type MenuItem } from './menu.ts'
import aeLogo from '../../assets/personal/ae-logo.png'
import styles from './HomeMenu.module.css'

const areaClass: Record<MenuItem['area'], string> = {
  smash: styles.tileSmash ?? '',
  spirits: styles.tileSpirits ?? '',
  games: styles.tileGames ?? '',
  vault: styles.tileVault ?? '',
  online: styles.tileOnline ?? '',
}

/* Keyboard arrow neighbors per tile index. MENU order:
   0 Smash · 1 Spirits · 2 Games · 3 Vault · 4 Online. */
type Neighbors = { up?: number; down?: number; left?: number; right?: number }
const NAV: Record<number, Neighbors> = {
  0: { right: 2, down: 1 },
  1: { up: 0, right: 4 },
  2: { left: 0, down: 3 },
  3: { left: 0, up: 2, down: 4 },
  4: { left: 1, up: 3 },
}

function MenuIcon({ kind, className }: { kind: MenuItem['icon']; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: className ?? styles.icon,
  }
  switch (kind) {
    case 'smash':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" strokeWidth="1.6" />
          <path
            d="M12 4.5l1.6 4 -1.6 -1.2 -1.6 1.2 1.6 -4z M12 19.5l1.6 -4 -1.6 1.2 -1.6 -1.2 1.6 4z M4.5 12l4 1.6 -1.2 -1.6 1.2 -1.6 -4 1.6z M19.5 12l-4 1.6 1.2 -1.6 -1.2 -1.6 4 1.6z"
            fill="currentColor"
            stroke="none"
          />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'spirits':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" strokeWidth="1.6" />
          <path
            d="M12 5.5c-1 2 -3.5 3.5 -3.5 6.5 0 2.5 1.6 4.5 3.5 4.5 2 0 3.5 -1.5 3.5 -4 0 -1.5 -1 -2.5 -1.5 -3 0.4 1 -0.5 2 -1 2 -0.7 0 -1 -0.6 -1 -1.5 0 -1.7 1 -3 0 -4.5z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      )
    case 'games':
      return (
        <svg {...common} strokeWidth="2">
          <path d="M14.7 6.3a4 4 0 015.7 5.1l-2-2 -2 2 2 2a4 4 0 01-5.7-5.1l-7.5 7.5a2.1 2.1 0 103 3l7.5-7.5z" />
        </svg>
      )
    case 'vault':
      return (
        <svg {...common} strokeWidth="2">
          <path d="M4 13c0-1.5 0.7-3 2.5-3.6C8 8.8 10 8.5 12 8.5s4 0.3 5.5 0.9C19.3 10 20 11.5 20 13v6H4v-6z" />
          <path d="M4 13h16" />
          <rect x="11" y="13" width="2" height="3" fill="currentColor" stroke="none" />
          <path d="M6 8.5l1-3 4 1 1-2 1 2 4-1 1 3" opacity="0.85" />
        </svg>
      )
    case 'online':
      return (
        <svg {...common} strokeWidth="1.8">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      )
  }
}

function TileBgDecoration({ area }: { area: MenuItem['area'] }) {
  const shared = { 'aria-hidden': true as const, className: styles.bgDecoration }
  switch (area) {
    case 'smash':
      return (
        <svg {...shared} viewBox="0 0 200 100" fill="currentColor">
          {/* Maple leaf path centered at origin, 7-lobe silhouette */}
          <path
            d="M 0 22 L -2 8 C -6 8 -12 12 -16 8 C -11 3 -10 1 -14 -4 C -19 -2 -24 -8 -22 -14 C -16 -10 -12 -12 -14 -18 L -6 -24 L -3 -14 C -2 -17 0 -20 0 -20 C 0 -20 2 -17 3 -14 L 6 -24 L 14 -18 C 12 -12 16 -10 22 -14 C 24 -8 19 -2 14 -4 C 10 1 11 3 16 8 C 12 12 6 8 2 8 Z"
            transform="translate(38 58) scale(1.9) rotate(-18)"
          />
          <path
            d="M 0 22 L -2 8 C -6 8 -12 12 -16 8 C -11 3 -10 1 -14 -4 C -19 -2 -24 -8 -22 -14 C -16 -10 -12 -12 -14 -18 L -6 -24 L -3 -14 C -2 -17 0 -20 0 -20 C 0 -20 2 -17 3 -14 L 6 -24 L 14 -18 C 12 -12 16 -10 22 -14 C 24 -8 19 -2 14 -4 C 10 1 11 3 16 8 C 12 12 6 8 2 8 Z"
            transform="translate(108 38) scale(2.3) rotate(9)"
            opacity={0.6}
          />
          <path
            d="M 0 22 L -2 8 C -6 8 -12 12 -16 8 C -11 3 -10 1 -14 -4 C -19 -2 -24 -8 -22 -14 C -16 -10 -12 -12 -14 -18 L -6 -24 L -3 -14 C -2 -17 0 -20 0 -20 C 0 -20 2 -17 3 -14 L 6 -24 L 14 -18 C 12 -12 16 -10 22 -14 C 24 -8 19 -2 14 -4 C 10 1 11 3 16 8 C 12 12 6 8 2 8 Z"
            transform="translate(164 72) scale(1.5) rotate(-34)"
          />
          <path
            d="M 0 22 L -2 8 C -6 8 -12 12 -16 8 C -11 3 -10 1 -14 -4 C -19 -2 -24 -8 -22 -14 C -16 -10 -12 -12 -14 -18 L -6 -24 L -3 -14 C -2 -17 0 -20 0 -20 C 0 -20 2 -17 3 -14 L 6 -24 L 14 -18 C 12 -12 16 -10 22 -14 C 24 -8 19 -2 14 -4 C 10 1 11 3 16 8 C 12 12 6 8 2 8 Z"
            transform="translate(8 25) scale(1.6) rotate(24)"
            opacity={0.5}
          />
        </svg>
      )
    case 'spirits':
      return (
        <svg {...shared} viewBox="0 0 200 100" fill="currentColor">
          <path d="M-10 100 L12 50 L26 68 L44 18 L62 60 L78 36 L94 54 L110 8 L126 45 L142 28 L158 50 L174 5 L190 38 L210 100 Z" opacity={0.4} />
          <path d="M-10 100 L6 68 L20 84 L36 38 L52 76 L66 18 L82 62 L96 28 L112 65 L128 10 L144 52 L160 32 L176 58 L192 42 L210 100 Z" />
        </svg>
      )
    case 'games':
      return (
        <svg {...shared} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <circle cx="50" cy="50" r="6" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="32" />
          <circle cx="50" cy="50" r="43" />
          <circle cx="50" cy="50" r="56" />
          <circle cx="50" cy="50" r="71" />
          <circle cx="50" cy="50" r="88" />
        </svg>
      )
    case 'vault':
      return (
        <svg {...shared} viewBox="0 0 100 100" fill="currentColor">
          {/* 5-pointed star path centered at origin, outer r=12 inner r=5 */}
          <path
            d="M 0,-12 L 2.9,-4.1 L 11.4,-3.7 L 4.8,1.5 L 7.1,9.7 L 0,5 L -7.1,9.7 L -4.8,1.5 L -11.4,-3.7 L -2.9,-4.1 Z"
            transform="translate(25 28) scale(2.0) rotate(10)"
          />
          <path
            d="M 0,-12 L 2.9,-4.1 L 11.4,-3.7 L 4.8,1.5 L 7.1,9.7 L 0,5 L -7.1,9.7 L -4.8,1.5 L -11.4,-3.7 L -2.9,-4.1 Z"
            transform="translate(62 58) scale(2.5) rotate(-15)"
            opacity={0.6}
          />
          <path
            d="M 0,-12 L 2.9,-4.1 L 11.4,-3.7 L 4.8,1.5 L 7.1,9.7 L 0,5 L -7.1,9.7 L -4.8,1.5 L -11.4,-3.7 L -2.9,-4.1 Z"
            transform="translate(84 18) scale(1.6) rotate(22)"
          />
          <path
            d="M 0,-12 L 2.9,-4.1 L 11.4,-3.7 L 4.8,1.5 L 7.1,9.7 L 0,5 L -7.1,9.7 L -4.8,1.5 L -11.4,-3.7 L -2.9,-4.1 Z"
            transform="translate(38 85) scale(1.8) rotate(-8)"
            opacity={0.65}
          />
          <path
            d="M 0,-12 L 2.9,-4.1 L 11.4,-3.7 L 4.8,1.5 L 7.1,9.7 L 0,5 L -7.1,9.7 L -4.8,1.5 L -11.4,-3.7 L -2.9,-4.1 Z"
            transform="translate(80 80) scale(1.4) rotate(30)"
          />
        </svg>
      )
    case 'online':
      return (
        <svg {...shared} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1.1}>
          {/* Sun arc — center below the tile, arc crests at ~y=60 */}
          <circle cx="50" cy="110" r="50" strokeWidth={1.5} />
          {/* Rays fanning upward from sun center (50, 110) */}
          <line x1="50" y1="110" x2="50"  y2="-5"  />
          <line x1="50" y1="110" x2="88"  y2="-9"  />
          <line x1="50" y1="110" x2="12"  y2="-9"  />
          <line x1="50" y1="110" x2="125" y2="4"   />
          <line x1="50" y1="110" x2="-25" y2="4"   />
          <line x1="50" y1="110" x2="155" y2="35"  />
          <line x1="50" y1="110" x2="-55" y2="35"  />
        </svg>
      )
  }
}

type SplashProps = { arrowAngle: number; ringColor: string }

function CenterSplash({ arrowAngle, ringColor }: SplashProps) {
  const orbitStyle = {
    '--arrow-angle': `${arrowAngle}deg`,
  } as CSSProperties

  const splashStyle = {
    '--ring-color': ringColor,
  } as CSSProperties

  return (
    <div className={styles.splashWrap} aria-hidden="true" style={splashStyle}>
      <div className={styles.centerSplash}>
        <img src={aeLogo} alt="AE" className={styles.splashLogo} />
      </div>
      <div className={styles.arrowOrbit} style={orbitStyle}>
        <span className={styles.arrowTip} />
      </div>
    </div>
  )
}

type Props = {
  activeIndex: number
  onActiveChange: (index: number) => void
}

export function HomeMenu({ activeIndex, onActiveChange }: Props) {
  const navigate = useNavigate()
  const [flashIdx, setFlashIdx] = useState<number | null>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const targetAngle = MENU[activeIndex]?.arrowAngle ?? 0

  /* Cumulative arrow angle. Each time the target changes we add the SHORTEST
     signed delta to the running value, so 300° → 35° rotates +95° (clockwise),
     not -265° (counter-clockwise whip). */
  const [arrowAngle, setArrowAngle] = useState(targetAngle)

  useEffect(() => {
    setArrowAngle((prev) => {
      const normalizedPrev = ((prev % 360) + 360) % 360
      const delta = ((targetAngle - normalizedPrev + 540) % 360) - 180
      return prev + delta
    })
  }, [targetAngle])

  function handleTileClick(e: MouseEvent, path: string, idx: number) {
    e.preventDefault()
    audioManager.playEffect('forward')
    setFlashIdx(idx)
    setTimeout(() => navigate(path), 160)
  }

  function handleTileKeyUp(e: React.KeyboardEvent, path: string, idx: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      audioManager.playEffect('forward')
      setFlashIdx(idx)
      setTimeout(() => navigate(path), 160)
    }
  }

  function focusIndex(index: number) {
    onActiveChange(index)
    linkRefs.current[index]?.focus()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    const focused = document.activeElement
    const currentIndex = linkRefs.current.findIndex((el) => el === focused)
    if (currentIndex === -1) return

    const moves = NAV[currentIndex]
    if (!moves) return

    let target: number | undefined
    if (e.key === 'ArrowRight') target = moves.right
    else if (e.key === 'ArrowLeft') target = moves.left
    else if (e.key === 'ArrowUp') target = moves.up
    else if (e.key === 'ArrowDown') target = moves.down
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = MENU.length - 1

    if (target !== undefined) {
      e.preventDefault()
      focusIndex(target)
    }
  }

  return (
    <nav className={styles.grid} aria-label="Main menu" onKeyDown={handleKeyDown}>
      {MENU.map((item, idx) => {
        const isActive = idx === activeIndex
        const tileClass = [styles.tile, areaClass[item.area], isActive ? styles.tileActive : '']
          .filter(Boolean)
          .join(' ')
        return (
          <a
            key={item.path}
            tabIndex={0}
            role="link"
            onClick={(e) => handleTileClick(e, item.path, idx)}
            className={tileClass}
            ref={(el) => {
              linkRefs.current[idx] = el
            }}
            onMouseEnter={() => onActiveChange(idx)}
            onFocus={() => onActiveChange(idx)}
            onKeyUp={(e) => handleTileKeyUp(e, item.path, idx)}
            aria-label={`${item.section}: ${item.ssbu}`}
          >
            {flashIdx === idx && <span className={styles.tileFlash} aria-hidden="true" />}
            <span className={styles.bgIcon} aria-hidden="true">
              <TileBgDecoration area={item.area} />
            </span>
            <span className={styles.tileInner}>
              <MenuIcon kind={item.icon} />
              <span className={styles.label}>{item.section}</span>
            </span>
            <span className={styles.perimeterLight} aria-hidden="true" />
          </a>
        )
      })}
      <CenterSplash
        arrowAngle={arrowAngle}
        ringColor={MENU[activeIndex]?.color ?? '#ffffff'}
      />
    </nav>
  )
}
