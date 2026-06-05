export type SpiritType = 'shield' | 'attack' | 'neutral'
export type ProjectStatus = 'Shipped' | 'In Progress' | 'Coming Soon'

export interface Project {
  id: string
  name: string
  type: SpiritType
  level: number
  power: number
  role: string
  status: ProjectStatus
  slots: number
  skill: string
  isNew: boolean
  starred: boolean
  description: string
  tags: string[]
  demoUrl: string | null
  githubUrl: string | null
  buildStoryUrl: string | null
  artGradient: [string, string, string]
  artLetter: string
  artImage?: string
  stripeColor?: string
}

export const TYPE_COLOR: Record<SpiritType, string> = {
  shield:  '#2a78ff',
  attack:  '#cc2200',
  neutral: '#666688',
}

export const TYPE_SYMBOL: Record<SpiritType, string> = {
  shield:  '🛡',
  attack:  '△',
  neutral: '○',
}

export const STATUS_COLOR: Record<ProjectStatus, string> = {
  'Shipped':      '#22cc66',
  'In Progress':  '#f5c518',
  'Coming Soon':  '#888899',
}

export const PROJECTS: Project[] = [
  {
    id: 'wayfound',
    name: 'Wayfound',
    type: 'shield',
    level: 34,
    power: 9800,
    role: 'PM Lead',
    status: 'In Progress',
    slots: 3,
    skill: 'Product Strategy ↑',
    isNew: false,
    starred: true,
    description:
      'Conversational AI agent that synthesizes trail data, live weather, and photography conditions into a single opinionated weekend adventure plan. Built for outdoor enthusiasts in the Mountain West. Developed as part of my university Product Management class.',
    tags: ['Conversational AI', 'Trail Data', 'Weather', 'Mountain West'],
    demoUrl: 'https://wayfound-chi.vercel.app/',
    githubUrl: 'https://github.com/atgko/wayfound',
    buildStoryUrl: null,
    artGradient: ['#060e24', '#0a2a6e', '#1a6fff'],
    artLetter: 'W',
  },
  {
    id: 'pocketbeane',
    name: 'PocketBeane',
    type: 'shield',
    level: 12,
    power: 8500,
    role: 'Solo Developer',
    status: 'In Progress',
    slots: 3,
    skill: 'Data Scouting ↑',
    isNew: true,
    starred: true,
    description:
      'AI-powered Assistant GM for fantasy sports drafts. Inspired by the Moneyball approach, PocketBeane uses metrics, analytics, market inefficiencies, and value-over-replacement to help you outsmart the room on draft day and throughout the season.',
    tags: ['AI', 'Fantasy Sports', 'Moneyball', 'LLM', 'Draft Strategy'],
    demoUrl: null,
    githubUrl: 'https://github.com/atgko/pocketbeane',
    buildStoryUrl: null,
    artGradient: ['#040e04', '#0a3510', '#22a845'],
    artLetter: 'P',
  },
  {
    id: 'ssbu-portfolio',
    name: 'SSBU Portfolio',
    type: 'attack',
    level: 15,
    power: 7420,
    role: 'Solo Developer',
    status: 'Shipped',
    slots: 2,
    skill: 'Frontend Craft ↑',
    isNew: false,
    starred: false,
    description:
      'A personal portfolio website built as a pixel-faithful recreation of the Super Smash Bros. Ultimate UI. Demonstrates frontend craft, design fidelity, and product thinking applied to a personal project.',
    tags: ['React', 'Vite', 'TypeScript', 'Framer Motion'],
    demoUrl: null,
    githubUrl: 'https://github.com/atgko/ssbu-portfolio',
    buildStoryUrl: '/build-story',
    artGradient: ['#1a0505', '#6e0a0a', '#cc3300'],
    artLetter: 'S',
    artImage: '/og-preview.png',
    stripeColor: '#1f8f43',
  },
  {
    id: 'capstone',
    name: 'Capstone',
    type: 'neutral',
    level: 1,
    power: 1200,
    role: 'TBD',
    status: 'Coming Soon',
    slots: 1,
    skill: '??? ↑',
    isNew: true,
    starred: false,
    description:
      'University of Utah M.S. Information Systems capstone project. Direction and details TBD; watch this space.',
    tags: ['Coming Soon', 'U of U', 'MSIS'],
    demoUrl: null,
    githubUrl: null,
    buildStoryUrl: null,
    artGradient: ['#0d0d14', '#1a1a28', '#2a2a44'],
    artLetter: '?',
  },
]
