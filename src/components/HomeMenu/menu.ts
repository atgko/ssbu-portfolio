export type MenuItem = {
  ssbu: string
  section: string
  path: string
  tagline: string
  area: 'smash' | 'spirits' | 'games' | 'vault' | 'online'
  icon: 'smash' | 'spirits' | 'games' | 'vault' | 'online'
  /** Hex color matching the tile's background — used for the circle's ring accent. */
  color: string
  /**
   * Arrow rotation in degrees, measured clockwise from 12 o'clock.
   * 0 = up, 90 = right, 180 = down, 270 = left.
   * The center-circle arrow rotates to this angle when its tile is active.
   * Home transforms this to a cumulative angle so transitions take the
   * shortest path (no whip-around).
   */
  arrowAngle: number
  /** Width of the bulge tab in px — should span the full edge where the circle meets the tile. */
  bulgeWidth: number
}

export const MENU: readonly MenuItem[] = [
  {
    ssbu: 'Smash',
    section: 'About',
    path: '/about',
    tagline: 'A great place to get started!',
    area: 'smash',
    icon: 'smash',
    color: '#c8281f',
    arrowAngle: 300,
    bulgeWidth: 90,
  },
  {
    ssbu: 'Spirits',
    section: 'Projects',
    path: '/projects',
    tagline: 'Collect the projects that shaped this fighter — including this site itself.',
    area: 'spirits',
    icon: 'spirits',
    color: '#1f8f43',
    arrowAngle: 220,
    bulgeWidth: 75,
  },
  {
    ssbu: 'Games & More',
    section: 'Skills',
    path: '/skills',
    tagline: 'Skills, tools, and experience.',
    area: 'games',
    icon: 'games',
    color: '#2a78ff',
    arrowAngle: 35,
    bulgeWidth: 75,
  },
  {
    ssbu: 'Vault',
    section: 'Resume',
    path: '/resume',
    tagline: 'Open the archive — résumé inside.',
    area: 'vault',
    icon: 'vault',
    color: '#d4377d',
    arrowAngle: 90,
    bulgeWidth: 75,
  },
  {
    ssbu: 'Online',
    section: 'Contact',
    path: '/contact',
    tagline: 'Ready up — send a battle request.',
    area: 'online',
    icon: 'online',
    color: '#efa322',
    arrowAngle: 145,
    bulgeWidth: 75,
  },
]
