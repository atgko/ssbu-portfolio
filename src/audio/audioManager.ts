type Theme = 'ssbu' | 'melee'
type EffectType = 'break' | 'forward' | 'back'

const EFFECTS: Record<Theme, Record<EffectType, string>> = {
  ssbu: {
    break:   '/sounds/ssbubreak.wav',
    forward: '/sounds/se_menu_movieedit_cut.wav',
    back:    '/sounds/ssbuback.wav',
  },
  melee: {
    break:   '/sounds/ssbubreak.wav',
    forward: '/sounds/meleeforwarad.wav',
    back:    '/sounds/meleeback.wav',
  },
}

const MUSIC: Record<Theme, string> = {
  ssbu:  '/sounds/Super Smash Bros Ultimate - Menu Theme.mp3',
  melee: '/sounds/Super Smash Bros Melee - Menu Music Extended.mp3',
}

const EFFECT_VOLUME = 0.55
const MUSIC_VOLUME  = 0.28

class AudioManager {
  private theme: Theme = 'ssbu'
  private bgMusic: HTMLAudioElement | null = null
  private currentMusicSrc: string | null = null
  private musicUnlocked = false
  private ctx: AudioContext | null = null
  private buffers = new Map<string, AudioBuffer>()

  constructor() {
    this.preload()
  }

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    return this.ctx
  }

  private preload(): void {
    const paths = new Set<string>()
    for (const themeEffects of Object.values(EFFECTS)) {
      for (const path of Object.values(themeEffects)) {
        paths.add(path)
      }
    }
    for (const path of paths) {
      this.loadBuffer(path).catch(() => {})
    }
  }

  private async loadBuffer(path: string): Promise<void> {
    try {
      const ctx = this.getCtx()
      const res = await fetch(path)
      const raw = await res.arrayBuffer()
      const buf = await ctx.decodeAudioData(raw)
      this.buffers.set(path, buf)
    } catch {
      // Silently fail — HTMLAudioElement fallback handles it
    }
  }

  setTheme(theme: Theme): void {
    this.theme = theme
    if (this.musicUnlocked) {
      this.startMusic(MUSIC[theme])
    }
  }

  unlock(): void {
    this.musicUnlocked = true
    this.getCtx().resume().catch(() => {})
    this.startMusic(MUSIC[this.theme])
  }

  playEffect(type: EffectType): void {
    const path = EFFECTS[this.theme][type]
    const ctx = this.getCtx()
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
    const buf = this.buffers.get(path)
    if (buf) {
      const source = ctx.createBufferSource()
      source.buffer = buf
      const gain = ctx.createGain()
      gain.gain.value = EFFECT_VOLUME
      source.connect(gain)
      gain.connect(ctx.destination)
      source.start(0)
    } else {
      // Buffer not ready yet — fall back to HTMLAudioElement
      const audio = new Audio(path)
      audio.volume = EFFECT_VOLUME
      audio.play().catch(() => {})
    }
  }

  private startMusic(src: string): void {
    if (this.currentMusicSrc === src && this.bgMusic && !this.bgMusic.paused) return
    if (this.bgMusic) {
      this.bgMusic.pause()
      this.bgMusic.src = ''
    }
    const audio = new Audio(src)
    audio.volume = MUSIC_VOLUME
    audio.loop = true
    audio.play().catch(() => {})
    this.bgMusic = audio
    this.currentMusicSrc = src
  }
}

export const audioManager = new AudioManager()
