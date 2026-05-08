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

  setTheme(theme: Theme): void {
    this.theme = theme
    if (this.musicUnlocked) {
      this.startMusic(MUSIC[theme])
    }
  }

  /** Call once, from the first user gesture (PressStart dismiss). */
  unlock(): void {
    this.musicUnlocked = true
    this.startMusic(MUSIC[this.theme])
  }

  playEffect(type: EffectType): void {
    const src = EFFECTS[this.theme][type]
    const audio = new Audio(src)
    audio.volume = EFFECT_VOLUME
    audio.play().catch(() => { /* autoplay blocked — ignore */ })
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
    audio.play().catch(() => { /* autoplay blocked — ignore */ })
    this.bgMusic = audio
    this.currentMusicSrc = src
  }
}

export const audioManager = new AudioManager()
